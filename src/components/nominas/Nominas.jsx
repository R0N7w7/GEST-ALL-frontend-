import { React, useState, useEffect } from 'react';
import { Table, Typography, Row, Col, Select, message, Card, Tooltip, Modal, Empty, InputNumber } from 'antd';
import { DollarOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import C_CardFechaRango from './CardFechaNom';
import C_BonosDesc from './InputDineros';
import C_CardSelector from './CardSelector';
import "../Botones.css";

const { Meta } = Card;
//columnas
const columns = [
    {
        title: 'Matrícula',
        dataIndex: 'id_empleado',
        width: '5%',
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        width: '15%',
    },
    {
        title: 'Salario base',
        dataIndex: 'salario_base',
        width: '5%',
    },
    {
        title: 'Salario Extra',
        dataIndex: 'salario_extra',
        width: '5%',
    },
    {
        title: 'Descuentos',
        dataIndex: 'descuento',
        width: '5%',
    },
    {
        title: 'Bonos',
        dataIndex: 'bono',
        width: '5%',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        width: '5%',
    },
];
// CONTENIDO NÓMINAS
function C_Nominas() {
    const [opciones, setOpciones] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //sirven para generar las nominas con el selector de rango
    const [fechaI, setFechaI] = useState("");
    const [fechaF, setFechaF] = useState("");

    //Sirven para modificar y eliminar con el ComboBox
    const [fechaInicioSel, setFechaInicioSel] = useState("");
    const [fechaFinSel, setFechaFinSel] = useState("");

    //Sirve para alamacenar la selcciond el comboBox
    const [seleccion, setSeleccion] = useState(undefined);

    const [data, setData] = useState(null);

    //funcion que se tare todos los rangos de fecha en la BD
    //Sirve para llenar el selector de consulta
    async function llenarSelect() {
        try {
            const response = await fetch('http://localhost:4000/API/nomina/distinct-date-ranges');
            const rangos = await response.json();
            return rangos.data;
        } catch (error) {
            message.error("No fue posible cargar las nominas...", [5])
        }
    }

    //Configura la paginación de la tabla
    const paginationOptions = {
        pageSizeOptions: [
            '10', '20', '30', '40'
        ],
        locale: {
            items_per_page: '/ página',
        },
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
        showSizeChanger: true,
    }

    //Funcion que trae todas las nominas de un rango
    async function getNominas(fecha_inicio, fecha_fin) {
        try {
            const response = await fetch(`http://localhost:4000/API/nomina/fecha/${fecha_inicio}/${fecha_fin}`);
            const nominas = await response.json();
            return nominas.data;
        } catch (error) {
            console.log('Error al obtener nominas:', error);
        }
    }

    //Funcion que se trae todos los empleados de la BD
    async function getEmpleados() {
        try {
            const response = await fetch('http://localhost:4000/API/empleado/');
            const empleados = await response.json();
            return empleados;
        } catch (error) {
            console.error('Error al obtener empleados:', error);
        }
    }

    //Función que elimina todas las nominas de un rango
    async function deleteNominasRange(fechaInicio, fechaFin) {
        try {
            const response = await fetch(`http://localhost:4000/API/nomina/${fechaInicio}/${fechaFin}`, {
                method: 'DELETE'
            });
            const NominaEliminada = await response.json();
            return NominaEliminada;
        } catch (error) {
            console.error(`Error al eliminar las nóminas:`, error);
        }
    }

    //Función que crea una nomina
    async function createNomina(nomina) {
        try {
            const response = await fetch('http://localhost:4000/API/nomina/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nomina)
            });
            const nuevaNomina = await response.json();
            return nuevaNomina;
        } catch (error) {
            console.error('Error al crear nómina:', error);
        }
    }

    //Actualiza una nomina
    async function updateNomina(id_nomina, datos) {
        try {
            const response = await fetch(`http://localhost:4000/API/nomina/${id_nomina}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const nominaActualizada = await response.json();
            return nominaActualizada;
        } catch (error) {
            console.error(`Error al actualizar la nómina ${id_nomina}:`, error);
        }
    }

    //funcion que actualiza la data del descuento y el bono
    //tambien da un preview del total
    function blurInput(valor, id_nomina, tipo) {
        setData((data) =>
            data.map((record) => {
                //console.log(record.bono.props.valor)
                if (record.id_nomina === id_nomina) {
                    let cantidad = Number(valor);
                    if (isNaN(cantidad)) {
                        cantidad = 0;
                    }
                    if (tipo == "descuento") {
                        const salario = record.salario_base + record.salario_extra + record.bono.props.valor;
                        const props = record.descuento.props;
                        const descuento = record.descuento;
                        return {
                            ...record,
                            total: salario - cantidad,
                            descuento: {
                                ...descuento,
                                props: {
                                    ...props,
                                    valor: cantidad
                                }
                            }
                        }
                    } else {
                        const salario = record.salario_base + record.salario_extra - record.descuento.props.valor;
                        const props = record.bono.props;
                        const bono = record.bono;
                        return {
                            ...record,
                            total: salario + cantidad,
                            bono: {
                                ...bono,
                                props: {
                                    ...props,
                                    valor: cantidad
                                }
                            }
                        }
                    }
                } else {
                    return record;
                }
            }),
        );
    }

    //Muestra las nominas en base a un objeto que contiene la fecha de inicio y la fecha de fin
    async function mostrarNominas(index, value) {
        setIsLoading(true);
        //para el caso en que se encesite limpiar la tabla
        if (value == null) {
            setData([]);
            setFechaFinSel("");
            setFechaInicioSel("");
            setIsLoading(false);
            return;
        }
        setSeleccion(value);
        //para cambiar los datos de la tabla
        if (value.ref) {
            const { fecha_inicio, fecha_fin } = value.ref;
            try {
                const listaNominas = await getNominas(fecha_inicio, fecha_fin);
                const env = listaNominas.map(nomina => {
                    const { id_nomina, id_empleado, empleado: { nombre, apellido_paterno }, salario_base, salario_extra, descuento, bono, total } = nomina;
                    return {
                        key: id_empleado,
                        id_nomina,
                        id_empleado,
                        nombre: `${nombre} ${apellido_paterno}`,
                        salario_base,
                        salario_extra,
                        descuento: <InputNumber
                            key={new Date()}
                            defaultValue={descuento}
                            valor={descuento}
                            min={0}
                            max={6000}
                            prefix={"$"}
                            step={10}
                            onChange={(valor) => { blurInput(valor, id_nomina, "descuento") }}
                        />,
                        bono:
                            <InputNumber
                                key={new Date()}
                                defaultValue={bono}
                                valor={bono}
                                min={0}
                                max={6000}
                                prefix={"$"}
                                step={10}
                                onChange={(valor) => { blurInput(valor, id_nomina, "bono") }}
                            />
                        ,
                        total
                    }
                });
                setData(env);
                setFechaInicioSel(fecha_inicio);
                setFechaFinSel(fecha_fin);
            } catch (error) {
                console.log(`No fue posible listar las asistencias ${error}`)
            }
        }
        setIsLoading(false);
    }

    //actualiza el rango de fechas seleccionado
    function handleRango(dates, dateStrings) {
        const [fechaInicio, fechaFin] = dateStrings;
        setFechaI(fechaInicio);
        setFechaF(fechaFin);
    }

    //Abre un modal que llama a la funcion de crear nominas
    async function modalGenerar() {
        if (fechaI != "" && fechaF != "") {
            Modal.confirm({
                title: "Confirmar operación",
                content: `¿Deseas generar las nóminas en el rango seleccionado?`,
                okText: "Generar",
                cancelText: "Cancelar",
                okType: 'primary',
                centered: true,
                onOk: crearNominas
            });
        } else {
            message.error("Se debe seleccionar un rango de fechas en primer lugar");
        }
    }

    //Abre un modal que llama a la funcion de eliminar nominas
    async function modalEliminar() {
        if (fechaInicioSel != "" && fechaFinSel != "") {
            Modal.confirm({
                title: "Confirmar operación",
                content: `¿Deseas eliminar las nóminas de ${fechaInicioSel} hasta ${fechaFinSel}?`,
                okText: "Eliminar",
                cancelText: "Cancelar",
                okType: 'danger',
                centered: true,
                onOk: eliminarNominas
            });
        }
    }

    //Abre un modal que llama a la función de actualizar nóminas
    async function modalGuardar() {
        if (fechaInicioSel != "" && fechaFinSel != "") {
            Modal.confirm({
                title: "Confirmar operación",
                content: `¿Deseas guardar los cambios en las nóminas de ${fechaInicioSel} hasta ${fechaFinSel}?`,
                okText: "Guardar",
                cancelText: "Cancelar",
                okType: 'primary',
                centered: true,
                onOk: guardarNominas
            });
        }
    }

    //Crea una nomina por cada empleado en la BD con datos por defecto
    async function crearNominas() {
        if (fechaI != "" && fechaF != "") {

            try {
                const prevNomina = await getNominas(fechaI, fechaF);
                if (prevNomina.length) {
                    message.error("La nomina para este rango de fechas ya se ha creado previamente");
                    return
                }
                const listaEmpleados = await getEmpleados();
                listaEmpleados.forEach(async empleado => {
                    const { id_empleado } = empleado;
                    const datosNomina = {
                        id_empleado,
                        fecha_inicio: fechaI,
                        fecha_fin: fechaF
                    }
                    try {
                        const nuevaNomina = await createNomina(datosNomina);
                        const value = {
                            ref: {
                                fecha_inicio: fechaI,
                                fecha_fin: fechaF,
                            }
                        }
                        mostrarNominas(null, value);
                    } catch (error) {
                        message.error("No fue posible generar las nominas en ese rango de fechas");
                        console.error(error);
                    }
                });
            } catch (error) {
                message.error("No fue obtener la lista de empleados");
                console.error(error);
            }
        }
    }

    //Elimina las nominas de un rango seleccionado:
    async function eliminarNominas() {
        if (fechaFinSel != "" && fechaInicioSel != "") {
            try {
                const nominasEliminadas = await deleteNominasRange(fechaInicioSel, fechaFinSel);
                mostrarNominas(null, null);
                setSeleccion(undefined);
            } catch (error) {
                console.error(error);
            }
        }
    }

    //Actualiza las nominas con los datos de la tabla:
    async function guardarNominas() {
        const datosGuardar = data.map((record) => {
            const { id_nomina, id_empleado, nombre, salario_base, salario_extra, descuento, bono, total } = record;
            return {
                id_nomina,
                id_empleado,
                salario_base,
                salario_extra,
                descuento: descuento.props.valor,
                bono: bono.props.valor,
                total
            }
        });
        datosGuardar.forEach(async nominaGuardar => {
            try {
                const nominaActualizada = await updateNomina(nominaGuardar.id_nomina, nominaGuardar)
            } catch (error) {
                console.error(error);
            }
        })
        message.success("Cambios guardados correctamente")
    }

    //useEffect que actualiza el selector de rangos para consulta de nominas
    //Actualioza los datos de la tabla cada que selecciona una fecha distinta
    useEffect(() => {
        const fetchRangos = async () => {
            const listaRangos = await llenarSelect();
            const env = listaRangos.map((rango, index) => {
                const { fecha_inicio, fecha_fin } = rango;
                return {
                    label: `${fecha_inicio}   ---   ${fecha_fin}`,
                    value: index,
                    ref: rango
                }
            });
            setOpciones(env);
        }
        fetchRangos();
    }, [data]);

    return (
        <div
            style={{
                padding: 24,
                minHeight: "81vh",
                background: "white",
            }}>
            {/* TITULO */}
            <Typography.Title level={3} style={{ color: '#82A8D9' }}>
                <DollarOutlined style={{ color: '#82A8D9' }} /> Nóminas:
                {(fechaInicioSel != "" && fechaFinSel != "") ? ` De ${fechaInicioSel} hasta ${fechaFinSel}` : ""}
            </Typography.Title>


            {/* CONTENIDO: TABLA de Asistencias y CARD con datepicker */}
            <Row wrap>
                {/* las propiedades xs, sm, md... hacen responsive el contenido  */}
                <Col xs={24} sm={24} md={24} lg={17} xl={17}>
                    <Table
                        loading={isLoading}
                        columns={columns}
                        dataSource={data}
                        scroll={{ x: true }}
                        //* Las opciones de paginación fueron reemplazadas
                        pagination={paginationOptions}
                    />
                </Col>
                <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 14, offset: 5 }} lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }}>
                    <C_CardFechaRango
                        onChange={handleRango}
                        onClick={modalGenerar}
                    />
                    <Card
                        style={{ width: "100%", marginLeft: 10, marginTop: 15 }}
                        actions={[
                            <Tooltip title="Guardar" placement="bottom">
                                <div className='btnGuardar' onClick={modalGuardar}>
                                    <SaveOutlined key="guardar" className="button-icon" />
                                </div>
                            </Tooltip>,
                            <Tooltip title="Eliminar" placement="bottom" >
                                <div className='btnEliminar' onClick={modalEliminar}>
                                    <DeleteOutlined key="eliminar" className="button-icon" />
                                </div>
                            </Tooltip>
                        ]}
                    >
                        <Meta
                            title="Buscar nómina"
                            description={
                                <div>
                                    <p>Seleccione el rango de fechas</p>
                                    <Select
                                        placeholder="Seleccione una opción"
                                        options={opciones}
                                        style={{ width: "100%" }}
                                        id='selectRango'
                                        onChange={mostrarNominas}
                                        notFoundContent={<Empty description="No hay nóminas para mostrar"></Empty>}
                                        allowClear={true}
                                        value={seleccion}
                                    />
                                </div>
                            }
                        />
                    </Card>
                </Col>

            </Row>
        </div>
    );
}
export default C_Nominas;