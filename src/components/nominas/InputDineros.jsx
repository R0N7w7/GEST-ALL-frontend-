import { InputNumber } from 'antd';
import { DollarOutlined} from '@ant-design/icons';
import { useState } from 'react';
function C_BonosDesc(props) {
    const [descuento, setDescuento] = useState(props.value);
    return (
        <InputNumber
            style={{ width: '100%', minWidth: '80px' }}
            prefix={"$"}
            min={0}
            max={2500}
            value={descuento}
        />
    );
}
export default C_BonosDesc;