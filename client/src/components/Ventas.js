import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { parseDate } from '../utils/helperFunction';

const Ventas = () => {
    const [date, setDate] = useState(parseDate());
    const [isSellingDayStarted, setIsSellingDayStarted] = useState(false);
    const [sellingDays, setSellingDays] = useState([{date: "12-Mar-2021", total: 500}]);
    return (
        <main className="container pt-4">
            <div className="row"><h1 className="mx-auto">Ventas</h1></div>
            {isSellingDayStarted ? null 
                : <div className="row mt-3">
                    <button className="btn btn-primary btn-block">
                            Empezar Día de Venta
                    </button>
                  </div> 
                }
            <div className="row mt-5"><h3>Días de Venta</h3></div>
            <div className="row mt-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                           <th scope="col">Fecha</th>
                           <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellingDays.map(({date, total})=>(
                            <tr className="table-active" key={date}>
                                <th scope="row">
                                    <Link to={`/ventas/days/${date}`}>{date}</Link>
                                </th>
                                <td>${total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Ventas;