import { React, useCallback, useState } from 'react';
import { Table, Typography, Row, Col, Switch, Button, Empty, message } from 'antd';
import { DatePicker, Tooltip, Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { SaveOutlined, FileAddOutlined, DeleteOutlined } from '@ant-design/icons';
import C_HoraSelector from './Timepicker';
import C_HorasInput from './InputNumber';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import C_Modal_Confirm from '../../ModalConfirmacion';

//Datos de las columnas
const columns = [
    {
        title: 'Matrícula',
        dataIndex: 'matricula',
        width: '5%',
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        width: '15%',
    },
    {
        title: 'Asistencia',
        dataIndex: 'check',
        width: '5%',
    },
    {
        title: 'Hora Entrada',
        dataIndex: 'horaEntrada',
        width: '10%',
    },
    {
        title: 'Hora Salida',
        dataIndex: 'horaSalida',
        width: '10%',
    },
    {
        title: 'Horas Trabajadas',
        dataIndex: 'horasTrabajadas',
        width: '10%',
    },
    {
        title: 'Horas Extra',
        dataIndex: 'horasExtra',
        width: '10%',
    },
];
// Elementos del card
function C_Asistencias() {
    const { Meta } = Card;
    const [paginaActual, cambiarPagina] = useState(1); //para la paginación
    const dia = dayjs();
    const today = dia.format('YYYY-MM-DD');

    const [data, setData] = useState([{ key: 123 }]);
    const [fecha, setFecha] = useState(today);

    const [listar, setListar] = useState(false);

    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

    const [modalSaveOpen, setModalSaveOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    //Opciones de paginación de la tabla
    const paginationOptions = {
        pageSize: 10, // número de elementos por página
        total: data.length, // número total de elementos
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`, // función para mostrar el total
        showSizeChanger: true, // muestra el selector de tamaño de página
        pageSizeOptions: ['10', '20', '30', '40'], // opciones de tamaño de página
        current: paginaActual, // página actual
        onChange: (page) => {
            cambiarPagina(page);
        }, // manejador de evento para cambios de página
    };

    //Funcion que trae todas las asistencias de una fecha
    async function getAsistencias(fecha) {
        try {
            const response = await fetch(`http://localhost:4000/API/asistencia/${fecha}`);
            const asistencias = await response.json();
            return asistencias;
        } catch (error) {
            console.error('Error al obtener asistencias:', error);
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

    // Crear una nueva asistencia
    async function createAsistencia(asistencia) {
        try {
            const response = await fetch('http://localhost:4000/API/asistencia/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(asistencia)
            });
            const nuevaAsistencia = await response.json();
            return nuevaAsistencia;
        } catch (error) {
            console.error('Error al crear empleado:', error);
        }
    }

    //Elimina una asistencia
    async function deleteAsistencia(id) {
        try {
            const response = await fetch(`http://localhost:4000/API/asistencia/${id}`, {
                method: 'DELETE'
            });
            const asistenciaEliminada = await response.json();
            return asistenciaEliminada;
        } catch (error) {
            console.error(`Error al eliminar asistencia ${id}:`, error);
        }
    }

    //Actualiza una asistencia
    async function updateAsistencia(id_asistencia, datos) {
        try {
            const response = await fetch(`http://localhost:4000/API/asistencia/${id_asistencia}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const asistenciaActualizada = await response.json();
            return asistenciaActualizada;
        } catch (error) {
            console.error(`Error al actualizar asistencia ${id_asistencia}:`, error);
        }
    }

    //Guarda cambios (actualiza asistencias)
    async function guardarCambios() {
        setModalSaveOpen(false);
        const actualizar = data.map(record => {
            const { key, matricula, fecha } = record;
            return {
                id_asistencia: key,
                id_empleado: matricula,
                fecha,
                hora_entrada: record.horaEntrada.props.value,
                hora_salida: record.horaSalida.props.value,
                horas_trabajadas: record.horasTrabajadas.props.value,
                horas_extras: record.horasExtra.props.value,
            }
        });

        actualizar.forEach(async asistencia => {
            try {
                const asistenciaActualizada = await updateAsistencia(asistencia.id_asistencia, asistencia);
            } catch (error) {
                message.error("Los cambios no se guardaron correctamente")
                console.log(`No fue posible actualizar ${error}`);
            }
        });
        message.success("Cambios guardados");
    }

    async function eliminarAsistencia() {
        setModalDeleteOpen(false);
        data.forEach(async asistencia => {
            try {
                const asistenciaEliminada = await deleteAsistencia(asistencia.key);
                setListar(true);
            } catch (error) {
                console.log(`No fue posible eliminar las asistencias ${error}`);
            }
        })
    }

    function toggleActivo(key, checked) {
        setData((data) =>
            data.map((record) => {
                const props = record.horaEntrada.props;
                const props2 = record.horaSalida.props;
                const props3 = record.horasTrabajadas.props;
                const props4 = record.horasExtra.props;

                const horaEntrada = record.horaEntrada;
                const hora_salida = record.horaSalida;
                const horasTrabajadas = record.horasTrabajadas;
                const horasExtra = record.horasExtra;

                if (record.key === key) {
                    return {
                        ...record,
                        horaEntrada: { ...horaEntrada, props: { ...props, editable: checked, value: checked ? '00:00' : '07:00' } },
                        horaSalida: { ...hora_salida, props: { ...props2, editable: checked, value: checked ? '00:00' : '18:00' } },
                        horasTrabajadas: { ...horasTrabajadas, props: { ...props3, editable: checked, value: checked ? 0 : 0 } },
                        horasExtra: { ...horasExtra, props: { ...props4, editable: checked, value: checked ? 0 : 0 } },
                    };
                } else {
                    return record;
                }
            })
        );
    }

    //Actualiza el value de la hora de entrada
    function blurHoraEntrada(key, e) {
        const regexHora = /^(0\d|1\d|2[0-3]):([0-5]\d)$/;
        let valor = e.target.value;
        if (!regexHora.test(valor)) {
            return;
        }
        setData((data) =>
            data.map((record) => {
                const horaEntrada = record.horaEntrada;
                const props = horaEntrada.props;
                if (record.key === key) {
                    return {
                        ...record,
                        horaEntrada: { ...horaEntrada, props: { ...props, value: valor } }
                    };
                } else {
                    return record;
                }
            })
        );
    }

    //Actualiza el value de la hora de entrada
    function blurHoraSalida(key, e) {
        const regexHora = /^(0\d|1\d|2[0-3]):([0-5]\d)$/;
        let valor = e.target.value;
        if (!regexHora.test(valor)) {
            return;
        }
        setData((data) =>
            data.map((record) => {
                const horaSalida = record.horaSalida;
                const props = horaSalida.props;
                if (record.key === key) {
                    return {
                        ...record,
                        horaSalida: { ...horaSalida, props: { ...props, value: valor } }
                    };
                } else {
                    return record;
                }
            })
        );
    }

    //Actualiza el value de las horas trabajadas
    function blurHorasTrabajadas(key, e) {
        let valor = e.target.value;
        if (isNaN(valor) || valor<0 || valor > 14) {
            return
        }
        setData((data) =>
            data.map((record) => {
                const horasTrabajadas = record.horasTrabajadas;
                const props = horasTrabajadas.props;
                if (record.key === key) {
                    return {
                        ...record,
                        horasTrabajadas: { ...horasTrabajadas, props: { ...props, value: valor } }
                    };
                } else {
                    return record;
                }
            })
        );
    }

    //Actualiza el value de las horas extra
    function blurHorasExtra(key, e) {
        let valor = e.target.value;
        if (isNaN(valor) || valor<0 || valor > 14) {
            return
        }
        setData((data) =>
            data.map((record) => {
                const horasExtra = record.horasExtra;
                const props = horasExtra.props;
                if (record.key === key) {
                    return {
                        ...record,
                        horasExtra: { ...horasExtra, props: { ...props, value: valor } }
                    };
                } else {
                    return record;
                }
            })
        );
    }



    //Se trae todos los empleados y los registra en la BD con datos por defecto
    //Esto solo ocurre la primera vez que se crean
    async function generarAsistencias(e) {
        if (e.target.lastChild.lastChild) {
            e.target.hidden = true;
        } else {
            e.target.parentElement.hidden = true;
        }

        try {
            const result = await getEmpleados()
            result.map(async empleado => {
                const { id_empleado } = empleado
                const datosAsistencia = {
                    hora_entrada: "07:00",
                    hora_salida: "18:00",
                    fecha,
                    horas_trabajadas: 8,
                    horas_extras: 0,
                    id_empleado
                }
                try {
                    const asistenciaInsertada = await createAsistencia(datosAsistencia);
                    setListar(true);
                } catch (error) {
                    console.log(`No se pudo insertar ${error}`)
                }
            });
        } catch (error) {
            console.log(`Error al obtener empleados ${error}`);
        }

    }


    //Actualioza los datos de la tabla cada que selecciona una fecha distinta
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const listaAsistencias = await getAsistencias(fecha);
            listaAsistencias.forEach(async asistencia => {
                if (asistencia.empleado == null) {
                    const { id_asistencia } = asistencia;
                    try {
                        const asistenciaEliminada = await deleteAsistencia(id_asistencia);
                    } catch (error) {
                        console.log("No se pudo eliminar...")
                    }
                } else {
                    return asistencia;
                }
            });
            const result = listaAsistencias.filter(asistencia => asistencia.empleado !== null);
            const env = result.map(asistencia => {
                const { id_asistencia, hora_entrada, hora_salida, fecha, horas_trabajadas, horas_extras, id_empleado, empleado: { nombre, apellido_paterno } } = asistencia;
                let activar = true;
                if (horas_trabajadas > 0) {
                    activar = false;
                }

                return {
                    key: id_asistencia,
                    matricula: id_empleado,
                    nombre: `${nombre} ${apellido_paterno}`,
                    fecha,
                    check: <Switch size="small"
                        defaultChecked={horas_trabajadas > 0 ? true : false}
                        onChange={(checked, e) => {
                            if (checked) {
                                toggleActivo(id_asistencia, false);
                            } else {
                                activar = true;
                                toggleActivo(id_asistencia, true);
                            }
                        }} />,
                    horaEntrada: <C_HoraSelector value={hora_entrada} editable={activar} className={"inputVisible"} onBlur={(e) => blurHoraEntrada(id_asistencia, e)} />,
                    horaSalida: <C_HoraSelector value={hora_salida} editable={activar} className={"inputVisible"} onBlur={(e) => blurHoraSalida(id_asistencia, e)} />,
                    horasTrabajadas: <C_HorasInput value={horas_trabajadas} editable={activar} className={"inputVisible"} onBlur={(e) => blurHorasTrabajadas(id_asistencia, e)} />,
                    horasExtra: <C_HorasInput value={horas_extras} editable={activar} className={"inputVisible"} onBlur={(e) => blurHorasExtra(id_asistencia, e)} />,
                }
            });
            setIsLoading(false);
            setData(env);
        };
        fetchData();
        setListar(false);
        cambiarPagina(1);
    }, [fecha, listar]);

    return (
        <div
            style={{
                padding: 24,
                minHeight: "81vh",
                background: "white",
            }}>
            {/* TITULO */}
            <Typography.Title level={3} style={{ color: '#82A8D9' }}>
                <CalendarOutlined style={{ color: '#82A8D9' }} /> Asistencia del día: {fecha}
            </Typography.Title>


            {/* CONTENIDO: TABLA de Asistencias y CARD con datepicker */}
            <Row wrap>
                {/* las propiedades xs, sm, md... hacen responsive el contenido  */}
                <Col xs={24} sm={24} md={24} lg={20} xl={20}>
                    <Table
                        loading={isLoading}
                        columns={columns}
                        dataSource={data}
                        pagination={paginationOptions}
                        scroll={{ x: true }}
                        locale={{
                            emptyText: <Empty description="">
                                <h1>No se han registrado asistencias</h1>
                                <Button type='primary' onClick={(e) => generarAsistencias(e)}>Crear</Button>
                            </Empty>
                        }}
                    />
                </Col>
                <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 14, offset: 5 }} lg={{ span: 4, offset: 0 }} xl={{ span: 4, offset: 0 }}>
                    {/* Muestra el DatePicker */}
                    <Card
                        style={{ width: "100%", marginLeft: 10 }}
                        actions={[
                            <Tooltip title="Guardar" placement="bottom">
                                <div className='btnGuardar' onClick={()=>setModalSaveOpen(true)}>
                                    <SaveOutlined key="guardar" className="button-icon" />
                                </div>
                            </Tooltip>,
                            <Tooltip title="Eliminar" placement="bottom" >
                                <div className='btnEliminar' onClick={()=>setModalDeleteOpen(true)}>
                                    <DeleteOutlined key="eliminar" className="button-icon" />
                                </div>
                            </Tooltip>
                        ]}
                    >
                        <Meta
                            title="Fecha"
                            description={
                                <DatePicker
                                    defaultValue={dayjs}
                                    onChange={(valor, valorString) => {
                                        if (valorString != "") {
                                            setFecha(valorString);
                                        }
                                    }}
                                    placeholder="Seleccione fecha"
                                    style={{ width: "100%" }}
                                />
                            }
                        />
                    </Card>
                </Col>
            </Row>
            <C_Modal_Confirm
                abrirModal={modalDeleteOpen}
                cerrarModal={() => {
                    setModalDeleteOpen(false);
                }}
                cancelarModal={() => {
                    setModalDeleteOpen(false);
                }}
                accion={eliminarAsistencia}
                mensaje={"¿Desea eliminar las asistencias de este día?"}
                tipo={"Eliminar"}
            />
            <C_Modal_Confirm
                abrirModal={modalSaveOpen}
                cerrarModal={() => {
                    setModalSaveOpen(false);
                }}
                cancelarModal={() => {
                    setModalSaveOpen(false);
                }}
                accion={guardarCambios}
                mensaje={"¿Desea guardar todos los cambios realizados?"}
                tipo={"Guardar"}
            />
        </div>
    );
}
export default C_Asistencias;