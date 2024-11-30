class Circuito {
    constructor() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            //El navegador no soporta el API File
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
        this.circuitos = [];

        $(document).ready(function () {
            var inputs = document.querySelectorAll('input');
            inputs[0].addEventListener('change', () => circuito.leerCircuito());
            inputs[1].addEventListener('change', () => circuito.mostrarPlanimetria());
            inputs[2].addEventListener('change', () => circuito.mostrarAltimetria());
        });
    }

    /**
     * Metodo que permite leer un archivo que se le pasa por parametro y tratarlo como xml
     */
    leerCircuito() {
        // Obtengo el archivo del primer input del html
        var archivo = document.querySelector('input:first-of-type').files[0];
        if (archivo.type.match(/xml.*/)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                var section = $('section:first-of-type');
                const contenido = evento.target.result;

                // Parsear el contenido XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(contenido, "application/xml");

                var circuito = xmlDoc.querySelector("circuito");

                var nombre = circuito.getAttribute("nombre");

                var longitud = xmlDoc.querySelector("longitud");
                var longunit = longitud.getAttribute("unidad");

                var anchura = xmlDoc.querySelector("anchura");
                var anchunit = anchura.getAttribute("unidad");

                var fecha = xmlDoc.querySelector("fechaCarrera");
                var hora = xmlDoc.querySelector("horaCarrera");
                var nvueltas = xmlDoc.querySelector("numeroVueltas");
                var localidad = xmlDoc.querySelector("localidad");
                var pais = xmlDoc.querySelector("pais");

                var refs = xmlDoc.querySelectorAll("referencia");
                var fotos = xmlDoc.querySelectorAll("foto");
                var videos = xmlDoc.querySelectorAll("video");

                var coordSalida = xmlDoc.querySelector("coordenadasSalida");
                var lonSal = coordSalida.getAttribute("longitud");
                var latSal = coordSalida.getAttribute("latitud");
                var altSal = coordSalida.getAttribute("altitud");

                var coordTramo = xmlDoc.querySelectorAll("coordenadasPunto");

                // Creamos una lista con enlaces para mostrarlos en la pagina
                var enlaces = $('<ul>');
                let i = 0
                refs.forEach(ref => {
                    i++;
                    enlaces.append($('<li>').append(
                        $('<a>').attr("href", ref.textContent)
                            .attr("title", "Enlace a la referencia " + i)
                            .text("Enlace " + i)
                    ));
                });

                // Creamos un section para mostrar las imagenes del circuito
                var section_fotos = $('<section>');
                section_fotos.append($('<h3>').text("Fotos del circuito"));
                i = 0;
                fotos.forEach(foto => {
                    i++;
                    // Para cada foto/imagen añadimos un elemento img al contenedor
                    section_fotos.append(
                        $('<img>').attr("src", foto.textContent)
                            .attr("alt", `Imagen ${i} del circuito`)
                    );
                });

                // Creamos una lista para añadir los tramos del circuito
                var sector1 = $('<li>').text("Sector 1");
                var puntosTramo1 = $('<ul>');
                var distSect1 = 0;

                var sector2 = $('<li>').text("Sector 2");
                var puntosTramo2 = $('<ul>');
                var distSect2 = 0;

                var sector3 = $('<li>').text("Sector 3");
                var puntosTramo3 = $('<ul>');
                var distSect3 = 0;

                coordTramo.forEach(coord => {
                    var lonpunto = coord.getAttribute("longitud");
                    var latpunto = coord.getAttribute("latitud");
                    var altpunto = coord.getAttribute("altitud");
                    var numeroSector = coord.getAttribute("numeroSector");
                    var dist = coord.getAttribute("distancia");
                    var unidadPunto = coord.getAttribute("unidades");
                    if (numeroSector == 1) {
                        puntosTramo1.append($("<li>").text(`Longitud: ${lonpunto} - Latitud: ${latpunto}  
                               - Altitud: ${altpunto} - Distancia punto anterior: ${dist} ${unidadPunto}`));
                        distSect1 += parseInt(dist, 10);
                    } else if (numeroSector == 2) {
                        puntosTramo2.append($("<li>").text(`Longitud: ${lonpunto} - Latitud: ${latpunto}  
                               - Altitud: ${altpunto} - Distancia punto anterior: ${dist} ${unidadPunto}`));
                        distSect2 += parseInt(dist, 10);
                    } else if (numeroSector == 3) {
                        puntosTramo3.append($("<li>").text(`Longitud: ${lonpunto} - Latitud: ${latpunto}  
                               - Altitud: ${altpunto} - Distancia punto anterior: ${dist} ${unidadPunto}`));
                        distSect3 += parseInt(dist, 10);
                    }
                });
                puntosTramo1.append($("<li>").text(`La longitud total del sector 1 es aproximadamente ${distSect1} metros`));
                puntosTramo2.append($("<li>").text(`La longitud total del sector 2 es aproximadamente ${distSect2} metros`));
                puntosTramo3.append($("<li>").text(`La longitud total del sector 3 es aproximadamente ${distSect3} metros`));


                sector1.append(puntosTramo1);
                sector2.append(puntosTramo2);
                sector3.append(puntosTramo3);
                var sectoresCircuito = $("<ol>").append(
                    sector1,
                    sector2,
                    sector3
                );

                // Se añaden todos los datos que se quieren mostrar al circuito
                section.append(
                    $('<p>').text(`El circuito se llama ${nombre}, se encuentra en la localidad de 
                        ${localidad.textContent} en ${pais.textContent}, tiene una longitud de ${longitud.textContent} 
                        ${longunit} y una anchura media de ${anchura.textContent} ${anchunit}.`),
                    $('<p>').text(`La carrera sera el dia ${fecha.textContent} a las ${hora.textContent} donde 
                        los corredores realizaran un total de ${nvueltas.textContent} vueltas al circuito.`),
                    $('<p>').text(`Si se desea tener más información se puede consultar en los siguientes enlaces:`),
                    enlaces,
                    $('<p>').text(`A continuacion se pueden ver las coordenadas de los diferentes puntos del 
                        circuito asi como más información acerca de estos:`),
                    sectoresCircuito,
                    section_fotos
                );

                // Si hay algun video se añade
                if (videos.length > 0) {
                    // Creamos un contenedor (section) para mostrar los videos del circuito
                    var section_videos = $('<section>');
                    section_videos.append($('<h3>').text("Videos del circuito"))
                    videos.forEach(video => {
                        i++;
                        // Para cada foto/imagen añadimos un elemento img al contenedor
                        section_videos.append(
                            $('<video>')
                                .attr("controls", true)
                                .attr("src", video.textContent)
                        );
                    });
                    section.append(section_videos);
                }

            }
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }
    }

    mostrarPlanimetria() {
        // Obtengo los archivos del segundo de los input
        var archivos = document.querySelectorAll('input')[1].files;

        //Creamos un div donde mostrar el mapa para luego añadirlo al section
        var planMap = document.createElement('div');
        //console.log(planMap);
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzc0OTAiLCJhIjoiY20zbXd5bDNjMHg1YTJ3cW8ybDBpcXY0biJ9.TFlyhgMVjN1C9i3q9zVxsg';
        const map = new mapboxgl.Map({
            container: planMap, // container ID
            center: [pais.lon, pais.lat], // starting position
            zoom: 13 // starting zoom
        });

        // Usamos un contador para generar identificadores únicos
        let circuitIdCounter = 0;

        Array.from(archivos).forEach(archivo => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const kmlText = e.target.result;
                // Parsear el texto del archivo KML como XML
                const parser = new DOMParser();
                const kmlDoc = parser.parseFromString(kmlText, "application/xml");


                // Extraer coordenadas del archivo KML
                const coordinatesElement = kmlDoc.querySelector("coordinates");
                if (!coordinatesElement) {
                    console.error("No se encontraron coordenadas en el archivo KML");
                    return;
                }
                const coordinatesText = coordinatesElement.textContent.trim();
                const coordinates = coordinatesText.split("\n").map(coord => {
                    const [lon, lat] = coord.split(",").map(Number);
                    return [lon, lat];
                });

                // Para cada archivo de coordenadas las cargamos en el mapa
                map.on('load', () => {
                    // Generamos un identificador único para este circuito/coordenadas
                    // de manera que los circuitos se añadan en el mismo mapa separados correctamente
                    const circuitId = `circuito-${circuitIdCounter++}`;

                    // Se añaden las coordenadas obtenidas anteriormente al mapa
                    map.addSource(circuitId, {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'LineString',
                                // Se añaden las coordenadas del circuito.
                                'coordinates': coordinates
                            }
                        }
                    });
                    // Se añade una linea roja que una dichas coordenadas
                    map.addLayer({
                        'id': `${circuitId}-outline`,
                        'type': 'line',
                        'source': circuitId,
                        'layout': {},
                        'paint': {
                            'line-color': '#FF0000',
                            'line-width': 3
                        }
                    });
                });

                map.resize();
            };

            reader.onerror = function () {
                console.error("Error al leer el archivo KML");
            };


            reader.readAsText(archivo); // Leer el archivo como texto
        });

        //Añadimos el mapa al section correspondiente
        document.querySelector('section:nth-of-type(2)').append(planMap);

    }

    mostrarAltimetria() {
        var archivo = document.querySelectorAll('input')[2].files[0];
        //console.log(archivo);

        if (archivo && archivo.type === 'image/svg+xml') {
            const reader = new FileReader();

            reader.onload = function (e) {
                const svgContent = e.target.result;

                ///console.log(svgContent);

                const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svgContent);

                var altimetria = $('<img>').attr("src", svgDataUrl)
                    .attr("alt", `Altimetria del circuito`);

                $('section:nth-of-type(3)').append(altimetria);
            };

            reader.onerror = function () {
                console.error("Error al leer el archivo SVG.");
            };

            reader.readAsText(archivo);
        } else {
            console.error("Por favor, selecciona un archivo SVG.");
        }
    }
}

var circuito = new Circuito();