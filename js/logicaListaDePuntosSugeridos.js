import { getPuntosSugeridos } from "./apiGeocoder.js";

export const inicializarEventosPuntosSugeridos = () => {
    const input = document.getElementById('address');
    const DomListaPuntosSugeridos = document.getElementById('listaPuntosSugereridos');
        
    input.addEventListener('input', function () {
        const inputValue = this.value.toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength > 3) {
            const puntosSugeridos = getPuntosSugeridos( inputValue );

            dibujarListaDePuntosSugeridos( puntosSugeridos );
        } else {
            DomListaPuntosSugeridos.style.display = 'none';            
        }
    });

}

export const dibujarListaDePuntosSugeridos = ( puntos ) => {
    //Obtengo componentes
    const input = document.getElementById('address');
    const btnBuscar = document.getElementById('btnBuscar');
    const DomListaPuntosSugeridos = document.getElementById('listaPuntosSugereridos');

    const htmlPuntosSugeridos = puntos.map( (punto) => {
        let html = '';
        // html += '<li class="geometry list-group-item" x="' + punto.puntoX + '" y="' + punto.puntoY + '">';
        // html += punto.direccion.calle.nombre_normalizado + ' ' + punto.direccion.numero?.nro_puerta + '<br>';
        // html += punto.direccion.departamento.nombre_normalizado;
        // html += '</li>';

        html += '<li class="geometrySugest list-group-item d-block">';
        html += punto;
        html += '</li>';

        return html;
    });
    //Muestro los elementos en el html
    DomListaPuntosSugeridos.innerHTML = htmlPuntosSugeridos.join("");
    DomListaPuntosSugeridos.style.display = 'block';

    const DomPuntosSugeridos = Array.from(document.getElementsByClassName('geometrySugest'));
    DomPuntosSugeridos.forEach(function( DomPunto) {

        DomPunto.addEventListener('click', function() {
          input.value = this.textContent;
          DomListaPuntosSugeridos.style.display = 'none';

          btnBuscar.click();
        });

    });
}