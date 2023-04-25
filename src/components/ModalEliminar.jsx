import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
function mensaje() {
    console.log('Datos eliminados');
}
function C_ModalElim(props) {
    // Eliminar un empleado existente
    async function deleteEmpleado(id) {
        try {
            const response = await fetch(`http://localhost:4000/API/empleado/${id}`, {
                method: 'DELETE'
            });
            const empleadoEliminado = await response.json();
            return empleadoEliminado;
        } catch (error) {
            console.error(`Error al eliminar empleado con ID ${id}:`, error);
        }
    }

    return (
        <>
            <Modal
                title={
                    <>
                        <ExclamationCircleFilled style={{ color: '#f5bd22', fontSize: '20px', marginRight: '10px' }} />
                        Confirmar eliminación
                    </>
                }
                centered
                open={props.abrirModal} //viene desde CrudEmpleados.jsx
                onCancel={() => props.cancelarModal()} //viene desde CrudEmpleados.jsx
                onOk={() => {
                    const borrarEmpleado = async (id) => {
                        try {
                            await deleteEmpleado(id);

                        } catch (error) {
                            console.error(`No fue posible eliminar al empleado en la BD \n${error}`);
                        }
                    }
                    borrarEmpleado(props.id);
                    props.cerrarModal();
                }}
                okType='danger'
                cancelText='Conservar'
                okText='Eliminar'
                width={400}
            >
                <p style={{ marginLeft: '30px', marginBottom: '20px', marginTop: '20px' }}>
                    ¿Está seguro de borrar los datos del empleado con el id {props.id}?
                </p>
            </Modal>
        </>
    );
}
export default C_ModalElim;