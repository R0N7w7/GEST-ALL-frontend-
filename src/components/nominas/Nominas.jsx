import { React } from 'react';
import { Table, Typography, Row, Col } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import C_CardFechaRango from './CardFechaNom';
import C_BonosDesc from './InputDineros';
//Datos de las filas
let datos = []
for (let i = 0; i < 30; i++) {
    datos.push({
        key: i,
        matricula: 40 + i,
        nombre: 'Jade Aguilar',
        salBase: 20,
        salExtra: 22,
        descuento: <C_BonosDesc/>,
        bono: <C_BonosDesc/>,
        total: 599
    },)
}
//columnas
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
        title: 'Salario base',
        dataIndex: 'salBase',
        width: '5%',
    },
    {
        title: 'Salario Extra',
        dataIndex: 'salExtra',
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

    const paginationOptions={
        pageSizeOptions: [
            '10', '20', '30', '40'
        ],
        locale: {
            items_per_page: '/ página',
        },
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
        position: ['topRight'], //! Posición de la paginación. Para regresar a la esquina superior derecha borrar esta línea
        showSizeChanger: true,
    }

    
    //Funcion que trae todas las nominas de un rango
    async function getNominas(fecha_inicio, fecha_fin) {
        try {
            const response = await fetch(`http://localhost:4000/API/nomina/${fecha_inicio}/${fecha_fin}`);
            const nominas = await response.json();
            return nominas;
        } catch (error) {
            console.error('Error al obtener nominas:', error);
        }
    }
    
    return (
        <div
            style={{
                padding: 24,
                minHeight: "81vh",
                background: "white",
            }}>
            {/* TITULO */}
            <Typography.Title level={3} style={{ color: '#82A8D9' }}>
                <DollarOutlined style={{ color: '#82A8D9' }} />Generador de nóminas
            </Typography.Title>


            {/* CONTENIDO: TABLA de Asistencias y CARD con datepicker */}
            <Row wrap>
                {/* las propiedades xs, sm, md... hacen responsive el contenido  */}
                <Col xs={24} sm={24} md={24} lg={17} xl={17}>
                    <Table
                        columns={columns}
                        dataSource={datos}
                        scroll={{ x: true }}
                        //* Las opciones de paginación fueron reemplazadas
                        pagination={paginationOptions}
                    />
                </Col>
                <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 14, offset: 5 }} lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }}>
                    <C_CardFechaRango />
                </Col>
            </Row>
        </div>
    );
}
export default C_Nominas;