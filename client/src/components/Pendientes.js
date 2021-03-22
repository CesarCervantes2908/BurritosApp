import React, { useEffect, useState } from 'react';
import CreateListButton from './CreateListButton';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';


const Pendientes = () => {
    const [lists, setLists] = useState([]);
    const [currentList, setCurrentList] = useState(lists[0]);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(()=>{
        const fetchLists = async()=>{
            setIsLoading(true);
            try {
                let response = await fetch(`/api/v1/pendientes/`);
                let {data, error} = await response.json();
                if(error) throw new Error(error);
                setLists(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError("Algo ocurrió mal. Por favor refresque la página.");
            };
        };
        fetchLists();
    }, []);
    useEffect(()=>{
        const updateList = async()=>{
            let flag = true;
            if(currentList?.finishedList) return;
            if (currentList?.toDos.length > 0) {
                currentList?.toDos.forEach(({checked}) => {
                    if(!checked) flag = false;
                });
                if(flag){
                    try {
                        let response = await fetch(`/api/v1/pendientes/${currentList?._id}`,{
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({list: {finishedList: true}})
                        });
                        let {data} = await response.json();
                        if(data._id){
                            setCurrentList(data);
                        }else{
                            throw new Error();
                        };
                    } catch (error) {
                        alert('No se puedo actualizar la cuenta, inténtelo de nuevo.');
                    };
                };
        };};
        updateList();
    }, [currentList?.toDos]);
    useEffect(()=>{
        if(lists.length > 0){
            lists.forEach(list=>{
                if(!list.finishedList) return setCurrentList(list);
            });
        };
    }, [lists]);
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
                                currentList={currentList}
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
                    :<CreateListButton 
                        className="btn btn-lg btn-success mx-auto" 
                        currentList={currentList}
                        setLists={setLists}
                        setCurrentList={setCurrentList}
                        />
                    }
            </div>
            <div className="row mt-5 mb-3">
                <h2>Listas Anteriores</h2>
            </div>
            <div className="row">
                <div className="col-12">
                    {isLoading ? <h3 className="my-5 mx-auto">Cargando...</h3>
                    :error ? <h3 className="mx-auto text-danger">{error}</h3>
                        :<table className="table table-hover">
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
                        }
                </div>
            </div>
        </main>
    );
};

export default Pendientes;