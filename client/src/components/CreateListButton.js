import React from 'react'

const CreateListButton = ({className, currentList, setLists, setCurrentList}) => {
    const handleClick = ()=>{
        let persistentToDos = [];
        if(currentList.toDos.some(({checked})=> !checked)) {
            if(window.confirm("Desea conservar los pendientes que no ha hecho para la lista nueva?. Si pulsa cancelar iniciará una lista en blanco")){
                currentList.toDos.forEach((toDo)=>{
                    if(!toDo.checked) persistentToDos.push(toDo);
                });
            };
        };
        let newList= {
            date: '19-Mar-2021',
            toDos: persistentToDos,
            finishedList: false
        };
        setLists(prevLists=>{
            let newLists = prevLists.slice();
            newLists.push(newList)
            return newLists;
        });
        setCurrentList(newList);
    };
    return (
        <button className={className} onClick={handleClick}>
            Crear Lista
        </button>
    );
};

export default CreateListButton;