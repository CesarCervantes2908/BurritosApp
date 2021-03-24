import { useEffect, useState } from "react";


const useFetchBills = (initialDate) => {
    const [bills, setBills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [dayTotal, setDayTotal] = useState(0);
    const [dayDate, ] = useState(initialDate);
    useEffect(() => {
        if (bills.length > 0) {
            let newTotal = 0;
            bills.forEach(bill => newTotal += bill.billTotal);
            setDayTotal(newTotal);
        };
    }, [bills]);
    useEffect(() => {
        setIsLoading(true);
        const fetchBills = async () => {
            try {
                let response = await fetch(`/api/v1/ventas/days/${dayDate}/cuentas`);
                let { data } = await response.json();
                setIsLoading(false);
                setBills(data);
            } catch (error) {
                setIsLoading(false);
                setError('Lo sentimos, ocurrió un error. Recarge la página por favor.');
                console.error(error);
            }
        };
        fetchBills();
    }, [dayDate]);
    return [bills, isLoading, error, dayTotal, dayDate];
}

export default useFetchBills;