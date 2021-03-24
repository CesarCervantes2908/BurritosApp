import { BussinessContext } from "../store/BussinessProvider";
import { sortDates } from "../utils/helperFunction";

const { useEffect, useState, useContext } = require("react");

const useFetchDays = () => {
    const [sellingDays, setSellingDays] = useState([]);
    const [isSellingDayStarted, setIsSellingDayStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalVentas , setTotalVentas] = useState(0);
    const [date, , ] = useContext(BussinessContext);
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
    }, [sellingDays, date]);
    useEffect(() => {
        if (sellingDays.length > 0) {
            let newTotal = 0;
            sellingDays.forEach(sellingDay => newTotal += sellingDay.totalSold);
            setTotalVentas(newTotal);
        }
    }, [sellingDays]);
    return [sellingDays, isSellingDayStarted, isLoading, error, totalVentas, date];
};

export default useFetchDays;  