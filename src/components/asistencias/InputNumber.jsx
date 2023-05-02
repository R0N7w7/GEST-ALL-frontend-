import { InputNumber } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
function C_HorasInput(props) {
    return (
        <InputNumber
            style={{ width: '100%', minWidth: '70px' }}
            prefix={<ClockCircleOutlined />}
            min={0}
            max={14}
            defaultValue={props.value}
            disabled={props.editable}
            className={props.className}
            onBlur={props.onBlur}
        />
    );
}
export default C_HorasInput;