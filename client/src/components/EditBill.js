import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { parseTotal } from '../utils/helperFunction';
import BillCard from './BillCard';
import Menu from './Menu';


const EditBill = ({ match, history}) => {
    const [billID, setBillID] = useState(match.params.id);
    const [bill, setBill] = useState({
        date :match.params.date,
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
        billTotal: 0
    });
    useEffect(()=>{
        let total = parseTotal(bill.products);
        setBill(prevBill=>({
            ...prevBill,
            billTotal: total
        }));
    }, [bill.products]);
    const addProduct = ({price, name})=>{
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
    return (
        <main className="container pt-3">
            <div className="row">
                <h1 className="mx-auto">
                    {(billID === 'nueva' ? 'Crear' : 'Editar') + ' Cuenta'}
                </h1>
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
            <div className="row">
                <BillCard 
                    bill={bill}
                    addProduct={addProduct}
                    substractProduct={substractProduct}
                    />
            </div>
            <div className="row">
                    <button className="btn btn-primary btn-block" onClick={()=>history.goBack()}>Terminar</button>
            </div>
        </main>
    );
};

export default EditBill;