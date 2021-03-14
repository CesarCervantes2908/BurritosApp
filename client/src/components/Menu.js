import React from 'react';
import { menu }  from '../utils/menu';

const Menu = ({ buttonAble, addProduct, substractProduct }) => {
    const renderMenus = () => {
        return Object.entries(menu).map(([menuName, productsObject])=>{
            let tableRows = Object.entries(productsObject).map(([product, price])=>{
                return(
                    <tr className="table-secondary" key={product}>
                        <td>${price}</td>
                        <td>{product}</td>
                        {buttonAble &&
                            <td className="d-flex justify-content-around">
                                <button 
                                    className="btn btn-sm btn-outline-primary mr-1"
                                    onClick={()=>addProduct({price, name: product})}
                                    >
                                    +
                                </button>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => substractProduct(product)}
                            >
                                -
                            </button>
                            </td>
                        }
                    </tr>
                );
            });
            return (
                <table className="table col-5 mx-3" key={menuName}>
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">Precio</th>
                            <th scope="col">{menuName}</th>
                            {buttonAble &&
                                <th scope="col">Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            );
        });
    };   
    return (
        <>
            <div className="row">
                {renderMenus()}
            </div>
        </>
    );
};

export default Menu;