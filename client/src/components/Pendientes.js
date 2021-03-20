import React, { useEffect, useState } from 'react';
import CreateListButton from './CreateListButton';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';


const Pendientes = () => {
    const [lists, setLists] = useState([{
        date: '19-Mar-2021',
        toDos: [
            {
                text: 'Terminar esto',
                checked: false
            }
        ],
        finishedList: false
    }]);
    const [currentList, setCurrentList] = useState(lists[0]);
    const [editMode, setEditMode] = useState(false);
    useEffect(()=>{
        let flag = true;
        if (currentList.toDos.length > 0) {
            currentList.toDos.forEach(({checked}) => {
                if(!checked) flag = false;
            });
            if(flag)setCurrentList(prevCurrentList => ({
                ...prevCurrentList,
                finishedList: true
            }));
        };
    }, [currentList.toDos]);
    const handleRowClick = (index)=>{
        setCurrentList(lists[index]);
    };
    return (
        <main className="container p-5">
            <div className="row">
                <h1 className="mx-auto">Pendientes</h1>
            </div>
            <div className="row my-5">
                    {currentList ? 
                    <>
                        <ToDoList currentList={currentList} setCurrentList={setCurrentList} />
                        {editMode ? 
                            <ToDoForm 
                                setCurrentList={setCurrentList}
                                setEditMode={setEditMode}
                                />
                            :<div className="col-4">
                                {!currentList?.finishedList &&
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={()=>setEditMode(true)}
                                        >
                                        Agregar
                                    </button>
                                    }
                                <CreateListButton 
                                    className={"btn btn-block btn-" + (currentList?.finishedList ? "success" : "warning")}
                                    setCurrentList={setCurrentList}
                                    setLists={setLists}
                                    currentList={currentList}
                                    />
                            </div>
                        }
                    </>
                    :<CreateListButton currentList={currentList}/>
                    }
            </div>
            <div className="row mt-5 mb-3">
                <h2>Listas Anteriores</h2>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-hover">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">Fecha de Lista</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists.map(({date, finishedList}, index)=>{
                                return(
                                    <tr onClick={()=>{handleRowClick(index)}} key={index}>
                                        <th className={finishedList ? "": "table-success"}>{date}</th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default Pendientes;