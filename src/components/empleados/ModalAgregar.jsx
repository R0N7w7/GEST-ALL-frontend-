import { Modal } from 'antd';
import './ModalAgregar.css'
import C_FormAdd from './FormAgregar';
function C_ModalAddEmp(props) {
    return (
        <>
            <Modal
                title="Agregar empleado"
                centered
                open={props.abrirModal} //viene desde CrudEmpleados.jsx
                onCancel={() => props.cancelarModal()} //viene desde CrudEmpleados.jsx
                destroyOnClose={true}
                footer={[
                    //Está vacío porque si no, aparecen los botones por default
                ]}
                width={700} //anchura del modal
            >
                {/* Se pasa con props al formulario para cerrarlo al completarlo */}
                <C_FormAdd
                    cerrarModal={() => props.cerrarModal()}
                /> 
            </Modal>
        </>
    );
}
export default C_ModalAddEmp;