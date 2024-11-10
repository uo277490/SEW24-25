class Agenda {
    constructor(url) {
        this.url = url;
    }

    getCalendar() {
        $.ajax({
            url: this.url,
            method: 'GET',
            datatype: "json",
            success: function (datos) {
                
                let index = 1;
                datos.MRData.RaceTable.Races.forEach(carrera => {
                    
                    let coord = carrera.Circuit.Location;
                    var article = $('<article>', {}).append(
                        $('<h3>').text(index+". "+carrera.raceName),
                        $('<img>',{
                            src: 'multimedia/imagenes/icono_carrera.svg',
                            alt: 'Icono de unas banderas de cuadros cruzadas'
                        }),
                        $('<p>').text("Circuito: "+carrera.Circuit.circuitName),
                        $('<p>').text("Coordenadas: Latitud = "+coord.lat+" Longitud = "+coord.long),
                        $('<p>').text("Fecha de la carrera: "+carrera.date),
                        $('<p>').text("Hora de la carrera: "+carrera.time)
                    );
                    
                    $('body').append(article);
                    index++;
                });
                
                $('button').attr('disabled',true);
            },
            error: function () {
                console.error("No se ha podido obtener la informacion de ",this.url);
            }
        });
    }

}

var agenda = new Agenda('https://api.jolpi.ca/ergast/api/f1/current/races');