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

            //Agrego la Forma reversa
            response["7"] = "latitud, longitud (reverse geocoding)";
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
        });
    return data;

}