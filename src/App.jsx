// import NavBar from './components/nav';
import { React, useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/reset.css';
const { Header, Content, Footer, Sider } = Layout;
import C_Header from './components/Header';
import C_Sider from './components/Sider';
import C_TablaEmpleados from './components/CrudEmpleados';
import C_ModalAddEmp from './components/ModalAgregar';
//
//Componente tabla de empleados
const crudEmpleados=<C_TablaEmpleados />;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='App'>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header" style={{ backgroundColor: 'white' }} >
          <C_Header />
        </Header>
        <Layout style={{ minHeight: '93.2vh' }}>
          <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint='lg'>
            <C_Sider />
          </Sider>
          <Content style={{ margin: '24px 16px 0' }}>
            <C_TablaEmpleados />
            <Footer style={{ textAlign: 'center', marginTop: '2vh' }}>
              RojanTech ©2023
            </Footer>
          </Content>
          <C_ModalAddEmp/>
        </Layout>
      </Layout>
    </div>
  )
}

export default App;
