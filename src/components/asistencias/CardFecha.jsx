import { React } from 'react';
import { DatePicker, Tooltip, Card } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import './Botones.css'
const { Meta } = Card;
function C_CardFecha() {
    return (
        <Card
            style={{ width: "100%", marginLeft: 10 }}
            actions={[
                <Tooltip title="Guardar" placement="bottom">
                    <div className='btnGuardar'>
                        <SaveOutlined key="guardar" className="button-icon"/>
                    </div>
                </Tooltip>
            ]}
        >
            <Meta
                title="Fecha"
                description={
                    <DatePicker
                        placeholder='Seleccione fecha'
                        style={{ width: "100%" }}
                    />
                }
            />
        </Card>
    );
}
export default C_CardFecha;