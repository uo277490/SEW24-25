class Fondo {
    constructor(nombrePais, nombreCapital, nombreCircuito) {
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.nombreCircuito = nombreCircuito;
    }

    obtenerFondos() {
        var apiKey = "006d07a986b413f549f4437d513d88d8";
        var lugar = "Albert Park f1";
        var urlAPI = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${lugar}`;
        $.getJSON(urlAPI,
            {
                tags: "Albert Park",
                tagmode: "any",
                format: "json",
                nojsoncallback: 1
            })
            .done(function (data) {
                let imagenEscogida = data.photos.photo[0];
                
                let srcimg = `https://farm${imagenEscogida.farm}.staticflickr.com/${imagenEscogida.server}/${imagenEscogida.id}_${imagenEscogida.secret}.jpg`;
                
                $('body').css('background-image', `url(${srcimg})`);
            });
    }


}

var fondo = new Fondo("Australia", "Canberra", "Albert Park");