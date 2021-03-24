import React, { useEffect, useState } from 'react'
import useFetchActiveGastos from '../hooks/useFetchActiveGastos';
import useFetchActivePendientes from '../hooks/useFetchActivePendientes';
import GastosList from './GastosList';
import ToDoList from './ToDoList';

const Inicio = () => {
    const [bussinessTotal, setBussinessTotal] = useState(0);
    const [gastos, errorGastos, loadingGastos, setGastos] = useFetchActiveGastos();
    const [pendientes, errorPendientes, loadingPendientes, setPendientes] = useFetchActivePendientes();
    useEffect(()=>{
        //Obtiene el total 
        const fetchBussiness = async()=>{
            try {
                let response = await fetch('/api/v1/bussiness');
                let { data } = await response.json();
                if(data._id){
                    setBussinessTotal(data.totalAmount);
                }else{
                    throw new Error();
                };
            } catch (error) {
              return alert('Hubo un Error. Recarge la página');  
            };
        };
        fetchBussiness();
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
            <div className="row mt-5">
                <div className="col">
                    <h2>
                        Total: <span className={`text-${bussinessTotal < 0 ? "danger": "success"}`}>
                            ${bussinessTotal}
                        </span>
                    </h2>
                </div>
            </div>
        </main>
    );
};

export default Inicio;