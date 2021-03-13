import React, { useState } from 'react'

const EditBill = ({ match }) => {
    const [billID, setBillID] = useState(match.params.id);
    return (
        <main className="container pt-3">
            <div className="row">
                <h1 className="mx-auto">
                    {(billID === 'nueva' ? 'Crear' : 'Editar') + ' Cuenta'}
                </h1>
            </div>
            <div className="row mt-5">
                <h2 className="mx-auto">Menú</h2>
                
            </div>
        </main>
    );
};

export default EditBill;