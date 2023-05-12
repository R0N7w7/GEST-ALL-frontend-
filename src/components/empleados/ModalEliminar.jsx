import { Modal, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

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

    async function deleteAsistencias(id) {
        try {
            const response = await fetch(`http://localhost:4000/API/asistencia/empleado/${id}`, {
                method: 'DELETE'
            });
            const asistenciasEliminadas = await response.json();
            return asistenciasEliminadas;
        } catch (error) {
            console.error(`Error al eliminar las asistencias del empleado con ID ${id}:`, error);
        }
    }

    async function deleteNominas(id) {
        try {
            const response = await fetch(`http://localhost:4000/API/nomina/empleado/${id}`, {
                method: 'DELETE'
            });
            const nominasEliminadas = await response.json();
            return nominasEliminadas;
        } catch (error) {
            console.error(`Error al eliminar las asistencias del empleado con ID ${id}:`, error);
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
                            message.success("Empleado eliminado correctamente");
                        } catch (error) {
                            console.error(`No fue posible eliminar al empleado en la BD \n${error}`);
                        }
                    }
                    const borrarAsistencias = async (id) => {
                        try {
                            await deleteAsistencias(id);
                        } catch (error) {
                            console.error(`No fue posible eliminar las asistencias en la BD \n${error}`);
                        }
                    }
                    const borrarNominas = async (id) => {
                        try {
                            await deleteNominas(id);
                        } catch (error) {
                            console.error(`No fue posible eliminar al empleado en la BD \n${error}`);
                        }
                    }
                    borrarAsistencias(props.id);
                    borrarNominas(props.id);
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