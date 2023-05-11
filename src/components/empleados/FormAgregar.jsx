import {
    Col,
    Form,
    Input,
    Row,
    message,
} from 'antd';
import { UserOutlined, AlignLeftOutlined, PhoneOutlined, DollarOutlined } from '@ant-design/icons';
import { React } from 'react';
import C_BtnAdd from './AgregarButton';

// Crear un nuevo empleado
async function createEmpleado(empleado) {
    try {
        const response = await fetch('http://localhost:4000/API/empleado/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
        const nuevoEmpleado = await response.json();
        return nuevoEmpleado;
    } catch (error) {
        console.error('Error al crear empleado:', error);
    }
}


function C_FormAdd(props) {
    return (
        <Form
            autoComplete="off"
            size="large"
            wrapperCol={{ span: 24 }}
            // *Muestra los valores arrojados por el formulario cuando se completa correctamente
            onFinish={(values) => {
                const agregarEmpleado = async (empleado) => {
                    try {
                        const empleadoCreado = await createEmpleado(empleado);
                    } catch (error) {
                        console.error("No fue posible insertar al empleado en la BD");
                    }
                }
                agregarEmpleado(values);
                props.cerrarModal();
                message.success("Empleado registrado correctamente");
            }}
            // * Si no se completan correctamente, arroja el error
            onFinishFailed={(error) => {
                console.log({ error });
            }}
            style={{ width: '100%', height: '100%' }}
        >
            <Form.Item
                name="nombre"
                rules={[
                    {
                        required: true,
                        message: "Ingrese nombre",
                    },
                    { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,}( [a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,})?$/, message: 'Ingrese un nombre válido' },
                ]}
                hasFeedback
            >
                <Input placeholder="Nombre" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
                name="apellido_paterno"
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
                    <C_BtnAdd />
                </div>
            </Form.Item>
        </Form>
    );
};
export default C_FormAdd;