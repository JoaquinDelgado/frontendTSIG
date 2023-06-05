const backend = 'http://localhost:8080/api';

export const getDataGeocoder = ( dir ) => {
    
    const url  = backend + '/busquedaDireccion/' + dir;
    const data = fetch( url )
        .then( response => response.json() )
        .then( response => {
            return response;
        } )
        .catch( error => { console.log(error.message) } );

    return data;  
}

export const getGeoCoders = (idFormaCanonica) => {
    const url  = backend + '/obtenerGeoCoders?idFormaCanonica='+idFormaCanonica;
    const data = fetch( url )
        .then( response => response.json() )
        .then( response => {
            
            console.log("lista de geocoders",response)
            return response;

        } );
    return data;
}

export const getFCGeoCoders = () => {
    const url  = backend + '/formasCanonicas';
    const data = fetch( url )
        .then( response => response.json() )
        .then( response => {
            return response;
        } );
    return data;
}

export const getDireccionEstructurada = (idGeoCoder, idFormaCanonica) => {
    const url  = backend + '/busquedaDireccionEstructurada/'+idGeoCoder+'/'+idFormaCanonica;
    const data = fetch( url )
        .then( response => response.json() )
        .then( response => {
            return response;
        } );
    return data;
    
}