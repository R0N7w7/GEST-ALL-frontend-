import { Modal } from 'antd';
import '../ModalAgregar.css'
import C_FormEdit from './FormEditar';
import React from 'react';

function C_ModalEditEmp(props) {
    const [empleado, setEmpleado] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true); // variable de estado para indicar si se está cargando el empleado  
    let { id, actualizar } = props;


    async function getEmpleadoById(id) {
        try {
            const response = await fetch(`http://localhost:4000/API/empleado/id_empleado/${id}`);
            const empleado = await response.json();
            return empleado;
        } catch (error) {
            console.error(`Error al obtener empleado con ID ${id}:`, error);
        }
    }


    //Tal parece que como este use Effect contiene codigo asincrono
    //no le es posible actualizarlo de chingadazo
    //por ende necesita esperar, definido por la variable isloading
    React.useEffect(() => {
        setIsLoading(true); // indicar que la carga está en progreso
        getEmpleadoById(id)
            .then((data) => {
                setEmpleado(data);
            })
            .catch((error) => {
                console.error(`Error al obtener empleado con ID ${id}:`, error);
            })
            .finally(() => {
                setIsLoading(false); // indicar que la carga ha finalizado
            });
    }, [id,actualizar]);

    // Solamente Dios sabe porque esto de acá funciona
    if (isLoading) {
        return <></>;
    }

    return (
        <>
            <Modal
                title={`Editar empleado ${id}`}
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
                <C_FormEdit
                    cerrarModal={() => props.cerrarModal()}
                    empleado={empleado}
                />
            </Modal>
        </>
    );
}

export default C_ModalEditEmp;
