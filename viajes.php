<?php
    class Carrusel {
        private $nombreCapital;
        private $nombrePais;
        public function __construct($nombreCapital, $nombrePais){
            $this->nombreCapital = $nombreCapital;
            $this->nombrePais = $nombrePais;
        }

        function obtenerFotosCarrusel(){
            $params = array(
                'api_key' => '006d07a986b413f549f4437d513d88d8', // API key
                'method' => 'flickr.photos.search', // Metodo que utilizamos para obtener las imagenes
                'text' => $this->nombrePais, // Texto para buscar en Flickr
                'per_page' => 10 // Número de fotos que queremos obtener
            );
            // Creo la url completa, añadiendo los parametros
            $encoded_params = array();
            foreach ($params as $k => $v){
                $encoded_params[] = urlencode($k).'='.urlencode($v);
            }
            $url = "https://api.flickr.com/services/rest/?".implode('&', $encoded_params);
            // Obtenemos las fotos
            $rsp = file_get_contents($url);

            $xml = simplexml_load_string($rsp);

            echo "<article>";
            echo "<h3>Carrusel de fotos</h3>";
            // Acceder a las fotos
            $indice = 1;
            foreach ($xml->photos->photo as $foto) {
                
                // Obtener atributos de cada foto
                $id = (string) $foto['id'];
                $owner = (string) $foto['owner'];
                $secret = (string) $foto['secret'];
                $server = (string) $foto['server'];
                $farm = (string) $foto['farm'];
                $title = (string) $foto['title'];

                // Construir la URL de la foto
                $srcimg = "https://farm{$farm}.staticflickr.com/{$server}/{$id}_{$secret}.jpg";
                // Mostrar información de la foto
                echo "<img src='{$srcimg}' alt='Imagen {$indice} del carrusel: {$title}' />";

                $indice += 1;
            }

            echo "<button> &gt; </button>";
            echo "<button> &lt; </button>";
            echo "</article>";
        }
    }
    class Moneda {
        private $siglasLocal;
        private $siglasCambio;

        public function __construct($siglasLocal, $siglasCambio){
            $this->siglasLocal = $siglasLocal;
            $this->siglasCambio = $siglasCambio;
        }

        function obtenerCambioMoneda(){
            $url = "https://api.frankfurter.dev/v1/latest?base={$this->siglasLocal}&symbols={$this->siglasCambio}";
            echo $url;
            $rsp = file_get_contents($url);
            
            $data = json_decode($rsp, true);
            $cantidad = $data['amount'];
            $base = $data['base'];
            $date = $data['date'];
            $valor = $data['rates'][$this->siglasCambio];

            echo "<section>";
            echo "<h3>Cambio de moneda</h3>";
            echo "<p>El cambio entre la moneda {$this->siglasLocal} a la moneda {$this->siglasCambio} el dia
                    {$date} es de: {$cantidad}{$this->siglasLocal} = {$valor}{$this->siglasCambio}</p>";
            echo "</section>";
        }
    }
?>
<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Saul Tuñon Fernandez" />
    <meta name="description" content="Seccion de viajes del F1Desktop" />
    <meta name="keywords" content=" f1, formulauno, viajes" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>F1Desktop - Viajes</title>
    
    <link rel="icon" href="multimedia/imagenes/f1_icono.ico"/>
    <!-- añadir el elemento link de enlace a la hoja de estilo dentro del <head> del documento html -->
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/viajes.js"></script>

    <!-- Estos dos ficheros es posible que provoquen ciertos errores de validacion de css y html -->
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js"></script>
</head>

<body>
    <header>
        <h1><a href="index.html">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" title="inicio">Inicio</a>
            <a href="piloto.html" title="piloto">Piloto</a>
            <a href="noticias.html" title="noticias">Noticias</a>
            <a href="calendario.html" title="calendario">Calendario</a>
            <a href="meteorologia.html" title="meteorologia">Meteorologia</a>
            <a href="circuito.html" title="circuito">Circuito</a>
            <a href="viajes.php" title="viajes" class="active">Viajes</a>
            <a href="juegos.html" title="juegos">Juegos</a>
        </nav>        
    </header>
    <p>Estás en: <a href="index.html" title="Enlace a la pagina de inicio de F1Desktop">Inicio</a> >> Viajes</p>

        <h2>Viajes</h2>
        <p>Para mostrar los mapas estatico y dinamico, por favor, permita acceder a su ubicacion pulsando el siguiente boton:</p>
        <button title="Compartir ubicacion para mostrar los mapas">Compartir ubicacion</button>

        <?php
            $moneda = new Moneda("AUD","EUR");
            $moneda->obtenerCambioMoneda();
        ?>
        
        <?php
            $carrusel = new Carrusel("Canberra","Australia");
            $carrusel->obtenerFotosCarrusel();
        ?>
        <section>
            <h3>Mapa estático</h3>
            <input type="button" value="Obtener mapa estático" />
        </section>

        <section>
            <h3>Mapa dinámico</h3>
            <input type="button" value="Obtener mapa dinámico" />
            <div></div>
        </section>
    
    
</body>

</html>