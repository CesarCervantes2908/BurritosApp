import React, { useEffect, useState } from 'react'
import GastosList from './GastosList';
import ToDoList from './ToDoList';

const Inicio = () => {
    const [pendientes, setPendientes] = useState(null);
    const [gastos, setGastos] = useState(null);
    const [loadingGastos, setLoadingGastos] = useState(false);
    const [errorGastos, setErrorGastos] = useState('');
    const [loadingPendientes, setLoadingPendientes] = useState(false);
    const [errorPendientes, setErrorPendientes] = useState('');
    useEffect(()=>{
        const fetchGastos = async()=>{
            setLoadingGastos(true);
            try {
              let response = await fetch('/api/v1/gastos?filter=active');
              let { data } = await response.json();
              if(data._id){
                setLoadingGastos(false);  
                setGastos(data);
              }else{
                throw new Error();
              };
            } catch (error) {
                setLoadingGastos(false);
                setErrorGastos("Ocurrió un Error. Por favor recargue la página")
            };
        };
        fetchGastos();
    }, []);
    useEffect(()=>{
        const fetchPendientes = async()=>{
            setLoadingPendientes(true);
            try {
                let response = await fetch('/api/v1/pendientes?filter=active');
                let { data } = await response.json();
                if (data._id) {
                    setLoadingPendientes(false);
                    setPendientes(data);
                } else {
                    throw new Error();
                };
            } catch (error) {
                setLoadingPendientes(false);
                setErrorPendientes("Ocurrió un Error. Por favor recargue la página")
            };
        };
        fetchPendientes();
    }, []);
    return (
        <main className="container p-5">
            <div className="row">
                <div className="col-12">
                    <h2>Por comprar</h2>
                    {loadingGastos ? <h2>Cargando...</h2>
                        :errorGastos ? <h2 className="text-danger">{errorGastos}</h2>
                        :(gastos ? 
                            <GastosList currentGastos={gastos} setCurrentGastos={setGastos}/>
                            : <h2 className="text-info">No hay compras por hacer</h2>
                            )}
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <h2>Por hacer</h2>
                    {loadingPendientes ? <h2>Cargando...</h2>
                        :errorPendientes ? <h2 className="text-danger">{errorPendientes}</h2>
                        :(pendientes ? 
                            <ToDoList currentList={pendientes} setCurrentList={setPendientes} />
                            : <h2 className="text-info">No hay pendientes por hacer</h2>
                        )}
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    <h2>Balance</h2>
                </div>
            </div>
        </main>
    );
};

export default Inicio;