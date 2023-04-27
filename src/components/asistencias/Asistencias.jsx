import { React, useState } from 'react';
import { Table, Typography, Row, Col, Switch  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import C_CardFecha from './CardFecha';
import C_HoraSelector from './Timepicker';
import C_HorasInput from './InputNumber';
//Datos de las filas
let datos = [
    {
        key: '1',
        matricula: 42,
        nombre: 'Jade Aguilar',
        check: <Switch size="small" defaultChecked />,
        horaEntrada: <C_HoraSelector/>,
        horaSalida: <C_HoraSelector/>,
        horasTrabajadas:<C_HorasInput/>,
        horasExtra:<C_HorasInput/>,
    },
]
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
        title: 'Check',
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
    const [paginaActual, cambiarPagina] = useState(1); //para la paginación
    //Opciones de paginación de la tabla
    const paginationOptions = {
        pageSize: 10, // número de elementos por página
        total: datos.length, // número total de elementos
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


            {/* CONTENIDO: TABLA de Asistencias y CARD con datepicker */}
            <Row wrap>
                {/* las propiedades xs, sm, md... hacen responsive el contenido  */}
                <Col xs={24} sm={24} md={24} lg={20} xl={20}> 
                    <Table
                        columns={columns}
                        dataSource={datos}
                        pagination={paginationOptions}
                        scroll={{ x: true }}
                    />
                </Col>
                <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 14, offset: 5 }} lg={{ span: 4, offset: 0 }} xl={{ span: 4, offset: 0 }}>
                    <C_CardFecha/>
                </Col>
            </Row>

        </div>
    );
}
export default C_Asistencias;