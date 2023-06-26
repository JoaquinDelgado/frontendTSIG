const backend = 'http://localhost:8080/api';

export const getDataGeocoder = (dir) => {

    const url = backend + '/busquedaDireccionEstructurada/ ' + dir;
    const data = fetch(url)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(error => { console.log(error.message) });

    return data;
}

export const getGeoCoders = (idFormaCanonica) => {
    const url = backend + '/obtenerGeoCoders?idFormaCanonica=' + idFormaCanonica;
    const data = fetch(url)
        .then(response => response.json())
        .then(response => {
            return response;
        });

    return data;
}

export const getPuntosSugeridos = (input) => {
    const url = backend + '/sugerenciaCalleCompleta?todos=true&entrada=' + input;
    const data = fetch( url )
        .then( response => response.json() )
        .then( response => {
            return response;
        } );

    return data;
}

export const getFCGeoCoders = () => {
    const url = backend + '/formasCanonicas';
    const data = fetch(url)
        .then(response => response.json())
        .then(response => {

            //Agrego la  Forma reversa
            response["7"] = "latitud, longitud (reverse geocoding)";
            return response;
        })
        .catch( ( error ) => {
            //Si falla la conexion con el backend seteamos los geocoders nosotros
            console.log( 'No se pudo conectar con el backend. Error: ' + error);
            
            const response = {
                "1": "calle,numero,localidad,departamento",
                "2": "calle,numero,calle2,localidad,departamento",
                "3": "calle,manzana,solar,localidad,departamento",
                "4": "nombreInmueble,departamento",
                "5": "numeroRuta,kilometro",
                "6": "calle,numero",
                "7": "latitud, longitud (reverse geocoding)"
            }
                        
            return response;
        });

    return data;
}

export const getDireccionEstructurada = (idGeoCoder, idFormaCanonica, paramBuscar) => {
    const url = backend + '/busquedaDireccionEstructurada/' + idGeoCoder + '/' + idFormaCanonica + '?' + paramBuscar;
    //const url = backend + '/busquedaDireccionEstructurada/1/1?' + paramBuscar;
    const data = fetch(url)
        .then(response => response.json())
        .then(response => {
            return response;
        });
    return data;

}

export const getReverseGeocoding = ( paramBuscar) => {
    const url = backend + '/reverse?' + paramBuscar;

    const data = fetch(url)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch( (err) => {
            console.log('Error en reverse geocoding. ERROR:' + err);
        });

    return data;

}

export const getDirEnPoligo = ( poligono ) => {
    
    const url = backend + '/direcEnPoligono';
    const dataSend = {
        "poligono": poligono
    };

    const data = fetch(url, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {"Content-Type": "application/json"},
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch( (err) => {
            console.log('Error al obtener el poligono. ERROR:' + err);
        });

    return data;

}

export const getDataAnalisis = () => {
    const url = backend + '/obtenerDatosDeEstudio';

    const data = fetch(url)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch( (err) => {
            console.log('Error en obtener datos de estudio. ERROR:' + err);
        });

    return data;
}