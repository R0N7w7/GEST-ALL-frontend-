import { TimePicker } from 'antd';
import dayjs from 'dayjs';
const format = 'HH:mm';
function C_HoraSelector(props) {

    function convertirHora(hora) {
        // Parsea la hora en formato hh:mm:ss
        const fecha = new Date(`2000-01-01T${hora}`);
        // Devuelve la hora en formato HH:mm
        return fecha.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }

    const horaA = convertirHora(props.value);

    
    return (
        <TimePicker
            placeholder='Hora'
            style={{ minWidth: '80px' }}
            defaultValue={dayjs(props.value, format)}
            format={format}
            disabled={props.editable}
            className={props.className}
            onBlur={props.onBlur}
        />
    );
}
export default C_HoraSelector;