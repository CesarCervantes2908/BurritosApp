const useHandleClicks = (currentGastos, setCurrentGastos) => {
    const handleBorrarClick = async (id) => {
        let newProducts = currentGastos.products.slice();
        newProducts = newProducts.filter(({ _id }) => _id !== id);
        try {
            let response = await fetch(`/api/v1/gastos/${currentGastos._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ list: { products: newProducts } })
            });
            let { data } = await response.json();
            console.log(data);
            if (data._id) {
                setCurrentGastos(data);
            } else {
                throw new Error();
            };
        } catch (error) {
            return alert("No se pudo borrar. Intente de nuevo");
        }
    };
    const handleListoClick = async (id) => {
        let newProducts = currentGastos.products.slice();
        newProducts.forEach(product => {
            if (product._id === id) {
                product.checked = true;
            };
        });
        try {
            let response = await fetch(`/api/v1/gastos/${currentGastos._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    list: {
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
    return [handleListoClick, handleBorrarClick];
};

export default useHandleClicks;