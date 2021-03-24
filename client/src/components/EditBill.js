import {  Redirect } from 'react-router-dom';
import useFetchBill from '../hooks/useFetchBill';
import BillCard from './BillCard';
import Menu from './Menu';


const EditBill = ({ match, history}) => {
    const [redirect, isLoading, billID, error, bill, addProduct, substractProduct, handleClick, setError, setBill] = useFetchBill(match, history);
    return (
        <main className="container pt-3">
            <div className="row">
                <h1 className="mx-auto">
                    {(billID === 'nueva' ? 'Crear' : 'Editar') + ' Cuenta'}
                </h1>
            </div>
            <div className="row mt-5">
                <h2>Cuenta Actual</h2>
            </div>
            <div className="row">
                <h3 className="mt-1">Nombre</h3>
                <input 
                    type="text" 
                    className="form-control mt-1" 
                    value={bill.billName} 
                    onChange={({ target })=>{
                        setError('');
                        setBill(prevBill=>({...prevBill, billName: target.value}))}}
                    />
            </div>
            <div className="row my-3">
                {isLoading ? <h2 className="mx-auto">Cargando...</h2>
                    :<BillCard
                            bill={bill}
                            addProduct={addProduct}
                            substractProduct={substractProduct}
                        />
                    }
            </div>
            {redirect ? <Redirect push to={`/ventas/days/${bill.date}/cuentas`} />
                : <div className="row">
                    <button className="btn btn-primary btn-block my-5" onClick={handleClick}>Terminar</button>
                </div>}
            <div className="row mt-5">
                <h2 className="mx-auto">Menú</h2>
            </div>
            <div className="row mt-1">
                <Menu 
                    buttonAble={true}
                    addProduct={addProduct}
                    substractProduct={substractProduct}
                />
            </div>
            {error && <h2 className="mxauto text-danger">{error}</h2> }
            {redirect ? <Redirect push to={`/ventas/days/${bill.date}/cuentas`}/> 
            :<div className="row">
                    <button className="btn btn-primary btn-block my-5" onClick={handleClick}>Terminar</button>
            </div>}
        </main>
    );
};

export default EditBill;