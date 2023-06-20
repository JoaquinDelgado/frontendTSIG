import * as markersColor from "./leaflet-color-markers.js";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const getMarkerColor = () => {
    const colors = [ 
        "blueIcon",
        "goldIcon",
        "redIcon",
        "greenIcon",
        "orangeIcon",
        "yellowIcon",
        "violetIcon",
        "greyIcon",
        "blackIcon"
    ];
    
    let id = getRandomIntInclusive( 1, 8 );

    return markersColor[ colors[id - 1] ];
}

const dibujarMarker = ( { latitud, longitud, nombreNormalizado, geocoder }, mapa, markers ) => {
    //obtener un marcador de un color
    const color = getMarkerColor();

    let textoPopup = geocoder + ': ' + nombreNormalizado + '<br>';
    textoPopup += 'Latitud: ' + latitud + ' <br> ';
    textoPopup += 'Longitud: ' + latitud;

    L.marker([latitud, longitud], { icon: color }).addTo(markers).bindPopup(textoPopup, {autoClose:false}).openPopup();

    // Añadir los marcadores al mapa
    markers.addTo(mapa);
}

export const dibujarMarkers = ( puntos, mapa, markers ) => {
    puntos.forEach( punto => {
        dibujarMarker( punto, mapa, markers );
    });
}