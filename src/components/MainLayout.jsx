import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/reset.css';
const { Header, Content, Footer, Sider } = Layout;
import C_Header from './Header';
import C_Sider from './Sider';
import  C_TablaEmpleados from './empleados/CrudEmpleados';
import C_ModalAddEmp from './empleados/ModalAgregar';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import C_Asistencias from './asistencias/Asistencias';

function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header" style={{ backgroundColor: 'white' }} >
                <C_Header />
            </Header>
            <Layout style={{ minHeight: '93.2vh' }}>
                <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint='lg'>
                    <C_Sider />
                </Sider>
                <Content style={{ margin: '24px 16px 0' }}>
                    <Routes>
                        <Route path='/empleados' element = {<C_TablaEmpleados/>} />
                        <Route path='/asistencias' element = {<C_Asistencias />} />
                        <Route path='/nominas' element={<C_TablaEmpleados />} />
                        <Route path='*' element={<h1 className='error danger'>Pagina no encontrada</h1>} />
                    </Routes>
                    <Footer style={{ textAlign: 'center', marginTop: '2vh' }}>
                        RojanTech ©2023
                    </Footer>
                </Content>
                <C_ModalAddEmp />
            </Layout>
        </Layout>
    );
}
export default MainLayout;