import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import Formulario from './componentes/Formulario';
import Informacion from './componentes/Informacion';
import Cancion from './componentes/Cancion';

function App() {

  const [artista, agregarArtista] = useState('');
  const [letra, agregarLetra] = useState([]);
  const [info, agregarInfo] = useState({});

  // Método para consultar API de Letras de Canciones
  const consultarApiLetras = async (busqueda) => {
      // console.log(busqueda);
      const {artista, cancion} = busqueda;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      // CONSULTAR API
      const resultado = await axios(url);

      // ALMACENAR EL ARTISTA QUE SE BUSCÓ
      agregarArtista(artista);
      
      // AGREGAR LA LETRA AL STATE CORRESPONDIENTE
      agregarLetra(resultado.data.lyrics);
  }

  // Método para consultar la API de información de Música
  const consultarInfoMusica = async () => {
    if (artista) {
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const resultado = await axios(url);

      agregarInfo(resultado.data.artists[0]);
      // console.log(info);
    }
  }

  useEffect(
    () => {
      consultarInfoMusica();
    }, [artista]
  )

  return (
    <Fragment>
        <Formulario consultarApiLetras={consultarApiLetras} />

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Informacion info={info} />
            </div>
            <div className="col-md-6">
              <Cancion letra={letra} />
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
