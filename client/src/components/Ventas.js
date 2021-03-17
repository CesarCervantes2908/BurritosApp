import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { parseDate } from '../utils/helperFunction';

const Ventas = () => {
    const [date, setDate] = useState('');
    const [isSellingDayStarted, setIsSellingDayStarted] = useState(false);
    const [sellingDays, setSellingDays] = useState([]);
    const [newDayLink, setNewDayLink] = useState('');
    useEffect(()=>{
        console.log("Efecto!");
        const fetchDays = async()=>{
            try {
                let response = await fetch(`/api/v1/bussiness/days`);
                let {data} = await response.json();
                console.log(data);
                setSellingDays(data);
            } catch (error) {
                console.log();
            };
        };
        fetchDays();
    },[]);
    useEffect(()=>{
        if(sellingDays.some(sellingDay=> sellingDay.date === date))setIsSellingDayStarted(true);
    }, [sellingDays]);
    useEffect(()=>{
        let todayDate = parseDate();
        setDate(todayDate);
    }, []);
    const createNewDay = async()=>{
        try {
            let response = await fetch(`/api/v1/bussiness/days/${date}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let { data } = await response.json();
            if(data){
                
            };
        } catch (error) {
            console.log(error);
        }
    };
    return (       
        <main main className = "container pt-4" >
            <div className="row"><h1 className="mx-auto">Ventas</h1></div>
            {!isSellingDayStarted &&
            <div className="row mt-3">
                <button className="btn btn-primary btn-block" onClick={createNewDay}>
                    Empezar Día de Venta
                            </button>
            </div>
            }
            <div className="row mt-5"><h3>Días de Venta</h3></div>
            <div className="row mt-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellingDays.map(({date, totalSold})=>(
                            <tr className="table-active" key={date}>
                                <th scope="row">
                                    <Link to={`/ventas/days/${date}`}>{date}</Link>
                                </th>
                                <td>${totalSold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Ventas;