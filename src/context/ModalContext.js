import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    const [idReceta, guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({});
    const [cargando, guardarCargando] = useState(false);

    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idReceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

            const resultado = await axios.get(url);

            guardarCargando(true);

            setTimeout(() => {
                guardarReceta(resultado.data.drinks[0]);
                guardarCargando(false);
            }, 1000);
        }
        obtenerReceta();
    }, [idReceta])

    return(
        <ModalContext.Provider value={{informacion, guardarIdReceta, guardarReceta, cargando}}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;