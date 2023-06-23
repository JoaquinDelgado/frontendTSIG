import { getFCNormalizada } from "./funciones.js";
import { getGeoCoders } from "./apiGeocoder.js";

const dibujoGeocoders = (fc, geocoders) => {
    const comboGeocoders = document.getElementById("comboGeocoders");
    // Limpiar opciones anteriores del comboGeocoders
    comboGeocoders.innerHTML = '<option value="0">Seleccione un geocodificador</option>';

    for (const keyGeo in geocoders[fc]) {
        const option = document.createElement('option');
        option.value = keyGeo;
        option.text = geocoders[fc][keyGeo];
        comboGeocoders.appendChild(option);
    }
};

export const setInfoConfigAvanzada = ( fc, geocodersTexto ) => {
    const infoConfigAvanzada = document.getElementById("infoConfigAvanzada");
    
    infoConfigAvanzada.innerHTML = "FC: " + getFCNormalizada(fc) + " <br> Geocoders: " + geocodersTexto;
};

export const inicializarConfiguracionAvanzada = async( formasCanonicas ) => {

    //Obtengo componentes Modal configuracion avanzada
    const btnModalGuardar = document.getElementById('btnModalGuardar');
    const btnModalClose = document.getElementById('btnModalClose');
    const comboFC = document.getElementById("comboFormasCanonicas");
    const comboGeocoders = document.getElementById("comboGeocoders");    

    const keysFC = Object.keys(formasCanonicas);

    //Obtengo los Geocoders existentes (1 vez sola)
    let geocoders = {};
    //Armo un Objeto que tenga todos los geocorders agrupados por FC
    keysFC.forEach(async (key) => {
        const geocodersFC = await getGeoCoders(key);
        geocoders[key] = geocodersFC;
    });

    //Dibujo en el modal de config avanzada las FC y Geocoders por default (1 sola vez)
    keysFC.forEach((key) => {
        const option = document.createElement('option');

        option.value = key;
        option.text = key + ". " + getFCNormalizada(formasCanonicas[key]);
        //Selecciono la FC por default
        if (key === "6") {
            option.selected = true;
        }

        comboFC.appendChild(option);
    });
    setInfoConfigAvanzada( formasCanonicas[6], "Todos" );
    
    btnModalGuardar.onclick = () => {
        let geocodersTexto = comboGeocoders.options[comboGeocoders.selectedIndex].text;

        if (comboGeocoders.selectedIndex === 0) {
            geocodersTexto = "Todos";
        }

        setInfoConfigAvanzada( formasCanonicas[comboFC.value], geocodersTexto );

        btnModalClose.click();
    }

    // Evento change para el comboFormasCanonicas
    comboFC.addEventListener("change", async function () {
        const formaCanonica = this.value;
        if (formaCanonica !== "") {
            dibujoGeocoders(formaCanonica, geocoders);
        }
    });

}