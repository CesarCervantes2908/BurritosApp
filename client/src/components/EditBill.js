import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { parseTotal } from '../utils/helperFunction';
import BillCard from './BillCard';
import Menu from './Menu';


const EditBill = ({ match, history}) => {
    const [billID, setBillID] = useState(match.params.id);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [bill, setBill] = useState({
        date: match.params.date,
        products: [],
        billName: '',
        billTotal: 0,
        isClosed: false
    });
    useEffect(()=>{
        let total = parseTotal(bill.products);
        setBill(prevBill=>({
            ...prevBill,
            billTotal: total
        }));
    }, [bill.products]);
    useEffect(()=>{
        const fetchBill = async()=>{
            let date = match.params.date;
            setIsLoading(true);
            try {
                let response = await fetch(`/api/v1/ventas/days/${date}/cuentas/${billID}`);
                let { data } = await response.json();
                console.log(data);
                setIsLoading(false);
                setBill(data);
            } catch (error) {
                setIsLoading(false);
                setError('No se pudieron obtener los datos. Refresque la página.')
                console.error(error);
            }
        };
        if(billID !== 'nueva') fetchBill();
    }, []);
    const addProduct = ({price, name})=>{
        setError('');
        setBill(prevBill=>{
            let newProducts = prevBill['products'].slice();
            if(newProducts.some(product=> product.name === name)){
                newProducts.forEach(product=>{
                    if(product.name === name){
                        product.quantity++;
                    };
                });
            }else{
                newProducts = [...newProducts, {name, price, quantity: 1}];
            };
            return {...prevBill, products: newProducts};
        });
    };
    const substractProduct =  (name) => {
        if (bill['products'].some(product => product.name === name)) {
            setBill(prevBill => {
                let newProducts = prevBill['products'].slice();
                let flag = false;
                newProducts.forEach(product => {
                    if (product.name === name) {
                        product.quantity--;
                    };
                    if (product.quantity < 1) flag = true;
                });
                if(flag) newProducts = newProducts.filter(product=> product.name !== name);
                return {...prevBill, products: newProducts};
            });
        };
    };
    const handleClick = async()=>{
        if(!bill.billName.trim()){
            setError("Debe agregar el nombre de la cuenta");
            return;
        } else if (bill.products.length < 1){
            setError("Debe agregar productos a la cuenta");
            return;
        };
        setIsLoading(true);
        let endPoint = billID === 'nueva' ? 
            `/api/v1/ventas/days/${bill.date}/cuentas`
            : `/api/v1/ventas/days/${bill.date}/cuentas/${billID}/edit/products`;
        let fetchObject = {
            method: billID === 'nueva' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bill)
        }
        try {
            let response = await fetch(endPoint, fetchObject);
            let { data } = await response.json();
            console.log(data);
            setIsLoading(false);
            setRedirect(true);
        } catch (error) {
            setIsLoading(false);
            setError("No se pudo crear la cuenta. Intentelo de nuevo.");
            console.error(error);
        }
    };
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