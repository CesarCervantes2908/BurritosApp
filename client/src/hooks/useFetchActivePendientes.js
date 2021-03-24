import { useEffect, useState } from "react";

const useFetchActivePendientes = () => {

    const [pendientes, setPendientes] = useState(null);
    const [loadingPendientes, setLoadingPendientes] = useState(false);
    const [errorPendientes, setErrorPendientes] = useState('');
    useEffect(() => {
        const fetchPendientes = async () => {
            setLoadingPendientes(true);
            try {
                let response = await fetch('/api/v1/pendientes?filter=active');
                let { data } = await response.json();
                if (data === null || data._id) {
                    setLoadingPendientes(false);
                    setPendientes(data);
                } else {
                    throw new Error();
                };
            } catch (error) {
                console.log(error);
                setLoadingPendientes(false);
                setErrorPendientes("Ocurrió un Error. Por favor recargue la página")
            };
        };
        fetchPendientes();
    }, []);
    return [pendientes, errorPendientes, loadingPendientes, setPendientes];
};

export default useFetchActivePendientes;