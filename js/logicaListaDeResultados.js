import { dibujarMarker } from "./logicaMapa.js";

export const dibujarListaDeResultados = ( elementos, mapa, markers ) => {
    console.log( elementos );
    
    const listaDeResultados = document.getElementById('listaDeResultados');

    const htmlElementos = elementos.map((elem) => {
        let html = '';
        html = '<button type="button" class="geometry list-group-item list-group-item-action" x="' + elem.latitud + '" y="' + elem.longitud + '">';
        html += elem.nombreNormalizado + '<br>';
        html += elem.localidad + ' ' + elem.departamento + '<br>';
        html += 'Geocoders: ' + elem.geoCoder;
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
            const x = resultado.getAttribute('x');
            const y = resultado.getAttribute('y');

            let punto = {
                "latitud": x,
                "longitud": y,
                "textoPopup": resultado.innerHTML,
                "mapa": mapa,
                "markers": markers,
            };

            // Borrar marcadores anteriores
            markers.clearLayers();
            dibujarMarker( punto );
        };

    }
}