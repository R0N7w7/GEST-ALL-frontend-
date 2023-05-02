import { React } from 'react';
import { DatePicker, Tooltip, Card } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import '../Botones.css'
const { RangePicker } = DatePicker;
//Puros mensajes
const onRangeChange = (dates, dateStrings) => {
    if (dates) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
        console.log('Clear');
    }
};
const rangePresets = [
    {
        label: 'Últimos 7 días',
        value: [dayjs().add(-6, 'd'), dayjs()],
    },
    {
        label: 'Últimos 14 días',
        value: [dayjs().add(-13, 'd'), dayjs()],
    },
    {
        label: 'Últimos 30 días',
        value: [dayjs().add(-29, 'd'), dayjs()],
    },
];
const { Meta } = Card;
function C_CardFechaRango() {
    return (
        <Card
            style={{ width: "100%", marginLeft: 10 }}
            actions={[
                <Tooltip title="Generar" placement="bottom">
                    <div className='btnGuardar'>
                        <LoginOutlined className="button-icon" />
                    </div>
                </Tooltip>
            ]}
        >
            <Meta
                title="Generar nómina"
                description={
                    <div>
                        <p>Seleccione un rango de fecha</p>
                        <RangePicker
                            presets={rangePresets}
                            onChange={onRangeChange}
                            style={{ width: "100%" }}
                            placeholder={['Desde', 'Hasta']}
                        />
                    </div>
                }
            />
        </Card>
    );
}
export default C_CardFechaRango;