import { getPuntosSugeridos } from "./apiGeocoder.js";

export const inicializarEventosPuntosSugeridos = () => {
    const input = document.getElementById('address');
    const DomListaPuntosSugeridos = document.getElementById('listaPuntosSugereridos');
        
    input.addEventListener('input', async function () {
        const inputValue = this.value.toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength > 3) {
            const puntosSugeridos = await getPuntosSugeridos( inputValue );

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

    console.log(puntos);
    const htmlPuntosSugeridos = puntos.map( (punto) => {
        let html = '';
        html += '<li class="geometry list-group-item d-block">';
        html += punto.calle + '<br>';
        html += punto.departamento + ' ' + punto.localidad;
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