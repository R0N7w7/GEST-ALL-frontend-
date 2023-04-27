import { InputNumber } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
function C_HorasInput() {
    return (
        <InputNumber
            style={{ width: '100%', minWidth: '70px' }}
            prefix={<ClockCircleOutlined />}
            min={8}
            max={14}
        />
    );
}
export default C_HorasInput;