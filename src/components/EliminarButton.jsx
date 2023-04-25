import React from "react";
import { Button, Tooltip, ConfigProvider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import '../Botones.css';
function C_BtnDelete(props) {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#f05656' } }}>
            <Tooltip title="Eliminar">
                <Button
                    className="btnEliminar"
                    shape="circle"
                    icon={<DeleteOutlined className="button-icon" />}
                    onClick={props.onClick}
                />
            </Tooltip>
        </ConfigProvider>
    );
}
export default C_BtnDelete;