import React from "react";
import { Button, ConfigProvider } from 'antd';
import { UserAddOutlined, EditFilled } from '@ant-design/icons';
import '../Botones.css';
function C_BtnAdd(props) {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: props.texto=="editar"?'#FAE03E':'#82A8D9'} } }>
            <Button
                type="primary"
                htmlType="submit"
                icon={props.texto != "editar" ? <UserAddOutlined /> : <EditFilled />}
                style={{ color: 'black' }}
            >
                {props.texto == "editar" ? "Editar" : "Agregar"}
            </Button>
        </ConfigProvider>
    );
}
export default C_BtnAdd;