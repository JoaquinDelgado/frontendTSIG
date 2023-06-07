const backend = 'http://localhost:8080/api';

export const getDataGeocoder = ( dir ) => {
    
    const url  = backend + '/busquedaDireccionEstructurada/ ' + dir;
    const data = fetch( url )
        .then( response => response.json() )
        .then( response => {
            return response;
        } );
    return data;  
    
}

export const getPuntosSugeridos = ( input ) => {
    const data = ['Fernandez crespo', 'Freire 129', 'Jose B. Freire 129'];

    const url  = backend + '/sugerenciaCalleCompleta/' + input;
    // const data = fetch( url )
    //     .then( response => response.json() )
    //     .then( response => {
    //         return response;
    //     } );
    
    return data;  

}