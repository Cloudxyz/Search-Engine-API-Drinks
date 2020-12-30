import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        ingrediente: '',
        categoria: ''
    });
    const [consultar, guardarConsultar] = useState(false);
    
    useEffect(() => {
        if(consultar){
            const {ingrediente, categoria} = busqueda;
            const consultarApi = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
    
                const resultado = await axios.get(url);
    
                guardarRecetas(resultado.data.drinks);
                
            }
            consultarApi();
        }
    }, [busqueda, consultar])

    return(
        <RecetasContext.Provider value={{ recetas, buscarRecetas, guardarConsultar }}>
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;