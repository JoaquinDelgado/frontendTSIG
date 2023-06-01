const backend = 'http://localhost:8080/api';

export const getDataGeocoder = ( dir ) => {
    
    const url  = backend + '/busquedaDireccion/' + dir;
    const data = fetch( url )
        .then( response => response.json() )
        .then( response => {
            return response;
        } );
    return data;  
    // console.log( resp );

    // return ({
    //     "direccion": {
    //         "departamento": {
    //             "idDepartamento": 1,
    //             "nombre_normalizado": "MONTEVIDEO"
    //         },
    //         "localidad": {
    //             "idLocalidad": 3180,
    //             "nombre_normalizado": "MONTEVIDEO"
    //         },
    //         "calle": {
    //             "idCalle": 8419,
    //             "nombre_normalizado": "JOSE B. FREIRE"
    //         },
    //         "numero": {
    //             "nro_puerta": 129
    //         }
    //     },
    //     "codigoPostal": 11900,
    //     "codigoPostalAmpliado": 11915,
    //     "puntoX": -56.21921410496764,
    //     "puntoY": -34.854495387858634,
    //     "idPunto": 380219,
    //     "srid": 4326,
    //     "idTipoClasificacion": 1,
    //     "error": ""
    // });

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