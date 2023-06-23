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

    let id = getRandomIntInclusive(1, 8);

    return markersColor[colors[id - 1]];
}

const dibujarMarker = ({ latitud, longitud, nombreNormalizado, geocoder }, color, markers) => {
    let textoPopup = geocoder + '<br>';
    textoPopup += 'Latitud: ' + latitud + '<br>';
    textoPopup += 'Longitud: ' + longitud;
     
    var marker = L.marker([latitud, longitud], { icon: color }).bindPopup(textoPopup, { autoClose: false, autoPan: false });

    markers.addLayer(marker);
}

export const dibujarMarkers = (puntos, mapa, markers) => {
    //Agrego los marcadores
    puntos.forEach(punto => {
        //obtener un marcador de un color
        const color = getMarkerColor();

        dibujarMarker(punto, color, markers);
    });

    //Agrego los marcadores al mapa
    mapa.addLayer(markers);
}

export const getMapa = (callbackDrawMarker, callbackDrawRectangle) => {
    //dibujo el mapa e inicializo variables que seran utiles luego
    let mapa = L.map('mapa');
    //Se muestra Fing por default
    mapa.setView([-34.86124493950026, -56.198828092136374], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?', {}).addTo(mapa);

    // let markers = new L.FeatureGroup().addTo(mapa);
    // Crear el grupo de agrupamiento
    let markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderLegPolylineOptions: { weight: 3.5, color: '#000' },
        spiderfyDistanceMultiplier: 3.5,
    });

    markers.on('clusterclick', function (e) {
        let popupsContent = '';

        e.layer.getAllChildMarkers().forEach(function (marker) {
            popupsContent += marker.getPopup().getContent() + '<br><br>';
        });

        const popup = L.popup()
            .setLatLng(e.latlng)
            .setContent(popupsContent)
            .openOn(mapa);
    });

    var drawControl = new L.Control.Draw({
        draw: {
            marker: true,  // Desactivar dibujo de marcadores
            circlemarker: false,  // Desactivar dibujo de marcadores
            polyline: false,
            polygon: false,
            circle: false,   // Activar dibujo de círculos
            rectangle: true // Activar dibujo de rectángulos
        },

        edit: false // Desactivar edición de formas dibujadas
    });
    mapa.addControl(drawControl);

    mapa.on(L.Draw.Event.CREATED, function (event) {
        markers.clearLayers();

        var layer = event.layer;
        markers.addLayer(layer);

        if (layer instanceof L.Rectangle) {
            const bounds = layer.getBounds();
            const rectangleVertices = {
                "northwest": bounds.getNorthWest(), // Vértice superior izquierdo
                "northeast": bounds.getNorthEast(), // Vértice superior derecho
                "souteast": bounds.getSouthEast(), // Vértice inferior derecho
                "soutwest": bounds.getSouthWest()  // Vértice inferior izquierdo
            };
            callbackDrawRectangle(rectangleVertices);
        }

        if (layer instanceof L.Marker) {
            const punto = layer.getLatLng();

            callbackDrawMarker(punto);
        }

    });

    return { "mapa": mapa, "markers": markers };
}