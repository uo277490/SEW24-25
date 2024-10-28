class Pais {
    constructor (nombrePais, nombreCapital, poblacion) {
            this.nombrePais = nombrePais;
            this.nombreCapital = nombreCapital;
            this.poblacion = poblacion;
            this.rellenarCampos();
    }

    rellenarCampos(){
        this.nombreCircuito = "Albert Park";
        this.gobierno = "Monarquia Constitucional";
        this.lat = "-37.850003";
        this.lon = "144.968904";
        this.alt = "4.86";
        this.religion = "Cristianismo";
    }

    getNombrePais(){ return this.nombrePais; }
    getNombreCapital(){ return this.nombreCapital; }
    getNombreCircuito(){ return this.nombreCircuito; }
    getPoblacion(){ return this. poblacion; }
    getGobierno(){ return this.gobierno; }
    getLat(){ return this.lat; }
    getLon(){ return this .lon; }
    getAlt(){ return this.alt; }
    getReligion(){ return this.religion; }

    getInformacionPrincipal(){ 
        return this.nombrePais+" cuya capital es "+this.nombreCapital;
    }
    getInformacionSecundaria(){
        return "<ul><li>Nombre del circuito: "+this.nombreCircuito+"</li>"+
                "<li>Poblacion: "+this.poblacion+"</li>"+
                "<li>Gobierno: "+this.gobierno+"</li>"+
                "<li>Religion: "+this.religion+"</li></ul>"
    }
    getCoordenadasMeta(){
        document.write("<p>Las coordenadas del circuito son: "+this.lon+" "+this.lat+" "+this.alt+" </p>");
    }
}

var pais = new Pais("Australia", "Melbourne", "26316000");