import React from "react";
import { useState, useEffect } from 'react';
import { Table, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import C_BtnDelete from "./EliminarButton";
import C_BtnEdit from "./EditarButton";
import C_FButton from "./FloatButton";
import C_ModalAddEmp from "./ModalAgregar";
import C_ModalEditEmp from "./ModalEditar";
import C_ModalElim from "./ModalEliminar";

function C_TablaEmpleados() {
    const [data, setData] = useState([]);
    const [paginaActual, cambiarPagina] = useState(1);
    const [modalAddOpen, setModalAddOpen] = useState(false); //para abrir/cerrar el modal
    const [modalEditOpen, setModalEditOpen] = useState(false); //Para abrir modal de edición
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false); //Para abrir el modal de eliminación

    const [actualizar, setActualizar] = useState(true); //Sirve para indicar si debe actualizarce (redibujarse) la tabla
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(0); //Para mandarselo al fomrulario de editar
    const [empleadoEliminar, setEmpleadoEliminar] = useState(0); //Para mandarselo al fomrulario de editar


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

    //Función que actualiza la tabla
    async function actualizarDatosTabla() {
        const result = await getEmpleados();
        const env = result.map(empleado => {
            const { id_empleado, nombre, apellido_paterno, apellido_materno, telefono, salario_hora, salario_hora_extra } = empleado;
            return {
                key: id_empleado,
                id_empleado,
                nombre: `${nombre} ${apellido_paterno} ${apellido_materno}`,
                telefono,
                salario_hora,
                salario_hora_extra
            }
        });
        setData(env);
        setActualizar(true);
    }

    //se ejecuta para redibujar la tabla, cada vez que el state de actualizar se requiere poner a true
    useEffect(() => {
        if (actualizar) {
            const fetchData = async () => {
                const result = await getEmpleados();
                const env = result.map(empleado => {
                    const { id_empleado, nombre, apellido_paterno, apellido_materno, telefono, salario_hora, salario_hora_extra } = empleado;
                    return {
                        key: id_empleado,
                        id_empleado,
                        nombre: `${nombre} ${apellido_paterno} ${apellido_materno}`,
                        telefono,
                        salario_hora,
                        salario_hora_extra,
                        acciones:
                            <Space wrap>
                                <C_BtnEdit onClick={() => {
                                    setModalEditOpen(true);
                                    setEmpleadoSeleccionado(id_empleado);
                                }} />
                                <C_BtnDelete onClick={() => {
                                    setModalDeleteOpen(true);
                                    setEmpleadoEliminar(id_empleado);
                                }} />
                            </Space>
                    }
                })
                setData(env);
            };
            fetchData();
            setActualizar(false);
        }
    }, [actualizar]);

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
    return (
        <div
            style={{
                padding: 24,
                minHeight: "81vh",
                background: "white",
            }}>
            {/* TITULO */}
            <Typography.Title level={3} style={{ color: '#82A8D9' }}>
                <UserOutlined style={{ color: '#82A8D9' }} />Lista de empleados
            </Typography.Title>
            {/* CONTENIDO: TABLA */}
            <Table
                columns={[
                    {
                        title: 'Matrícula',
                        dataIndex: 'id_empleado',
                        width: '10%',
                    },
                    {
                        title: 'Nombre',
                        dataIndex: 'nombre',
                        width: '20%',
                    },
                    {
                        title: 'Teléfono',
                        dataIndex: 'telefono',
                        width: '15%',
                    },
                    {
                        title: 'Pago por hora',
                        dataIndex: 'salario_hora',
                        width: '15%',
                    },
                    {
                        title: 'Pago por hora extra',
                        dataIndex: 'salario_hora_extra',
                        width: '15%',
                    },
                    {
                        title: 'Acciones',
                        dataIndex: 'acciones',
                        width: '10%',
                    }
                ]}
                dataSource={data}
                pagination={paginationOptions}
                scroll={{ x: true }}
            />
            {/* BOTÓN FLOTANTE PARA ABRIR EL MODAL */}
            <C_FButton onClick={() => setModalAddOpen(true)} />
            <C_ModalAddEmp
                // Se pasa con props abrirModal y cerrarModal 
                abrirModal={modalAddOpen}
                cerrarModal={() => {
                    setModalAddOpen(false);
                    actualizarDatosTabla(); // se llama a la función para actualizar la tabla
                }}
                cancelarModal={() => {
                    setModalAddOpen(false);
                }}
            />
            <C_ModalEditEmp
                id={empleadoSeleccionado}
                abrirModal={modalEditOpen}
                cerrarModal={() => {
                    setModalEditOpen(false);
                    actualizarDatosTabla(); // se llama a la función para actualizar la tabla
                }}
                cancelarModal={() => {
                    setModalEditOpen(false);
                }}
                actualizar={new Date().getTime()}
            />
            <C_ModalElim
                // Se pasa con props abrirModal y cerrarModal 
                id={empleadoEliminar}
                abrirModal={modalDeleteOpen}
                cerrarModal={() => {
                    setModalDeleteOpen(false);
                    actualizarDatosTabla(); // se llama a la función para actualizar la tabla
                }}
                cancelarModal={() => {
                    setModalDeleteOpen(false);
                }}
            />

        </div>
    );
}
export default C_TablaEmpleados;