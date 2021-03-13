import React, { useState } from 'react'
import { parseDate } from '../utils/helperFunction';

const Ventas = () => {
    const [date, setDate] = useState(parseDate());
    const [isSellingDayStarted, setIsSellingDayStarted] = useState(false);
    return (
        <main className="container pt-4">
            {isSellingDayStarted ? null 
                : <button className="btn btn-primary btn-block">
                    Empezar Día de Venta
                  </button>}
        </main>
    );
};

export default Ventas;