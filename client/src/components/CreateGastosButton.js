const CreateGastosButton = ({className, currentGastos, setGastosLists, setCurrentGastos}) => {
    const handleClick = async()=>{
        if (currentGastos?.products.some(({ checked }) => !checked)) {
            return window.confirm("No puede iniciar una lista nueva si no ha terminado la anterior");
        };
        let newGastos = {
            date: '22-3-2021',
            products: [],
            finished: false,
            gastosTotal: 0
        };
        try {
          let response = await fetch(`/api/v1/gastos`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({list: newGastos})
          });   
          let { data } = await response.json();
          if(data._id){
              setCurrentGastos(data);
              setGastosLists(prevLists=>{
                  let newLists = prevLists.slice();
                  newLists.push(data);
                  return newLists;
              });
          }else{
              throw new Error();
          };
        } catch (error) {
            
        };
    };

    return (
        <button className={className} onClick={handleClick}>
            Crear Lista
        </button>
    );
};

export default CreateGastosButton;