import { departamentoLocalidades } from "./departamentosLocalidades.js";

export const getFCNormalizada = (fc) => {
  return fc.replaceAll(",", " ");
};

export const getHttpQueryParams = (fc, input) => {
  let splitInput = input.split(" ");

  //Controlo errores
  //Solo ingreso un km o una ruta o escribio todo pegado sin espacios
  if (splitInput.length <= 1) {
    throw new Error('Formato de dirección incorrecto');
  }

  const makeQueryParams = new Map([
    ["1", makeQueryParamsFC1],
    ["2", makeQueryParamsFC2],
    ["3", makeQueryParamsFC3],
    ["4", makeQueryParamsFC4],
    ["5", makeQueryParamsFC5],
    ["6", makeQueryParamsFC6],
    ["7", makeQueryParamsFC7],
  ]);

  if (!makeQueryParams.has(fc)) {
    throw new Error('No se encontro la FC ' + fc);
  }

  //Obtengo la funcion a ejecutar segun la fc
  const functionToRun = makeQueryParams.get(fc);

  //TRABAJAR CON EL INPUT DEL USUARIO
  let queryParams = functionToRun(input);

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
const makeHttpQueryParams = (direccion) => {
  let queryParams = '';
  let separador = '';
  for (const key in direccion) {
    queryParams += separador + key + "=" + direccion[key];

    separador = '&';
  }

  return queryParams;
}

const makeQueryParamsFC1 = (input) => {
  return makeQueryParamsFC6(input);
};

const makeQueryParamsFC2 = (input) => {
  return makeQueryParamsFC6(input);
};

const makeQueryParamsFC3 = (input) => {
  console.log('soy la FC 3');
};

const makeQueryParamsFC4 = (input) => {
  console.log('soy la FC 4');
};

const makeQueryParamsFC5 = (input) => {
  var numeroRuta = null;
  var kilometro = null;

  // Eliminar caracteres especiales y convertir a minúsculas para simplificar el análisis
  var direccionNormalizada = input.toLowerCase().replace(/[áéíóú]/g, function (match) {
    return 'aeiou'['áéíóú'.indexOf(match)];
  });

  // Expresión regular para buscar el número de ruta y el kilómetro
  // var regex = /ruta\s*(\d+)\s*(km|kilometro)\s*(\d+)/;
  // var regex = /^(?:Avenida|Av|Av\.)?([a-zA-Z0-9]+)\s*(\d+(?:\.\d+)?)$/;
  var regex = /^(?:Avenida|Av|Av\.)?([a-zA-Z0-9]+)\s*(\d+(?:\.\d+)?)(?:\D|$)/;
  var matches = direccionNormalizada.match(regex);

  if (matches && matches.length >= 3) {
    numeroRuta = matches[1];
    kilometro = matches[2];
  }

  if (numeroRuta == null) {
    throw new Error('Número de ruta incorrecto');
  }

  if (kilometro == null) {
    throw new Error('Número de kilometro incorrecto');
  }

  //Ahora que tengo los parametros construyo el httpQueryParams
  const httpQueryParams = makeHttpQueryParams({ "numeroRuta": numeroRuta, "kilometro": kilometro });

  return httpQueryParams;
};

const makeQueryParamsFC6 = (input) => {
  //En el parametro 3 viene el nro, en el 2 uno o N espacios y en el 1 viene cualquier cosa
  var regex = /(.+)\s+(\d+)$/;
  var matches = input.match(regex);

  let calleOk = false;
  let nroOk = false;

  let calle = '';
  let nro = '';
  if (matches && matches.length >= 3) {
    calle = matches[1];
    nro = matches[2];

    calleOk = (calle.length > 3);
    nroOk = (nro.length > 0);
  }

  if (!calleOk || !nroOk) {
    throw new Error('Formato de dirección incorrecto');
  }

  //Ahora que tengo los parametros construyo el httpQueryParams
  const httpQueryParams = makeHttpQueryParams({ "calle": calle, "numero": nro });

  return httpQueryParams;
};

const makeQueryParamsFC7 = (input) => {
  let splitInput = input.split(" ");

  //Controlo errores
  if (splitInput.length != 2) {
    throw new Error('Formato latitud longitud incorrecto');
  }

  //Busco primero el nro
  const lat = splitInput[splitInput.length - 2];
  const lon = splitInput[splitInput.length - 1];

  //Ahora que tengo los parametros construyo el httpQueryParams
  const httpQueryParams = makeHttpQueryParams({ "latitud": lat, "longitud": lon });

  return httpQueryParams;
};