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

export const getGeoCoders = () => {
    const url  = backend + '/obtenerGeoCoders';
    const data = fetch( url )
        .then( response => response.json() )
        .then( response => {
            
            console.log("otro",response)
            return response;

        } );
    return data;
}

export const getFCGeoCoders = ( idGeoCoder ) => {
    const url  = backend + '/'+idGeoCoder+'/formasCanonicas';
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