import React from 'react'

const CreateListButton = ({className, currentList, setLists, setCurrentList}) => {
    const handleClick = async()=>{
        if(currentList?.toDos.some(({checked})=> !checked)) {
           return window.confirm("No puede iniciar una cuenta nueva si no ha terminado los de la anterior");
        };
        let newList= {
            date: '19-Mar-2021',
            toDos: [],
            finishedList: false
        };
        try {
            let response = await fetch(`/api/v1/pendientes`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({list: newList})
            });
            let {data} = await response.json();
            if(data._id){
                setLists(prevLists => {
                    let newLists = prevLists.slice();
                    newLists.push(data);
                    return newLists;
                });
                setCurrentList(data);
            }else{
                throw new Error();
            }
        } catch (error) {
            return alert("La cuenta no pudo ser creada. Inténtelo de nuevo.");  
        };
    };
    return (
        <button className={className} onClick={handleClick}>
            Crear Lista
        </button>
    );
};

export default CreateListButton;