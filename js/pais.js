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
        var urlOpenWeatherMaps = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${apiKey}&units=metric&mode=xml`;

        $.ajax({
            url: urlOpenWeatherMaps,
            datatype: "xml",
            method: 'GET',
            success: function (datos) {
                //console.log(datos);

                $(datos).find('time').each(function () {
                    var fecha = $(this).attr('from').split('T')[0];
                    var hora = $(this).attr('from').split('T')[1];

                    if (hora == '12:00:00') {
                        var temperaturaMaxima = $(this).find('temperature').attr('max');
                        var temperaturaMinima = $(this).find('temperature').attr('min');
                        var humedad = $(this).find('humidity').attr('value');
                        var icono = $(this).find('symbol').attr('var');
                        var lluvia = $(this).find('precipitation').attr('value');


                        var article = $('<article>').append(
                            $('<h3>').text(fecha),
                            $('<img>', {
                                src: `https://openweathermap.org/img/wn/${icono}@2x.png`,
                                alt: `Icono de ${$(this).find('symbol').attr('name')}`
                            }),
                            $('<p>').text("Temperatura máxima: " + temperaturaMaxima + "ºC"),
                            $('<p>').text("Temperatura Mínima: " + temperaturaMinima + "ºC"),
                            $('<p>').text("Porcentaje de humedad: " + humedad + " %"),

                            lluvia ?
                                $('<p>').text("Lluvia: " + lluvia + " mm/h") :
                                $('<p>').text("Lluvia: no hay informacion disponible.")
                        );
                        $('body').append(article);
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