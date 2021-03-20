import { useState } from "react";


const ToDoForm = ({ setCurrentList, setEditMode }) => {
    const [text, setText] = useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(text.trim() === '') return;
        setCurrentList(prevCurrentList=>{
            let { toDos } = prevCurrentList;
            toDos.push({
                text,
                checked: false
            });
            return {...prevCurrentList, toDos};
        });
        setText('');
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