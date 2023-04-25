import React from 'react';
import '../ModalAgregar.css'
import { FloatButton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
function C_FButton(props) {
    return (
        <FloatButton
            className='FloatBtn'
            shape='circle'
            type='default'
            icon={<PlusCircleOutlined
                className='TxtFloatBtn'
                />}
            tooltip={<div>Agregar empleado</div>} 
            onClick={props.onClick}
            />
    );

}
export default C_FButton;