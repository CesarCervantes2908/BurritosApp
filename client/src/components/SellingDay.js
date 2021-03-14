import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SellingDay = ({ match }) => {
    const [dayDate, setDayDate] = useState(match.params.date);
    const [billToClose, setBillToClose] = useState({});
    const [pago, setPago] = useState(0);
    const [cambio, setCambio] = useState(0);
    const [bills, setBills] = useState([{
        id: '0',
        date: dayDate,
        products: [{
            name: 'arrachera',
            price: 65,
            quantity: 2,
        }, {
            name: 'coca',
            price: 20,
            quantity: 1
        }],
        billName: "Cliente 1",
        billTotal: 230,
        isClosed: false
    },
    {
        id: '1',
        date: dayDate,
        products: [{
            name: 'arrachera',
            price: 65,
            quantity: 2,
        }, {
            name: 'coca',
            price: 20,
            quantity: 1
        }],
        billName: "Cliente 2",
        billTotal: 400,
        isClosed: true
    }]);
    useEffect(()=>{
        if(billToClose){
            setCambio(pago - billToClose.billTotal);
        };
    }, [pago]);
    const handleCloseClick = (id) => {
        let billToClose = bills.find(bill=> bill.id === id);
        setBillToClose(billToClose);
    };
    return (
        <main className="container pt-3">
            <div className="row">
                <h1 className="mx-auto text-center">Ventas del {dayDate}</h1>
            </div>
            <div className="row mt-5">
                <Link to={`/ventas/days/${dayDate}/cuentas/edit/nueva`} className="mx-auto">
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
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(({ billName, billTotal, id, isClosed }) => (
                            <tr className="table-active" key={id}>
                                <th scope="row">{billName}</th>
                                <td>${billTotal}</td>
                                {isClosed ? <td>Sin acciones disponibles</td>
                                    : <td>
                                        <Link 
                                            to={`/ventas/days/${dayDate}/cuentas/edit/${id}`} 
                                            key={id} 
                                            className="mr-1"
                                            >
                                            <button className="btn btn-sm btn-outline-info">Editar</button>
                                        </Link>
                                        <button 
                                            className="btn btn-sm btn-outline-success" 
                                            data-toggle="modal" 
                                            data-target="#dialogo1"
                                            onClick={()=>{handleCloseClick(id)}}
                                            >
                                            Cerrar
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="modal" id="dialogo1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cerrar Cuenta</h5>
                        </div>
                        <div className="modal-body">
                            <h3>Total : ${billToClose.billTotal}</h3>
                            <h3>Pago del Cliente:</h3>
                            <input 
                                type="number" 
                                className="form-control" 
                                onChange={({ target })=>setPago(target.value)}
                                value={pago}
                                />
                            {cambio >= 0 ? <h3>Cambio: ${cambio}</h3>: <h3>Pago insuficiente</h3> }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-success" data-dismiss="modal">
                                Cerrar Cuenta
                            </button>
                            <button type="button" className="btn btn-outline-danger" data-dismiss="modal">
                                Cancelar Cierre
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    );
};

export default SellingDay;