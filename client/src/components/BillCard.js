import React, { useEffect, useState } from 'react';
import { parseTotal } from '../utils/helperFunction';

const BillCard = ({ bill, addProduct, substractProduct }) => {
    const renderTableBody = ()=>{
        return bill['products'].map(prodcutInfo=>(
            <tr className="table-light" key={prodcutInfo.name}>
                <td>{prodcutInfo.quantity}</td>
                <td>${prodcutInfo.price}</td>
                <td>{prodcutInfo.name}</td>
                <td>
                    <button
                        className="btn btn-sm btn-outline-primary mr-1"
                        onClick={() => addProduct({ price: prodcutInfo.price, name: prodcutInfo.name })}
                    >
                        +
                    </button>
                    <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => substractProduct(prodcutInfo.name)}
                        >
                        -
                    </button>
                </td>
            </tr>
        ));
    };
    return (
        <div className="row">
            <table className="table">
                <thead>
                    <tr className="table-dark">
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Nombre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
                <tfoot>
                    <tr className="table-success text-center">
                        <td colSpan="4"><h3>${bill.billTotal}</h3></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default BillCard;