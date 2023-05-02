import { Modal } from 'antd';
import { ExclamationCircleFilled, QuestionCircleFilled } from '@ant-design/icons';

function C_Modal_Confirm(props) {

    return (
        <>
            <Modal
                title={
                    <>
                        <ExclamationCircleFilled style={{ color: '#f5bd22', fontSize: '20px', marginRight: '10px' }} />
                        Confirmar operación
                    </>
                }
                centered
                open={props.abrirModal} 
                onCancel={() => props.cancelarModal()} 
                onOk={() => props.accion()}
                okType={props.tipo == "Eliminar" ? 'danger' : 'primary'}
                cancelText='Cancelar'
                okText={props.tipo}
                width={400}
            >
                <p style={{ marginLeft: '30px', marginBottom: '20px', marginTop: '20px' }}>
                    {props.mensaje}
                </p>
            </Modal>
        </>
    );
}
export default C_Modal_Confirm;