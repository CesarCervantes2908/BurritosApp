const CreateGastosButton = ({className, currentGastos, setGastosLists, setCurrentGastos}) => {
    const handleClick = ()=>{
        if(!currentGastos?.finished) return alert('No puede iniciar una lista nueva hasta que complete la anterior');
        let newGastos = {
            date: '22-3-2021',
            products: [],
            finished: false,
            gastosTotal: 0
        };
        setGastosLists(prevGastosLists =>{
            let newList = prevGastosLists.slice();
            newList.push(newGastos);
            return newList; 
        });
        setCurrentGastos(newGastos);
    };

    return (
        <button className={className} onClick={handleClick}>
            Crear Lista
        </button>
    );
};

export default CreateGastosButton;