import { useState } from "react";


const ToDoForm = ({ setCurrentList, setEditMode, currentList }) => {
    const [text, setText] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(text.trim() === '') return;
        let newToDos = currentList?.toDos.slice();
        newToDos.push({text});
        try {
            let response = await fetch(`/api/v1/pendientes/${currentList?._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({list:{toDos: newToDos}})
            });
            let {data} = await response.json();
            if(data._id){
                setCurrentList(data);
                setText('');
            }else{
                throw new Error();
            };
        } catch (error) {
            return alert('No se pudo agregar el pendiente. Inténtelo de Nuevo.');
        };
    };
    return (
        <div className="col-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="inputTarea">Tarea</label>
                    <input
                        type="text"
                        value={text}
                        onChange={({ target }) => { setText(target.value) }}
                        className="form-control"
                        id="inputTarea"
                        autoFocus
                    />
                </div>
                <button className="btn btn-success form-control" type="submit">Agregar</button>
            </form>
            <button 
                className="btn btn-primary form-control mt-3" type="button"
                onClick={()=>setEditMode(false)}
                >
                Terminar
            </button>
        </div>
    );
};

export default ToDoForm;