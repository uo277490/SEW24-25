class Noticias {
    constructor() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            //El navegador no soporta el API File
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }

        $(document).ready(function () {
            document.querySelector('p input')
                .addEventListener('change', () => noticias.readInputFile());
            document.querySelector('button')
                .addEventListener('click', () => noticias.añadirNoticia())
        });
    }

    readInputFile() {
        var archivo = document.querySelector('input').files[0];
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
                        $('<p>').text(texto),
                        $('<p>').text("Autor: " + autor)
                    );
                    $('body > section').append(article);
                });
                this.noticias = noticiaArr;
                noticiasResult = noticiaArr;
            }
            lector.readAsText(archivo);
        }

    }
    añadirNoticia() {
        var titulo = document.querySelectorAll('input')[1].value;
        var autor = document.querySelectorAll('input')[2].value;
        var texto = document.querySelector('textarea').value;
        if (titulo && autor && texto) {
            var article = $('<article>', {}).append(
                $('<h3>').text(titulo),
                $('<p>').text("Autor: " + autor),
                $('<p>').text(texto)
            );
            $('body > section').append(article);
            document.querySelector('form').reset();
        }
    }
}

var noticias = new Noticias();