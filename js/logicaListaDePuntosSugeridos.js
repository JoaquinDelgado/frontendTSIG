import { getPuntosSugeridos } from "./apiGeocoder.js";

export const inicializarEventosPuntosSugeridos = () => {
    const input = document.getElementById('address');
    const DomListaPuntosSugeridos = document.getElementById('listaPuntosSugereridos');
    
    input.addEventListener('input', async function () {
        DomListaPuntosSugeridos.innerHTML = '';
    
        const inputValue = this.value.toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength > 3) {
            const puntosSugeridosWS = await getPuntosSugeridos(inputValue);
            //Achico el conjunto por si ya ingreso el nro de puerta por ejemplo.
            const puntosSugeridos = puntosSugeridosWS.filter( (elem) => { return (elem.calle.length > inputLength) } );
            
            if ( puntosSugeridos && (puntosSugeridos.length > 0) ){
                dibujarListaDePuntosSugeridos(puntosSugeridos);
            }
        } else {
            DomListaPuntosSugeridos.style.display = 'none';
        }
    });

}

export const dibujarListaDePuntosSugeridos = (puntos) => {
    //Obtengo componentes
    const input = document.getElementById('address');
    const btnBuscar = document.getElementById('btnBuscar');
    const DomListaPuntosSugeridos = document.getElementById('listaPuntosSugereridos');
    
    puntos.forEach( ( {calle, departamento, localidad} ) => {
        const punto = document.createElement('li');

        punto.className = "list-group-item d-block";
        punto.setAttribute("calle", calle);
        punto.innerHTML += '<span class="m-0 mb-1 p-0" style="font-size: 0.9rem;">' + calle + '</span>';
        punto.innerHTML += '<p class="m-0 mb-1 p-0" style="font-size: 0.8rem;">' + localidad + ' - '+ departamento + '</p>';
        
        punto.addEventListener('click', () => {
            const calle = punto.getAttribute("calle");
            input.value = calle;

            //escondo la lista de puntos sugeridos
            DomListaPuntosSugeridos.style.display = 'none';
            btnBuscar.click();
        });

        DomListaPuntosSugeridos.appendChild(punto);
    });

    //Muestro los elementos en el html
    DomListaPuntosSugeridos.style.display = 'block';
    DomListaPuntosSugeridos.classList.add("overflow-y-scroll");
}