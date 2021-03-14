import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SellingDay = ({ match }) => {
    const [dayDate, setDayDate] = useState(match.params.date);
    const [bills, setBills] = useState([]);
    return (
        <main className="container pt-3">
            <div className="row">
                <h1 className="mx-auto text-center">Ventas del {dayDate}</h1>
            </div>
            <div className="row mt-5">
                <Link to={`/ventas/day/${dayDate}/cuentas/edit/nueva`} className="mx-auto">
                    <button type="button" className="btn btn-success btn-lg ">Cuenta Nueva</button>
                </Link>
            </div>
            <div className="row mt-5">
                <h3>Cuentas del Día</h3>
            </div>
            <div className="row">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(({ name, total, id}) => (
                            <Link to= {`/ventas/day/${id}`} key={id}>
                                <tr className="table-active" key={id}>
                                    <th scope="row">{name}</th>
                                    <td>${total}</td>
                                </tr>
                            </Link>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default SellingDay;