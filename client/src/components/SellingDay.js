import { Link } from 'react-router-dom';
import useCloseBillLogic from '../hooks/useCloseBillLogic';
import useFetchBills from '../hooks/useFetchBills';
import useQuery from '../hooks/useQuery';
import { formatDate } from '../utils/helperFunction';

const SellingDay = ({ history, match }) => {
    const [bills, isLoading, error, dayTotal, dayDate] = useFetchBills(match.params.date);
    const [billToClose, pago, cambio, isDayClosed, setPago, handleCloseClick, closeBill] = useCloseBillLogic(bills);
    const closeDay = async()=>{
        if(bills.some(bill=> !bill.isClosed)) return alert("Debe cerrar todas las cuentas del día");
        try {
            let response = await fetch(`/api/v1/bussiness/days/${dayDate}/close`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({dayTotal})
            });
            if(response.ok) history.push("/ventas");
        } catch (error) {
            console.error(error);
        };
    };
    return (
        <main className="container pt-3">
            <div className="row">
                <h1 className="mx-auto text-center">Ventas del {formatDate(dayDate)}</h1>
            </div>
            {!isDayClosed && <div className="row mt-5">
                <Link to={`/ventas/days/${dayDate}/cuentas/edit/nueva`} className="mx-auto">
                    <button type="button" className="btn btn-success btn-lg ">Cuenta Nueva</button>
                </Link>
            </div>}
            <div className="row mt-5">
                <h3>Cuentas del Día</h3>
            </div>
            <div className="row">
                {isLoading ? <h2 className="mx-auto">Cargando ...</h2>
                : error ? <h2 className="mx-auto text-danger">{error}</h2>
                :<table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Total</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(({ billName, billTotal, _id, isClosed }) => (
                            <tr className="table-active" key={_id}>
                                <th scope="row">{billName}</th>
                                <td>${billTotal}</td>
                                {isClosed ? <td>Sin acciones disponibles</td>
                                    : <td>
                                        <Link 
                                            to={`/ventas/days/${dayDate}/cuentas/edit/${_id}`} 
                                            key={_id} 
                                            className="mr-1"
                                            >
                                            <button className="btn btn-sm btn-outline-info">Editar</button>
                                        </Link>
                                        <button 
                                            className="btn btn-sm btn-outline-success" 
                                            data-toggle="modal" 
                                            data-target="#dialogo1"
                                            onClick={()=>{handleCloseClick(_id)}}
                                            >
                                            Cerrar
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
            </div>
            <div className="row my-1">
                <h2>Total del día: <span className="text-success">${dayTotal}</span></h2>
            </div>
            <div className="row my-5">
                {isDayClosed ? 
                <Link to="/ventas"className="btn btn-block btn-primary">
                    Atrás
                </Link>
                :<button className="btn  btn-warning btn-block" onClick={closeDay}>
                    Cerrar Día de Venta
                </button>
                }
            </div>
            <div className="modal" id="dialogo1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cerrar Cuenta</h5>
                        </div>
                        {billToClose &&
                        <div className="modal-body">
                            <h3>Total : ${billToClose.billTotal}</h3>
                            <h3>Pago del Cliente:</h3>
                            <input 
                                type="number" 
                                className="form-control" 
                                onChange={({ target })=>setPago(parseInt(target.value))}
                                value={pago}
                                />
                            {cambio >= 0 ? <h3>Cambio: ${cambio}</h3>: <h3>Pago insuficiente</h3> }
                        </div>}
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-outline-success" 
                                data-dismiss="modal" 
                                onClick={()=>closeBill(billToClose.date, billToClose._id)}>
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