import React, { useEffect, useState } from 'react'
import { formatDate } from '../utils/helperFunction';
import CreateGastosButton from './CreateGastosButton';
import GastosForm from './GastosForm';
import GastosList from './GastosList';

const Gastos = () => {
    const [gastosLists, setGastosLists] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentGastos, setCurrentGastos] = useState(null);
    useEffect(()=>{
        const fetchGastos = async()=>{
            setIsLoading(true);
            try {
                let response = await fetch("/api/v1/gastos");
                let { data } = await response.json();
                if(data.length !== undefined){
                    setGastosLists(data);
                    setIsLoading(false);
                }else{
                    throw new Error();
                }
            } catch (error) {
                setError("Hubo un problema. Inténtelo de nuevo por favor");
                setIsLoading(false);
            }
        };
        fetchGastos();
    },[]);
    useEffect(()=>{
        if(gastosLists.length > 0){
            gastosLists.forEach(list=> {
                if(!list.finished){
                    return setCurrentGastos(list);
                };
            });
        };
    },[gastosLists]);
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
                                {!currentGastos?.finished &&
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => setEditMode(true)}
                                    >
                                        Agregar Gasto
                                    </button>
                                }
                                <CreateGastosButton
                                    className={"btn btn-block btn-" + (currentGastos?.finished ? "success" : "warning")}
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
                                    {gastosLists?.map(list => {
                                        return (
                                            <tr className={list.finished ? " " : "table-success"}
                                                key={list._id}
                                                onClick={()=>setCurrentGastos(list)}
                                                >
                                                <th>{formatDate(list.date)}</th>
                                                <td>{list.finished ? `$${list.gastosTotal}` : "Abierta..."}</td>
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