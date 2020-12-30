import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const {categorias} = useContext(CategoriasContext);
    const {buscarRecetas, guardarConsultar} = useContext(RecetasContext);

    const [busqueda, guardarBusqueda] = useState({
        ingrediente: '',
        categoria: ''
    })

    const actualizarState = (e) => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    return(
        <form className="col-12" onSubmit={e => {
            e.preventDefault();
            buscarRecetas(busqueda);
            guardarConsultar(true);
        }}>
            <fieldset className="text-center">
                <legend>Buscar bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Buscar por Ingredientes" onChange={actualizarState}/>
                </div>
                <div className="col-md-4">
                    <select name="categoria" className="form-control" onChange={actualizarState}>
                        <option value="">-- Selecciona Categoría --</option>
                        {
                            categorias.map((categoria) => (
                                <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <input type="submit" className="btn btn-block btn-primary" value="Buscar Bebidas"/>
                </div>
            </div>
        </form>
    );
}

export default Formulario;