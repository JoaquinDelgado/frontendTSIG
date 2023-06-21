import { esDepartamento, esLocalidad } from "./departamentosLocalidades.js";

export const getFCNormalizada = (fc) => {
  return fc.replaceAll(",", " ");
};

export const getHttpQueryParams = (fc, input) => {

  const makeQueryParams = new Map([
    ["1", makeQueryParamsFC1],
    ["2", makeQueryParamsFC2],
    ["3", makeQueryParamsFC3],
    ["4", makeQueryParamsFC4],
    ["5", makeQueryParamsFC5],
    ["6", makeQueryParamsFC6],
    ["7", makeQueryParamsFC7],
  ]);

  if ( !makeQueryParams.has( fc ) ){
    throw new Error('No se encontro la FC ' + fc);
  }

  //Obtengo la funcion a ejecutar segun la fc
  const functionToRun = makeQueryParams.get(fc);

  //TRABAJAR CON EL INPUT DEL USUARIO
  let queryParams = functionToRun( input );

  return queryParams;
};

//Los parametros del backend son 
// calle
// numero
// localidad
// departamento
// calle2
// manzana
// solar
// nombreInmueble
// numeroRuta
// kilometro
// latitud
// longitud
const makeHttpQueryParams = ( direccion ) => {
  let queryParams = '';
  let separador = '';
  for (const key in direccion) {
    queryParams += separador + key + "=" + direccion[key];

    separador = '&';
  }

  return queryParams;
}

const makeQueryParamsFC1 = ( input ) => {
  //FIXME: COmpletar con el parseo restante
  let splitInput = input.split(" ");

  //Controlo errores
  //Solo ingreso un nro o una calle o escribio todo pegado sin espacios
  if ( splitInput.length <= 1 ){ 
    throw new Error( 'Formato de dirección incorrecto' );
  }

  //Busco primero el nro
  const indexNro = splitInput.length - 1;
  const nro = splitInput[ indexNro ];
  //El resto es la calle
  splitInput.splice(indexNro, 1); //elimino el nro del array
  const calle = splitInput.join(" "); //vuelvo a formar la calle

  //Ahora que tengo los parametros construyo el httpQueryParams
  const httpQueryParams = makeHttpQueryParams( {"calle": calle, "numero": nro} );
  
  return httpQueryParams;
};

const makeQueryParamsFC2 = ( input ) => {
  console.log('soy la FC 2');
};

const makeQueryParamsFC3 = ( input ) => {
  console.log('soy la FC 3');
};

const makeQueryParamsFC4 = ( input ) => {
  console.log('soy la FC 4');
};

const makeQueryParamsFC5 = ( input ) => {
  console.log('soy la FC 5');
  let splitInput = input.split(" ");

  //Controlo errores
  //Solo ingreso un km o una ruta o escribio todo pegado sin espacios
  if ( splitInput.length <= 1 ){ 
    throw new Error( 'Formato de dirección incorrecto' );
  }

  var numeroRuta = null;
  var kilometro = null;

  // Eliminar caracteres especiales y convertir a minúsculas para simplificar el análisis
  var direccionNormalizada = input.toLowerCase().replace(/[áéíóú]/g, function(match) {
    return 'aeiou'['áéíóú'.indexOf(match)];
  });

  // Expresión regular para buscar el número de ruta y el kilómetro
  var regex = /ruta\s*(\d+)\s*(km|kilometro)\s*(\d+)/;
  var matches = direccionNormalizada.match(regex);

  if (matches && matches.length >= 4) {
    numeroRuta = matches[1];
    kilometro = matches[3];
  }

  //Ahora que tengo los parametros construyo el httpQueryParams
  const httpQueryParams = makeHttpQueryParams( {"numeroRuta": numeroRuta, "kilometro": kilometro} );
  
  return httpQueryParams;
};

const makeQueryParamsFC6 = ( input ) => {
  let splitInput = input.split(" ");

  //Controlo errores
  //Solo ingreso un nro o una calle o escribio todo pegado sin espacios
  if ( splitInput.length <= 1 ){ 
    throw new Error( 'Formato de dirección incorrecto' );
  }

  //Busco primero el nro
  const indexNro = splitInput.length - 1;
  const nro = splitInput[ indexNro ];
  //El resto es la calle
  splitInput.splice(indexNro, 1); //elimino el nro del array
  const calle = splitInput.join(" "); //vuelvo a formar la calle

  //Ahora que tengo los parametros construyo el httpQueryParams
  const httpQueryParams = makeHttpQueryParams( {"calle": calle, "numero": nro} );
  
  return httpQueryParams;
};

const makeQueryParamsFC7 = ( input ) => {
  let splitInput = input.split(" ");

  //Controlo errores
  if ( splitInput.length != 2 ){ 
    throw new Error( 'Formato latitud longitud incorrecto' );
  }

  //Busco primero el nro
  const lat = splitInput[ splitInput.length - 2 ];
  const lon = splitInput[ splitInput.length - 1 ];
  
  //Ahora que tengo los parametros construyo el httpQueryParams
  const httpQueryParams = makeHttpQueryParams( {"latitud": lat, "longitud": lon} );
  
  return httpQueryParams;
};