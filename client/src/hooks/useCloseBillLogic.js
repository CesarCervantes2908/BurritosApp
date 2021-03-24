import { useEffect, useState } from "react";
import useQuery from "./useQuery";


const useCloseBillLogic = (bills) => {
    let query = useQuery().get("closed");
    const [billToClose, setBillToClose] = useState(null);
    const [pago, setPago] = useState(0);
    const [cambio, setCambio] = useState(0);
    const [isDayClosed, ] = useState(query === 'true');
    useEffect(() => {
        if (billToClose) {
            setCambio(pago - billToClose.billTotal);
        };
    }, [pago, billToClose]);
    const handleCloseClick = async (id) => {
        let billToClose = bills.find(bill => bill._id === id);
        setBillToClose(billToClose);
    };
    const closeBill = async (date, id) => {
        if (cambio < 0) return;
        try {
            let response = await fetch(`/api/v1/ventas/days/${date}/cuentas/${id}/edit/close`, { method: 'PUT' });
            if (response.ok) window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    return [billToClose, pago, cambio, isDayClosed, setPago, handleCloseClick, closeBill];
    
};

export default useCloseBillLogic;