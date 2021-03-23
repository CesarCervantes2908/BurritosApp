import { useEffect } from "react";

const GastosList = ({ currentGastos, setCurrentGastos}) => {
    useEffect(() => {
        if(currentGastos?.products.length > 0){
            let newProducts = currentGastos.products.slice();
            newProducts.forEach(producto=>{
                producto.total = producto.quantity * producto.pricePerQuantity;
            });
            setCurrentGastos(prevCurrentGastos=>({...prevCurrentGastos, products: newProducts}));
        }
    }, []);
    useEffect(() => {
        let newTotal = 0;
        let {products} = currentGastos;
        products.forEach(({total})=> newTotal += total);
        setCurrentGastos(prevCurrentGastos=>({...prevCurrentGastos, gastosTotal: newTotal})); 
    }, [currentGastos.products]);
    useEffect(()=>{
        let {products} = currentGastos;
        if(products.every(({checked})=> checked)){
            setCurrentGastos(prevCurrentGastos=>({...prevCurrentGastos, finished: true}));
        };
    }, [currentGastos.products]);
    const handleBorrarClick = (id)=>{
        setCurrentGastos(prevCurrentGastos=>{
            let newProducts = prevCurrentGastos.products.slice();
            newProducts = newProducts.filter((_, _id)=> _id !== id);
            return {...prevCurrentGastos, products: newProducts}
        });
    };
    const handleListoClick = (id)=>{
        setCurrentGastos(prevCurrentGastos => {
            let newProducts = prevCurrentGastos.products.slice();
            newProducts[id].checked = true;
            return { ...prevCurrentGastos, products: newProducts }
        });
    };
    return (
        <table className="table col-8">
            <thead className="bg-primary text-white">
                <tr>
                    <th scope="row">Cantidad</th>
                    <th scope="row">Producto</th>
                    <th scope="row">Precio/unidad</th>
                    <th scope="row">Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentGastos.products.map((producto, index)=>{
                    return (
                        <tr className="table-secondary" key={producto.name}>
                            <td>{producto.quantity}</td>
                            <td>{producto.name}</td>
                            <td>${producto.pricePerQuantity}</td>
                            <td>${producto.total}</td>
                            <td className="d-flex">
                                {producto.checked ? <span className="badge badge-pill badge-success">Hecho</span>
                                :<>
                                    <button
                                        className="btn btn-sm btn-success mr-2"
                                        onClick={() => { handleListoClick(index) }}
                                    >
                                        Listo
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => { handleBorrarClick(index) }}
                                    >
                                        Borrar
                                    </button>
                                </>
                                }
                            </td>
                        </tr>
                )})}
            </tbody>
            <tfoot>
                <tr className="table-primary">
                    <td colSpan="3"><h3>Total:</h3></td>
                    <td className="text-danger" colSpan="2">${currentGastos.gastosTotal}</td>
                </tr>
            </tfoot>
        </table>
    );
};

export default GastosList;