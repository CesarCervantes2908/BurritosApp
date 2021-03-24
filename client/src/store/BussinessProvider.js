import { createContext, useEffect, useState } from "react";
import { parseDate } from "../utils/helperFunction";

const BussinessContext = createContext();

const BussinessProvider = ({ children }) => {
    const [date, setDate] = useState('');
    const [bussinessTotal, setBussinessTotal] = useState(0);
    useEffect(()=>{
        setDate(parseDate());
    },[]);
    useEffect(() => {
        //Obtiene el total 
        const fetchBussiness = async () => {
            try {
                let response = await fetch('/api/v1/bussiness');
                let { data } = await response.json();
                if (data._id) {
                    setBussinessTotal(data.totalAmount);
                } else {
                    throw new Error();
                };
            } catch (error) {
                return alert('Hubo un Error. Recarge la página');
            };
        };
        fetchBussiness();
    }, []);
    const handleTotalChange = async(newTotal)=>{
        try {
            let response = await fetch("/api/v1/bussiness/total", {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({newTotal})
            });
            let { data } = await response.json();
            if(data._id){
                setBussinessTotal(data.totalAmount);
            }else{
                throw new Error();
            }
        } catch (error) {
            return alert("No se pudo actualizar.Intente de nuevo");
        }
    };
    return (
        <BussinessContext.Provider value={[date, bussinessTotal, handleTotalChange]}>
            {children}
        </BussinessContext.Provider>
    );
};

export { BussinessContext };
export default BussinessProvider;