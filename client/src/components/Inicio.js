import React, { useState } from 'react'
import GastosList from './GastosList';
import ToDoList from './ToDoList';

const Inicio = () => {
    const [pendientes, setPendientes] = useState(null);
    const [gastos, setGastos] = useState(null);

    return (
        <main className="container p-5">
            <div className="row">
                <div className="col-12">
                    <h2>Por comprar</h2>
                    {gastos ? 
                        <GastosList currentGastos={gastos} setCurrentGastos={setGastos}/>
                        : <h2 className="text-info">No hay compras por hacer</h2>
                        }
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <h2>Por hacer</h2>
                    {pendientes ? 
                        <ToDoList currentList={pendientes} setCurrentList={setPendientes} />
                        : <h2 className="text-info">No hay pendientes por hacer</h2>
                    }
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