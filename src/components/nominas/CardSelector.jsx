import { React } from 'react';
import { DatePicker, Tooltip, Card, Select } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import '../Botones.css'

const { Meta } = Card;
function C_CardSelector(props) {
    return (
        <Card
            style={{ width: "100%", marginLeft: 10, marginTop: 15}}
            actions={[
                <Tooltip title="Buscar" placement="bottom">
                    <div className='btnBuscar'>
                        <LoginOutlined className="button-icon" />
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
                            loading={props.loading}
                            placeholder="Seleccione una opción"
                            options={props.options?props.options:null}
                            style={{width: "100%"}}
                        />
                    </div>
                }
            />
        </Card>
    );
}
export default C_CardSelector;