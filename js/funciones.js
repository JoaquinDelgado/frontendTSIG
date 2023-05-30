//Devuelve las relaciones 1 FC --> N Geocoders
import {getGeoCoders} from "./apiGeocoder.js";
import {getFCGeoCoders} from "./apiGeocoder.js";

const fcMap = new Map();

const geocodersJson = await getGeoCoders();
console.log(geocodersJson)
const listIdGeocoder = Object.keys(geocodersJson)

for (let i in listIdGeocoder ) {
  const idGeocoder = listIdGeocoder[i];
  const fcDelGeocoder = await getFCGeoCoders(1)
  console.log(fcDelGeocoder) 
  fcMap.set(idGeocoder, fcDelGeocoder);
}
   
console.log(fcMap);
        
        
                    /////////////////////////////
/*
// Agregar elementos a la lista en el Map
fcMap.set("clave1", ["valor1", "valor2", "valor3"]);
fcMap.set("clave2", ["valor4", "valor5"]);

// Acceder a la lista en el Map
const lista1 = fcMap.get("clave1");
console.log(lista1); // Imprime: ["valor1", "valor2", "valor3"]

// Agregar un elemento a la lista existente
lista1.push("valor4");
console.log(lista1); // Imprime: ["valor1", "valor2", "valor3", "valor4"]

// Iterar sobre la lista en el Map
fcMap.forEach((lista, clave) => {
  console.log(clave + ": " + lista);
  
});
*/