import { DesktopOutlined, PieChartOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { React } from 'react';
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  //* Items del Sider
  const itemsSider = [
    getItem('Empleados', '1', <TeamOutlined />),
    getItem('Asistencias', '2', <DesktopOutlined />),
    getItem('Nóminas', '3', <PieChartOutlined />),
    getItem('Usuario', 'sub1', <UserOutlined />, [
      getItem('Modificar', '4'),
      getItem('Opción extra', '5'),
      getItem('Opción extra', '6'),
    ]),
  ];
function C_Sider(){
    return <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={itemsSider} />;
}
export default C_Sider;