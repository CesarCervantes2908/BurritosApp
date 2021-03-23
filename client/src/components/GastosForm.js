import { useEffect, useState } from "react";

const GastosForm = ({ setEditMode, setCurrentGastos }) => {
    const [name, setName] = useState('');
    const [pricePerQuantity, setPricePerQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    useEffect(()=>{
        if(pricePerQuantity && quantity){
            setTotal(pricePerQuantity * quantity);
        };
    },[pricePerQuantity, quantity]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name.trim() || !pricePerQuantity || !total || !quantity) return;
        setCurrentGastos(prevCurrentGastos=>{
            let newProducts = prevCurrentGastos.products.slice();
            newProducts.push({name, quantity, pricePerQuantity, total, checked: false});
            return {...prevCurrentGastos, products: newProducts};
        });
        setName('');
        setTotal(0);
        setQuantity(0);
        setPricePerQuantity(0);
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