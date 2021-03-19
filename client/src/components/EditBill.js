import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import useFetchBill from '../hooks/useFetchBill';
import { parseTotal } from '../utils/helperFunction';
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
            <div className="row">
                <h2 className="mx-auto">Nombre</h2>
                <input 
                    type="text" 
                    className="form-control" 
                    value={bill.billName} 
                    onChange={({ target })=>{
                        setError('');
                        setBill(prevBill=>({...prevBill, billName: target.value}))}}
                    />
            </div>
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
            <div className="row">
                <h3>Cuenta Actual</h3>
            </div>
            {isLoading ? <h2 className="mx-auto">Cargando...</h2>
            :<div className="row">
                <BillCard 
                    bill={bill}
                    addProduct={addProduct}
                    substractProduct={substractProduct}
                    />
            </div>}
            {error && <h2 className="mxauto text-danger">{error}</h2> }
            {redirect ? <Redirect push to={`/ventas/days/${bill.date}/cuentas`}/> 
            :<div className="row">
                    <button className="btn btn-primary btn-block my-5" onClick={handleClick}>Terminar</button>
            </div>}
        </main>
    );
};

export default EditBill;