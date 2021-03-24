import { useEffect, useState } from "react";

const GastosForm = ({ setEditMode, setCurrentGastos, currentGastos }) => {
    const [name, setName] = useState('');
    const [pricePerQuantity, setPricePerQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    useEffect(()=>{
        if(pricePerQuantity && quantity){
            setTotal(pricePerQuantity * quantity);
        };
    },[pricePerQuantity, quantity]);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!name.trim() || !pricePerQuantity || !total || !quantity) return;
        try {
            let newProducts = currentGastos.products.slice();
            newProducts.push({
                name, 
                quantity, 
                pricePerQuantity, 
                total,
            });
            let response = await fetch(`/api/v1/gastos/${currentGastos._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({list: {products: newProducts}})
            });
            let { data } = await response.json();
            if(data._id){
                setCurrentGastos(data);
                setName('');
                setTotal(0);
                setQuantity(0);
                setPricePerQuantity(0);
            }else{
                throw new Error();
            };
        } catch (error) {
            return alert("No se puedo agregar. Intente de nuevo");
        }
    };
    return (
        <div className="col-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="name">Producto</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={({ target }) => { setName(target.value) }}
                        className="form-control"
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="quantity">Cantidad</label>
                    <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={({ target }) => { setQuantity(target.value) }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="pricePerQuantity">Precio/Unidad</label>
                    <input
                        id="pricePerQuantity"
                        type="number"
                        min="0"
                        value={pricePerQuantity}
                        onChange={({ target }) => { setPricePerQuantity(target.value) }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <fieldset>
                        <label className="control-label" htmlFor="total">Total</label>
                        <input 
                            className="form-control" 
                            id="total" type="text" 
                            readOnly 
                            value={total}
                            />
                    </fieldset>
                </div>
                <button className="btn btn-success form-control" type="submit">Agregar</button>
            </form>
            <button
                className="btn btn-primary form-control mt-3" type="button"
                onClick={() => setEditMode(false)}
            >
                Terminar
            </button>
        </div>
    );
};

export default GastosForm;