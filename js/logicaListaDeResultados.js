import { dibujarMarkers } from "./logicaMapa.js";

export const dibujarListaDeResultados = (elementos, mapa, markers) => {
    const listaDeResultados = document.getElementById('listaDeResultados');
    listaDeResultados.innerHTML = '';
    listaDeResultados.classList.remove("overflow-y-scroll");
    
    if (!elementos) {
        console.log('No vinieron resultados');
    } else {
        listaDeResultados.classList.add("overflow-y-scroll"); //para poder hacer scroll en la lista de resultados

        let todosLosPuntos = [];
        elementos.forEach(elem => {

            let puntos = [];
            elem.geoCoders.forEach(geocoder => {

                geocoder = geocoder.toLowerCase();
                elem[geocoder].nombreNormalizado = elem.nombreNormalizado;
                elem[geocoder].departamento = elem.departamento;
                elem[geocoder].geocoder = geocoder;
                
                puntos.push(elem[geocoder]);
            });

            //Cargo los puntos para mostrarlos en el mapa todos juntos
            todosLosPuntos.push(...puntos);

            //Armo una lista de resultados por si quiere ver un punto en particular
            const puntoBtn = document.createElement('button');
            
            puntoBtn.className = "geometry list-group-item list-group-item-action";
            puntoBtn.innerHTML += '<p class="m-0 mb-1 p-0" style="font-size: 0.9rem;">' + elem.nombreNormalizado + '</p>';

            puntoBtn.addEventListener('click', () => {
                //Borrar marcadores anteriores
                markers.clearLayers();

                let textoPopup = '<b>'+nombreNormalizado + '</b><br>';
                textoPopup += 'Geocoder: ' + geocoder + '<br>';
                textoPopup += 'Latitud: ' + latitud + '<br>';
                textoPopup += 'Longitud: ' + longitud;

                let marker = L.marker([latitud, longitud], { icon: color }).bindPopup(textoPopup, { autoClose: false, autoPan: false });
                marker.on('mouseover', function (e) {
                    this.openPopup();
                });

                marker.on('mouseout', function (e) {
                    this.closePopup();
                });

                markers.addLayer(marker);
    
                dibujarMarkers(puntos, mapa, markers);
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
        
        //Dibujo todos los puntos que obtuve del resultado
        //Borrar marcadores anteriores
        markers.clearLayers();
        dibujarMarkers(todosLosPuntos, mapa, markers);
    }

}