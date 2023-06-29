export const departamentoLocalidades = {
    "ARTIGAS": ["ARTIGAS", "BELLA UNIÓN", "TOMÁS GOMENSORO"],
    "CANELONES": ["CANELONES", "SANTA LUCÍA", "LAS PIEDRAS"],
    "CERRO LARGO": ["MELO", "RÍO BRANCO", "FRAILE MUERTO"],
    "COLONIA": ["COLONIA DEL SACRAMENTO", "CARMELO", "JUAN LACAZE"],
    "DURAZNO": ["DURAZNO", "SARANDÍ DEL YI", "CERRO CHATO"],
    "FLORES": ["TRINIDAD", "ISMAEL CORTINAS", "JUAN JOSÉ CASTRO"],
    "FLORIDA": ["FLORIDA", "SARANDÍ GRANDE", "CARDAL"],
    "LAVALLEJA": ["MINAS", "JOSÉ PEDRO VARELA", "MARISCALA"],
    "MALDONADO": ["MALDONADO", "PUNTA DEL ESTE", "SAN CARLOS"],
    "MONTEVIDEO": ["MONTEVIDEO"],
    "PAYSANDÚ": ["PAYSANDÚ", "GUICHÓN", "QUEBRACHO"],
    "RÍO NEGRO": ["FRAY BENTOS", "YOUNG", "SAN JAVIER"],
    "RIVERA": ["RIVERA", "TRANQUERAS", "VICHADERO"],
    "ROCHA": ["ROCHA", "CHUY", "LA PALOMA"],
    "SALTO": ["SALTO", "CONCORDIA", "COLONIA LAVALLEJA"],
    "SAN JOSÉ": ["SAN JOSÉ DE MAYO", "CIUDAD DEL PLATA", "ECILDA PAULLIER"],
    "SORIANO": ["MERCEDES", "DOLORES", "CARDONA"],
    "TACUAREMBÓ": ["TACUAREMBÓ", "PASO DE LOS TOROS", "SAN GREGORIO DE POLANCO"],
    "TREINTA Y TRES": ["TREINTA Y TRES", "RÍO BRANCO", "VERGARA"]
};

const quitarTildes = (str) => {
    //utilizamos el método normalize("NFD") para descomponer el carácter acentuado "Ú" en "U" y el acento por separado. Luego, utilizamos el método replace() 
    //junto con la expresión regular /[\u0300-\u036f]/g para eliminar cualquier caracter diacrítico, incluyendo el acento.
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const tryGetDepartamento = (departamento) => {
    const depNormalizado = quitarTildes(departamento).toUpperCase();

    for (let clave in departamentoLocalidades) {
        const claveNormalizada = quitarTildes(clave);
        if (claveNormalizada === depNormalizado) {
            return clave;
        }
    }

    return '';
}

export const esDepartamento = (departamento) => {
    const key = tryGetDepartamento( departamento );
    const existe = departamentoLocalidades.hasOwnProperty(key);

    return existe;

}

export const esLocalidad = (localidad, departamento) => {
    if ( !esDepartamento(departamento) ){
        return false;
    }
    
    const localidades = departamentoLocalidades[departamento];
    const existe = localidades.includes(localidad);

    return existe;
}
