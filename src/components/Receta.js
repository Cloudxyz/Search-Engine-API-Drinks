import React, {Fragment, useContext, useState} from 'react'

import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    scroll: { maxHeight: '650px', overflowY: 'scroll', overflowX: 'none' },
    root: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '30px',
      paddingBottom: '30px'
    },
}));

const Receta = ({receta}) => {

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const {informacion, guardarIdReceta, guardarReceta, cargando} = useContext(ModalContext);

  const mostrarIngredientes = informacion => {
    let ingredientes = [];
    for(let i = 1; i<16; i++){
      if(informacion[`strIngredient${i}`]){
        ingredientes.push(
          <li key={i}>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>
        )
      }
    }

    return ingredientes;
  }

  return(
    <div className="col-md-4 mb-3">
      <div className="card"></div>
      <h2 className="card-header">{receta.strDrink}</h2>
      {
        (receta.strDrinkThumb)?
        <img className="card-img-top" src={receta.strDrinkThumb} alt={receta.strDrink}/>
        :null
      }
      <div className="card-body">
        <button type="button" className="btn btn-block btn-primary" onClick={() => {
          guardarIdReceta(receta.idDrink);
          handleOpen();
        }}>Ver Receta</button>
        <Modal open={open} onClose={() =>{
          guardarIdReceta(null);
          guardarReceta({});
          handleClose();
        }} closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
          <Fade in={open}>
              <div style={modalStyle} className={`${classes.paper} ${classes.scroll}`}>
              {
                (cargando)
                ?
                  <div className={classes.root}>
                    <CircularProgress />
                  </div>
                :
                <Fragment>
                  <h2>{informacion.strDrink}</h2>
                  {
                    (informacion.strInstructions)?
                    <Fragment>
                      <h3 className="mt-4">Instrucciones</h3>
                      <p>
                        {informacion.strInstructions}
                      </p>
                    </Fragment>
                    :null
                  }
                  {
                    (informacion.strDrinkThumb)?
                    <img className="img-fluid mb-3" src={informacion.strDrinkThumb} alt={informacion.strDrink}/>
                    :null
                  }
                  {
                    (informacion.strIngredient1)?
                    <Fragment>
                      <h3>Ingredientes y cantidades</h3>
                      <ul>
                        {mostrarIngredientes(informacion)}
                      </ul>
                    </Fragment>
                    :null
                  }
                </Fragment>
                }
              </div>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}

export default Receta;