import { parseDate, sortDates } from "../utils/helperFunction";

const { useEffect, useState } = require("react");

const useFetchDays = () => {
    const [sellingDays, setSellingDays] = useState([]);
    const [isSellingDayStarted, setIsSellingDayStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [bussinessTotal, setBussinessTotal] = useState(0);
    const [date, setDate] = useState('');
    useEffect(() => {
        let todayDate = parseDate();
        setDate(todayDate);
    }, []);
    useEffect(()=>{
            const fetchDays = async()=>{
                setIsLoading(true);
                try {
                    let response = await fetch(`/api/v1/bussiness/days`);
                    let {data} = await response.json();
                    setIsLoading(false);
                    let sortDays = sortDates(data.slice());
                    setSellingDays(sortDays);
                } catch (error) {
                    setError("Hubo un Error. Por favor refresque la página");
                    console.log();
                };
            };
            fetchDays();
    }, []);
    useEffect(() => {
        if (sellingDays.some(sellingDay => sellingDay.date === date)) setIsSellingDayStarted(true);
    }, [sellingDays]);
    useEffect(() => {
        if (sellingDays.length > 0) {
            let newTotal = 0;
            sellingDays.forEach(sellingDay => newTotal += sellingDay.totalSold);
            setBussinessTotal(newTotal);
        }
    }, [sellingDays]);
    useEffect(() => {
        let updateBussinessTotal = async () => {
            if (bussinessTotal === 0) return;
            try {
                let response = await fetch(`/api/v1/bussiness/total`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newTotal: bussinessTotal })
                });
            } catch (error) {
                console.log(error);
            };
        };
        updateBussinessTotal();
    }, [bussinessTotal]);
    return [sellingDays, isSellingDayStarted, isLoading, error, bussinessTotal, date];
};

export default useFetchDays;  