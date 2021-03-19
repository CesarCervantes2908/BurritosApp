import { useState } from "react";

const useCreateNewDay = (date) => {
    const [newDayLink, setNewDayLink] = useState('');
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [errorButton, setErrorButton] = useState('');
    const createNewDay = async () => {
        setIsLoadingButton(true);
        try {
            let response = await fetch(`/api/v1/bussiness/days/${date}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let { data } = await response.json();
            if (data) {
                setIsLoadingButton(false);
                setNewDayLink(`/ventas/days/${date}`);
            } else {
                throw new Error();
            };
        } catch (error) {
            setIsLoadingButton(false);
            setErrorButton("Lo sentimos, el día de ventas NO pudo ser creado.");
            let timeout = setTimeout(() => {
                setErrorButton('');
                clearTimeout(timeout);
            }, 3000);
            console.log(error);
        }
    };
    return [createNewDay, newDayLink, isLoadingButton, errorButton];
};

export default useCreateNewDay;