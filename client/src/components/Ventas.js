import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import useFetchDays from '../hooks/useFetchDays';
import { formatDate, parseDate, sortDates } from '../utils/helperFunction';

const Ventas = () => {
    let [sellingDays, isSellingDayStarted, isLoading, error, bussinessTotal, date] = useFetchDays();
    const [newDayLink, setNewDayLink] = useState('');
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [errorButton, setErrorButton] = useState('');   
    const createNewDay = async()=>{
        setIsLoadingButton(true);
        try {
            let response = await fetch(`/api/v1/bussiness/days/${date}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let { data } = await response.json();
            if(data){
                setIsLoadingButton(false);
                setNewDayLink(`/ventas/days/${date}`);
            }else{
                throw new Error();
            };
        } catch (error) {
            setIsLoadingButton(false);
            setErrorButton("Lo sentimos, el día de ventas NO pudo ser creado.");
            let timeout = setTimeout(()=>{
                setErrorButton('');
                clearTimeout(timeout);
            }, 3000);
            console.log(error);
        }
    };
    return (   
        <main main className = "container pt-4" >
        {newDayLink ? <Redirect push to={`${newDayLink}`}/> : 
            <>
                <div className="row"><h1 className="mx-auto">Ventas</h1></div>
                {isLoadingButton ? <h2 className="mx-auto">Creando ...</h2>
                : errorButton ? <h2 className="mx-auto text-danger">{errorButton}</h2>
                : (!isSellingDayStarted &&
                <div className="row mt-3">
                    <button className="btn btn-primary btn-block" onClick={createNewDay}>
                        Empezar Día de Venta
                                </button>
                </div>)
                }
                <div className="row mt-5"><h3>Días de Venta</h3></div>
                <div className="row mt-2">
                    {isLoading ? <h2 className="mx-auto">Cargando ...</h2>
                    :error ? <h2 className="mx-auto text-danger">{error}</h2>
                    :<table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                                {sellingDays.map(({date :sellingDayDate, totalSold, isClosed})=>(
                                <tr 
                                    className={isClosed ? "table-active"
                                        :date === sellingDayDate ? "table-success" 
                                        : "table-warning"} 
                                    key={sellingDayDate}
                                    >
                                    <th scope="row">
                                        <Link to={`/ventas/days/${sellingDayDate}?closed=${isClosed}`}>
                                            {formatDate(sellingDayDate)}
                                        </Link>
                                    </th>
                                    <td>{isClosed? `$${totalSold}` : "Abierto..."}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    }
                </div>
                <div className="row my-5">
                    <h2>Ventas Totales: <span className="text-success">${bussinessTotal}</span></h2>
                </div>
            </>
        }    
        </main>
    );
};

export default Ventas;