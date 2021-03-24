import React, { useEffect } from 'react'

const ToDoList = ({currentList, setCurrentList}) => {
    useEffect(() => {
        //cierra la lista en el servidor una vez que se cumplieron todos los pendientes
        const updateList = async () => {
            if (currentList && !currentList?.finishedList && currentList?.toDos.length > 0) {
                if (currentList.toDos.every(({checked})=> checked)) {
                    try {
                        let response = await fetch(`/api/v1/pendientes/${currentList?._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ list: { finishedList: true } })
                        });
                        let { data } = await response.json();
                        if (data._id) {
                            setCurrentList(data);
                        } else {
                            throw new Error();
                        };
                    } catch (error) {
                        alert('No se puedo actualizar la cuenta, inténtelo de nuevo.');
                    };
                };
            };
        };
        updateList();
    }, [currentList, currentList?.toDos, setCurrentList]);
    const handleHechoClick = async(id)=>{
        let newToDos = currentList?.toDos.slice();
        newToDos.forEach(toDo => {
            if(toDo._id === id) toDo.checked = true;
        });
        try {
            let response = await fetch(`/api/v1/pendientes/${currentList?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ list: { toDos: newToDos } })
            });
            let { data } = await response.json();
            if (data._id) {
                setCurrentList(data);
            } else {
                throw new Error();
            };
        } catch (error) {
            return alert("No se pudo marcar como completado. Inténtelo de nuevo");
        };
    };
    const handleBorrarClick = async(id)=>{
        let newToDos = currentList?.toDos.slice();
            newToDos = newToDos.filter(toDo => toDo._id !== id);
           try {
               let response = await fetch(`/api/v1/pendientes/${currentList?._id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({list: {toDos:newToDos}})
                });
                let {data} = await response.json();
                if(data._id){
                    setCurrentList(data);
                }else{
                    throw new Error();
                };
           } catch (error) {
               return alert("No se pudo borrar. Inténtelo de nuevo");
           };
    };
    return (
        <div className="col-8">
            <div className="list-group-item active">Por Hacer</div>
            <ul className="list-group">
                {currentList?.toDos?.length > 0 ?
                currentList.toDos.map((toDo, index)=>(
                    <li className="list-group-item  d-flex justify-content-between align-items-start" key={index}>
                        <p>{toDo.text}</p>
                        {toDo?.checked ? 
                            <span className="badge badge-pill badge-success">Hecho</span>
                            :<div className="btn-group">
                                <button 
                                    type="button" 
                                    className="btn btn-success btn-sm mr-2"
                                    onClick={()=>{handleHechoClick(toDo._id)}}
                                    >
                                    Hecho
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleBorrarClick(toDo._id)}
                                    className="btn btn-danger btn-sm mr-2"
                                    >
                                    Borrar
                                </button>
                            </div>}
                    </li>
                )) 
                :<li className="list-group-item ">Agregue Pendientes</li>}
            </ul>
        </div>
    );
};

export default ToDoList;