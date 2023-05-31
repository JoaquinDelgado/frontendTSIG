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