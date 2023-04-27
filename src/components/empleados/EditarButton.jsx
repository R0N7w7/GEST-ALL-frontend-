import React from "react";
import { Button, Tooltip, ConfigProvider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './Botones.css';
function C_BtnEdit(props) {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#ffbc2b' } }}>
            <Tooltip title="Editar">
                <Button
                    className="btnEditar"
                    shape="circle"
                    icon={<EditOutlined className="button-icon" />}
                    onClick={props.onClick}
                />
            </Tooltip>
        </ConfigProvider>
        
    );
}
export default C_BtnEdit;