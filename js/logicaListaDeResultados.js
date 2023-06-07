
export const dibujarListaDeResultados = ( elementos, mapa ) => {
    console.log( elementos );
    
    const listaDeResultados = document.getElementById('listaDeResultados');

    const htmlElementos = elementos.map((elem) => {
        let html = '';
        html = '<button type="button" class="geometry list-group-item list-group-item-action" x="' + elem.puntoX + '" y="' + elem.puntoY + '">';
        html += elem.direccion.calle.nombre_normalizado + ' ' + elem.direccion.numero?.nro_puerta + '<br>';
        html += elem.direccion.departamento.nombre_normalizado;
        html += '</button>';

        return html;
    });
    //Muestro los elementos en el html
    listaDeResultados.innerHTML = htmlElementos.join("");
    //seteo los eventos clicks de cada resultado
    const resultados = document.getElementsByClassName('geometry');

    for (let i = 0; i < resultados.length; i++) {
        let resultado = resultados[i];

        resultado.onclick = () => {
            const x = resultado.getAttribute('x');
            const y = resultado.getAttribute('y');

            mapa.setView([y, x], 11);
            let marcador = L.marker([y, x]).addTo(mapa);

            marcador.bindPopup(resultado.innerHTML);
        };

    }
}