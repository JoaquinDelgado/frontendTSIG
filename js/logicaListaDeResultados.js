import { dibujarMarkers } from "./logicaMapa.js";

export const dibujarListaDeResultados = ( elementos, mapa, markers ) => {
    const listaDeResultados = document.getElementById('listaDeResultados');
    listaDeResultados.innerHTML = '';
    
    elementos.forEach( elem => {
        const puntoBtn = document.createElement('button');

        puntoBtn.className = "geometry list-group-item list-group-item-action";
        puntoBtn.innerHTML += '<p class="m-0 mb-1 p-0" style="font-size: 0.9rem;">' + elem.nombreNormalizado + '</p>';
        
        puntoBtn.addEventListener('click', () => {
            
            let puntos = [];
            elem.geoCoders.forEach( geocoder => {
                elem[geocoder].nombreNormalizado = elem.nombreNormalizado;
                elem[geocoder].departamento = elem.departamento;
                elem[geocoder].geocoder = geocoder;
                
                puntos.push( elem[geocoder] );
            });

            //Borrar marcadores anteriores
            markers.clearLayers();
            dibujarMarkers( puntos, mapa, markers );
            
        });
        //utilizo bootstrap para alinear
        const divCol61 = document.createElement('div');
        divCol61.className = "col-6";
        divCol61.style = "font-size: 0.8rem;";
        divCol61.innerHTML = elem.departamento;
        
        const divCol62 = document.createElement('div');
        divCol62.className = "col-6 text-end";
        divCol62.style = "font-size: 0.8rem;";
        divCol62.innerHTML = 'Geocoders: ' + elem.geoCoders.join(", ");
        
        const divRow = document.createElement('div');
        divRow.className = "row align-items-center";
        divRow.appendChild(divCol61);
        divRow.appendChild(divCol62);
        
        puntoBtn.appendChild(divRow);

        //Agrego el boton a la lista de resultados
        listaDeResultados.appendChild(puntoBtn);
    });

}