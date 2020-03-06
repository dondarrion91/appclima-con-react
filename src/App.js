import React,{Fragment,useState,useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';



function App() {

  //States
  const [busqueda,guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setconsultar] = useState(false);
  const [resultado, setresultado] = useState({

  });
  const [error, seterror] = useState(false);


  const {ciudad,pais} = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {

      if(consultar){
        const appId = "0178e3195430177af7034e2d08ed1e69";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        setresultado(resultado);
        setconsultar(false);
      }

      if(resultado.cod == "404"){
        seterror(true);
      }else{
        seterror(false);
      }
    
      
    }
    consultarAPI();

    // eslint-disable-next-line
  },[consultar]);


  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  }else{
    componente = <Clima 
                    resultado={resultado} 

                  />
  }


  return (
    <Fragment>
      <Header
        titulo="Clima React App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                consultar={consultar}
                setconsultar={setconsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
