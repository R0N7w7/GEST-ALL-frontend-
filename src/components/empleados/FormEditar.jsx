import {
    Col,
    Form,
    Input,
    Row,
    message,
} from 'antd';
import { UserOutlined, AlignLeftOutlined, PhoneOutlined, DollarOutlined } from '@ant-design/icons';
import { React, useState, useEffect } from 'react';
import C_BtnAdd from './AgregarButton';

// Actualioza un empleado
async function updateEmpleado(id_empleado,empleado) {
    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`http://localhost:4000/API/empleado/${id_empleado}?t=${timestamp}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
        const empleadoActualizado = await response.json();
        return empleadoActualizado;
    } catch (error) {
        console.error(`Error al actualizar empleado con ID ${id_empleado}:`, error);
    }
}

function C_FormEdit(props) {

    const { empleado: { empleados: [objeto] }} = props

    const { id_empleado, nombre, apellido_paterno, apellido_materno, telefono, salario_hora, salario_hora_extra } = objeto;

    return (
        <Form
            autoComplete="off"
            size="large"
            wrapperCol={{ span: 24 }}
            // *Muestra los valores arrojados por el formulario cuando se completa correctamente
                onFinish={(values) => {
                    const actualizarEmpleado = async (empleado) => {
                        try {
                            await updateEmpleado(id_empleado, empleado);
                            
                        } catch (error) {
                            console.error(`No fue posible actualizar al empleado en la BD \n${error}`);
                        }
                    }
                    actualizarEmpleado(values);
                    props.cerrarModal();
                    message.success("Cambios guardados");
                }}
            // * Si no se completan correctamente, arroja el error
            onFinishFailed={(error) => {
                console.log({ error });
            }}
            style={{ width: '100%', height: '100%' }}
        >
            <Form.Item
                name="nombre"
                initialValue={nombre}
                rules={[
                    {
                        required: true,
                        message: "Ingrese nombre",
                    },
                    { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,}( [a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,})?$/, message: 'Ingrese un nombre válido' },
                ]}
                hasFeedback
            >
                <Input
                    placeholder="Nombre"
                    prefix={<UserOutlined />}
                />
            </Form.Item>

            <Form.Item
                name="apellido_paterno"
                initialValue={apellido_paterno}
                rules={[
                    {
                        required: true,
                        message: "Ingrese apellido paterno",
                    },
                    { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,}$/, message: 'Ingrese apellido válido' }
                ]}
                hasFeedback
            >
                <Input placeholder="Apellido paterno" prefix={<AlignLeftOutlined />} />
            </Form.Item>

            <Form.Item
                name="apellido_materno"
                initialValue={apellido_materno}
                rules={[
                    {
                        required: true,
                        message: "Ingrese apellido materno",
                    },
                    { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,}$/, message: 'Ingrese apellido válido' }
                ]}
                hasFeedback
            >
                <Input placeholder="Apellido materno" prefix={<AlignLeftOutlined />} />
            </Form.Item>

            <Form.Item
                name="telefono"
                initialValue={telefono}
                rules={[
                    {
                        required: true,
                        message: "Ingrese un número de teléfono",
                    },
                    { pattern: /^\d{10}$/, message: 'Ingrese un número de teléfono válido' }
                ]}
                hasFeedback
            >
                <Input placeholder="Teléfono" prefix={<PhoneOutlined />} />
            </Form.Item>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="salario_hora"
                        initialValue={salario_hora}
                        rules={[
                            {
                                required: true,
                                message: "Ingrese salario por hora",
                            },
                            { pattern: /^[0-9]{1,3}(\.[0-9]{1,2})?$/, message: 'Ingrese una cantidad válida' }
                        ]}
                        hasFeedback
                        style={{ marginRight: "5px" }}

                    >
                        <Input placeholder="Hora" prefix={<DollarOutlined />} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="salario_hora_extra"
                        initialValue={salario_hora_extra}
                        rules={[
                            {
                                required: true,
                                message: "Ingrese salario por hora extra",
                            },
                            { pattern: /^[0-9]{1,3}(\.[0-9]{1,2})?$/, message: 'Ingrese una cantidad válida' }
                        ]}
                        hasFeedback
                        style={{ marginLeft: "5px" }}
                    >
                        <Input placeholder="Hora extra" prefix={<DollarOutlined />} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <div style={{ textAlign: "right" }}>
                    <C_BtnAdd texto="editar" />
                </div>
            </Form.Item>
        </Form>
    );
};
export default C_FormEdit;