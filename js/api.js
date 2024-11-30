class Api {

    constructor() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            //El navegador no soporta el API File
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
        if (!('draggable' in document.createElement('span') &&
            'ondragstart' in window &&
            'ondragover' in window &&
            'ondrop' in window)) {
                document.write("<p> Este navegador no soporta la API Drag and Drop. </p>");
        }
        if(!document.documentElement.requestFullscreen){
            document.write("<p> Este navegador no soporta la API Fullscreen. </p>");
        }

        $(document).ready(function () {
            document.querySelector('button')
                    .addEventListener('click', () => api.activarPantallaCompleta());
            var inputs = document.querySelectorAll('p input');
            inputs[0].addEventListener('change', () => api.obtenerEquipos());
            inputs[1].addEventListener('change', () => api.obtenerPilotos());
        });
    }

    obtenerPilotos() {
        var archivo = document.querySelectorAll('input')[1].files[0];
        var sect = $('body > section:first-of-type');

        if (archivo.type.match(/text.*/)) {
            var lector = new FileReader();
            lector.onload = (e) => {
                const contenido = e.target.result;
                // Dividimos el contenido por líneas ya que cada piloto va en una linea
                const pilotosLinea = contenido.split('\n');
                this.pilotos = pilotosLinea;
                //console.log(this.pilotos);

                var sectPilotos = $('<section>');
                sectPilotos.append($('<h3>').text("Pilotos"));
                var lista = $('<ul>');
                this.pilotos.forEach(piloto => {
                    var liPiloto = $('<li>')
                        .attr("draggable", true)
                        .text(piloto);

                    liPiloto.on('dragstart', (e) => {
                        e.originalEvent.dataTransfer.setData("text/plain", piloto);
                    });

                    lista.append(liPiloto);
                });
                sectPilotos.append(lista);
                sect.append(sectPilotos);

            };
            lector.readAsText(archivo);
        }
    }

    obtenerEquipos() {
        var archivo = document.querySelector('input:first-of-type').files[0];
        var sect = $('section:first-of-type');

        if (archivo.type.match(/text.*/)) {
            var lector = new FileReader();
            lector.onload = (e) => {
                const contenido = e.target.result;
                // Dividimos el contenido por líneas ya que cada equipo va en una linea
                const equiposLinea = contenido.split('\n');
                this.equipos = equiposLinea;
                console.log(this.equipos);

                var sectEquipos = $('<section>');
                sectEquipos.append($('<h3>').text("Equipos en parrilla"));
                this.equipos.forEach(equipo => {
                    var artEquipo = $('<article>').append(
                        $('<h4>').text(equipo)
                    );

                    artEquipo.on('dragover', (e) => {
                        e.preventDefault(); 
                    });

                    artEquipo.on('drop', (e) => {
                        e.preventDefault();
                        const pilotoName = e.originalEvent.dataTransfer.getData("text/plain");
                        // Verifica si ya existe una lista dentro del equipo
                        let listaPilotos = artEquipo.find("ul");
                        if (listaPilotos.length === 0) {
                            listaPilotos = $('<ul>');
                            artEquipo.append(listaPilotos);
                        }

                        if (artEquipo.find("li").length < 2) {
                            // Agrega el piloto a la lista
                            const nuevoPiloto = $('<li>').text(pilotoName);
                            listaPilotos.append(nuevoPiloto);

                            // Elimina el piloto de la lista inicial
                            var pilotoborrar = $('section > section:nth-of-type(2) li');
                            pilotoborrar.filter(function () {
                                return $(this).text() === pilotoName;
                            }).remove();
                        }
                    });

                    sectEquipos.append(artEquipo);
                });

                sect.append(sectEquipos);
            };
            lector.readAsText(archivo);
        }
    }

    activarPantallaCompleta() {
        let elemento = document.documentElement;

        if (elemento.requestFullscreen) { // Para que si no tiene la opcion no salte error en ejecucion
            elemento.requestFullscreen();
        }
    }

}

var api = new Api();