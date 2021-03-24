import { useEffect, useState } from "react";

const useFetchActiveGastos = () => {
    const [gastos, setGastos] = useState(null);
    const [loadingGastos, setLoadingGastos] = useState(false);
    const [errorGastos, setErrorGastos] = useState('');
    useEffect(() => {
        const fetchGastos = async () => {
            setLoadingGastos(true);
            try {
                let response = await fetch('/api/v1/gastos?filter=active');
                let { data } = await response.json();
                if (data === null || data._id) {
                    setLoadingGastos(false);
                    setGastos(data);
                } else {
                    throw new Error();
                };
            } catch (error) {
                console.log(error);
                setLoadingGastos(false);
                setErrorGastos("Ocurrió un Error. Por favor recargue la página")
            };
        };
        fetchGastos();
    }, []);
    return [gastos, errorGastos, loadingGastos, setGastos];
};

export default useFetchActiveGastos;