import { InputNumber } from 'antd';
import { DollarOutlined} from '@ant-design/icons';
function C_BonosDesc() {
    return (
        <InputNumber
            style={{ width: '100%', minWidth: '80px' }}
            prefix={<DollarOutlined/>}
            min={0}
            max={2500}
            defaultValue={0}
        />
    );
}
export default C_BonosDesc;