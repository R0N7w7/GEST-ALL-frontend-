import { TimePicker } from 'antd';
import dayjs from 'dayjs';
const format = 'HH:mm';
function C_HoraSelector() {
    return (
        <TimePicker
            placeholder='Hora'
            style={{ minWidth: '80px' }}
            defaultValue={dayjs('07:00', format)}
            format={format}
            
        />
    );
}
export default C_HoraSelector;