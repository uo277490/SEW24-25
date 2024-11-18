class Noticias {
    constructor() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            //El navegador no soporta el API File
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
    }

    readInputFile(files) {
        var archivo = files[0];
        var noticiasResult = [];
        if (archivo.type.match(/text.*/)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                var noticiaArr = [];
                const contenido = evento.target.result;
                // Dividimos el contenido por líneas
                const lineas = contenido.split('\n');

                // Sacamso el Titulo, texto y autor de cada linea
                const noticias = lineas.map(linea => {
                    const [titulo, texto, autor] = linea.split('_');

                    // Añadimos la noticia al html
                    var article = $('<article>', {}).append(
                        $('<h3>').text(titulo),
                        $('<p>').text("Autor: " + autor),
                        $('<p>').text(texto)
                    );
                    $('body > section').append(article);
                });
                this.noticias = noticiaArr;
                noticiasResult = noticiaArr;
            }
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }

    }
    añadirNoticia() {
        var titulo = document.querySelector('input[name="titulo"]').value;
        var autor = document.querySelector('input[name="autor"]').value;
        var texto = document.querySelector('textarea[name="texto"]').value;

        if (titulo && autor && texto) {
            var article = $('<article>', {}).append(
                $('<h3>').text(titulo),
                $('<p>').text("Autor: " + autor),
                $('<p>').text(texto)
            );
            $('body > section').append(article);
            document.querySelector('form').reset();
        } else {
            alert('Ha ocurrido un error al obtener los campos');
        }
    }
}

var noticias = new Noticias();