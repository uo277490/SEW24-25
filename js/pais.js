class Pais {
    // Atributos de la clase pais
    nombrePais;
    nombreCapital;
    nombreCircuito;
    poblacion;
    gobierno;
    lat;
    lon;
    alt;
    religion;

    constructor(nombrePais, nombreCapital, poblacion) {
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.poblacion = poblacion;
        this.rellenarCampos();
    }

    rellenarCampos() {
        this.nombreCircuito = "Albert Park";
        this.gobierno = "Monarquia Constitucional";
        this.lat = "-37.850003";
        this.lon = "144.968904";
        this.alt = "4.86";
        this.religion = "Cristianismo";
    }

    getNombrePais() { return this.nombrePais; }
    getNombreCapital() { return this.nombreCapital; }
    getNombreCircuito() { return this.nombreCircuito; }
    getPoblacion() { return this.poblacion; }
    getGobierno() { return this.gobierno; }
    getLat() { return this.lat; }
    getLon() { return this.lon; }
    getAlt() { return this.alt; }
    getReligion() { return this.religion; }

    getInformacionPrincipal() {
        return this.nombrePais + " cuya capital es " + this.nombreCapital;
    }
    getInformacionSecundaria() {
        return "<ul><li>Nombre del circuito: " + this.nombreCircuito + "</li>" +
            "<li>Poblacion: " + this.poblacion + "</li>" +
            "<li>Gobierno: " + this.gobierno + "</li>" +
            "<li>Religion: " + this.religion + "</li></ul>"
    }
    getCoordenadasMeta() {
        document.write("<p>Las coordenadas del circuito son: " + this.lon + " " + this.lat + " " + this.alt + " </p>");
    }

    getMeteorologia() {
        var apiKey = "c3e7411bb2a75e74620fe6f92e1060c8";
        var urlOpenWeatherMaps = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&datatype=xml`;
        
        $.ajax({
            url: urlOpenWeatherMaps,
            method: 'GET',
            success: function (datos) {
                //console.log("Hola");
                //console.log(datos);
                console.log(datos);
                var body = document.body;
                datos.list.forEach(element => {
                    if(element.dt_txt.split(' ')[1] == '12:00:00'){
                        var article = document.createElement('article');

                        var title = document.createElement('h3');
                        title.textContent = element.dt_txt.split(' ')[0];
                        var max_temp = document.createElement('p');
                        max_temp.textContent = "Temperatura máxima: "+element.main.temp_max;
                        var min_temp = document.createElement('p');
                        min_temp.textContent = "Temperatura mínima: "+element.main.temp_min;
                        var hum_per = document.createElement('p');
                        hum_per.textContent = "Porcentaje de humedad: "+element.main.humidity+"%";
                        var icono = document.createElement('img');
                        icono.setAttribute("src",`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`);
                        icono.setAttribute("alt", `Icono de ${element.weather[0].main}`);
                        var lluvia = document.createElement('p');
                        lluvia.textContent = "Porcentaje de lluvia: "+element.pop*100+" %";

                        article.appendChild(title);
                        article.appendChild(icono);
                        article.appendChild(max_temp);
                        article.appendChild(min_temp);
                        article.appendChild(hum_per);
                        article.appendChild(lluvia);

                        body.appendChild(article);
                    }
                });
                
            },
            error: function () {
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
            }
        });
    }
}

var pais = new Pais("Australia", "Canberra", "26316000");