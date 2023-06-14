
export const dibujarListaDeResultados = ( elementos, mapa, markers ) => {
    console.log( elementos );
    
    const listaDeResultados = document.getElementById('listaDeResultados');

    const htmlElementos = elementos.map((elem) => {
        let nroPuerta = '';
        if (elem.direccion.numero && elem.direccion.numero.nro_puerta) {
            nroPuerta = elem.direccion.numero.nro_puerta;
        } 
        
        let html = '';
        html = '<button type="button" class="geometry list-group-item list-group-item-action" x="' + elem.puntoX + '" y="' + elem.puntoY + '">';
        html += elem.direccion.calle?.nombre_normalizado + ' ' + nroPuerta + '<br>';
        html += elem.direccion.departamento.nombre_normalizado;
        html += '</button>';

        return html;
    });
    //Muestro los elementos en el html
    listaDeResultados.innerHTML = htmlElementos.join("");
    listaDeResultados.classList.add("overflow-y-scroll");

    //seteo los eventos clicks de cada resultado
    const resultados = document.getElementsByClassName('geometry');

    for (let i = 0; i < resultados.length; i++) {
        let resultado = resultados[i];

        resultado.onclick = () => {
            // Borrar marcadores anteriores
            markers.clearLayers();

            const x = resultado.getAttribute('x');
            const y = resultado.getAttribute('y');

            // Agregar marcador en la ubicación encontrada
            L.marker([y, x]).addTo(markers).bindPopup(resultado.innerHTML).openPopup();

            // Añadir los marcadores al mapa
            markers.addTo(mapa);
        };

    }
}