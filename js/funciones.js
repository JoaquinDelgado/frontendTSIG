import { esDepartamento, esLocalidad } from "./departamentosLocalidades.js";

export const getFCNormalizada = (fc) => {
  return fc.replaceAll(",", ", ");
};

export const getHttpQueryParams = (fc, input) => {

  const makeQueryParams = new Map([
    ["1", makeQueryParamsFC1],
    ["2", makeQueryParamsFC2],
    ["3", makeQueryParamsFC3],
    ["4", makeQueryParamsFC4],
    ["5", makeQueryParamsFC5],
    ["6", makeQueryParamsFC6],
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
  console.log('soy la FC 1');
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