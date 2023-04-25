import { Col, Row, Menu } from 'antd';
import {MenuOutlined} from '@ant-design/icons';
import '../nav.css'
const itemsNavBar = ['Acerca de', 'Cerrar Sesión'].map((key) => ({
    key,
    label: `${key}`,
}));
function C_Header() {
    return (
            <Row gutter={8}>
                <Col className="gutter-row" span={19}>
                    <div className="logo">
                        <img src="/images/JeraLogo.png" alt="" />
                    </div>
                </Col>
                <Col className="gutter-row" span={5} style={{alignItems:'right', justifyContent:'right', display:'flex'}}>
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} items={itemsNavBar} style={{width: '300px', minWidth:'0px'} }
                    overflowedIndicator={<MenuOutlined />}
                    />
                </Col>
            </Row>
    );
}
export default C_Header;