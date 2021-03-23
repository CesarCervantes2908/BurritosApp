import React, { useState } from 'react'
import CreateGastosButton from './CreateGastosButton';
import GastosForm from './GastosForm';
import GastosList from './GastosList';

const Gastos = () => {
    const [gastosLists, setGastosLists] = useState([{
        date: '22-3-2021',
        products: [{
            name: 'Jitomate',
            quantity: 10,
            pricePerQuantity: 20,
            total: 0,
            checked: false
        }],
        gastosTotal: 0,
        finished: false
    }]);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentGastos, setCurrentGastos] = useState(gastosLists[0]);
    return (
        <main className="container p-5">
            <div className="row">
                <h1 className="mx-auto">Gastos</h1>
            </div>
            <div className="row mt-5">
                <h2>Lista Actual</h2>
            </div>
            <div className="row my-5">
                {currentGastos ?
                    <>
                        <GastosList currentGastos={currentGastos} setCurrentGastos={setCurrentGastos} />
                        {editMode ?
                            <GastosForm
                                setCurrentGastos={setCurrentGastos}
                                setEditMode={setEditMode}
                                currentGastos={currentGastos}
                            />
                            : <div className="col-4">
                                {!currentGastos?.finishedList &&
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => setEditMode(true)}
                                    >
                                        Agregar Gasto
                                    </button>
                                }
                                <CreateGastosButton
                                    className={"btn btn-block btn-" + (currentGastos?.finishedList ? "success" : "warning")}
                                    setCurrentGastos={setCurrentGastos}
                                    setGastosLists={setGastosLists}
                                    currentGastos={currentGastos}
                                />
                            </div>
                        }
                    </>
                    : <CreateGastosButton
                        className="btn btn-lg btn-success mx-auto"
                        currentGastos={currentGastos}
                        setGastosLists={setGastosLists}
                        setCurrentGastos={setCurrentGastos}
                    />
                }
            </div>
            <div className="row mt-5 mb-3">
                <h2>Listas Anteriores</h2>
            </div>
            <div className="row">
                <div className="col-12">
                    {isLoading ? <h3 className="my-5 mx-auto">Cargando...</h3>
                        : error ? <h3 className="mx-auto text-danger">{error}</h3>
                            : <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Fecha de Lista</th>
                                        <th>Total de Lista</th>
                                    </tr>
                                </thead>
                                <tbody className="table-hover">
                                    {gastosLists.map((list, index) => {
                                        return (
                                            <tr className={list.finished ? "" : "table-success"} 
                                                key={index}
                                                onClick={()=>setCurrentGastos(list)}
                                                >
                                                <th>{list.date}</th>
                                                <td>${list.gastosTotal}</td>
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

export default Gastos;