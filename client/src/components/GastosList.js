import { useEffect } from "react";

const GastosList = ({ currentGastos, setCurrentGastos}) => {
    useEffect(() => {
        //Pone los totales para cada uno de los productos según la cantidad y el precio por cantidad
        if(currentGastos?.products?.length > 0){
            let newProducts = currentGastos.products.slice();
            newProducts.forEach(producto=>{
                producto.total = producto.quantity * producto.pricePerQuantity;
            });
            setCurrentGastos(prevCurrentGastos=>({...prevCurrentGastos, products: newProducts}));
        }
    }, []);
    useEffect(() => {
        //Pone el total a la cuenta en total (de todos los productos)
        if(currentGastos){
            let newTotal = 0;
            let {products} = currentGastos;
            products?.forEach(({total})=> newTotal += total);
            setCurrentGastos(prevCurrentGastos=>({...prevCurrentGastos, gastosTotal: newTotal})); 
        };
    }, [currentGastos?.products]);
    useEffect(()=>{
        //Revisa si se cumplieron todas las compras y asigna el finished a la lista de gastos
        const setFinishedList = async()=>{
            if(currentGastos && !currentGastos.finished && currentGastos.products.length > 0){
                let { products } = currentGastos;
                if (products?.every(({ checked }) => checked)) {
                    try {
                        let response = await fetch(`/api/v1/gastos/${currentGastos._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                list: {
                                    finished: true 
                                },
                            }),
                        });
                        let { data } = await response.json();
                        if(data._id){
                            setCurrentGastos(data);
                        }else{
                            throw new Error();
                        };
                    } catch (error) {
                      return("No se pudo actualizar. Inténtelo de nuevo");  
                    };
                };
            };
        };
        setFinishedList();
    }, [currentGastos?.products]);
    const handleBorrarClick = async(id)=>{
        let newProducts = currentGastos.products.slice();
        newProducts = newProducts.filter(({_id})=> _id !== id);
        try {
            let response = await fetch(`/api/v1/gastos/${currentGastos._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({list: {products: newProducts}})
            });
            let { data } = await response.json();
            console.log(data);
            if(data._id){
                setCurrentGastos(data);
            } else{
                throw new Error();
            };
        } catch (error) {
            return alert("No se pudo borrar. Intente de nuevo");
        }
    };
    const handleListoClick = async(id)=>{
        let newProducts = currentGastos.products.slice();
        newProducts.forEach(product=>{
            if(product._id === id){
                product.checked = true;
            };
        });
        try {
            let response = await fetch(`/api/v1/gastos/${currentGastos._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ list: { 
                    products: newProducts, 
                    gastosTotal: currentGastos.gastosTotal
                    }
                })
            });
            let { data } = await response.json();
            console.log(data);
            if (data._id) {
                setCurrentGastos(data);
            } else {
                throw new Error();
            };
        } catch (error) {
            return alert("No se pudo completar. Intente de nuevo");
        }
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
                {currentGastos?.products?.map(producto=>{
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
                                        onClick={() => { handleListoClick(producto._id) }}
                                    >
                                        Listo
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => { handleBorrarClick(producto._id) }}
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
                    <td className="text-danger" colSpan="2">${currentGastos?.gastosTotal || 0}</td>
                </tr>
            </tfoot>
        </table>
    );
};

export default GastosList;