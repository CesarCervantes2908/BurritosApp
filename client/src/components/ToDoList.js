import React from 'react'

const ToDoList = ({currentList, setCurrentList}) => {
    const handleHechoClick = (index)=>{
        setCurrentList(prevCurrentList=>{
            let {toDos: prevToDos} = prevCurrentList;
            let newToDos = prevToDos.slice();
            newToDos[index].checked = true;
            return {...prevCurrentList, toDos: newToDos};
        });
    };
    const handleBorrarClick = (index)=>{
        setCurrentList(prevCurrentList => {
            let { toDos: prevToDos } = prevCurrentList;
            let newToDos = prevToDos.slice();
            newToDos = newToDos.filter((_, idx) => idx !== index);
            return { ...prevCurrentList, toDos: newToDos };
        });
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
                                    onClick={()=>{handleHechoClick(index)}}
                                    >
                                    Hecho
                                </button>
                                <button 
                                    type="button" 
                                    onClick={()=>handleBorrarClick(index)}
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