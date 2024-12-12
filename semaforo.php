<?php 
    class Record {
        private $server;
        private $user;
        private $pass;
        private $dbname;
        public function __construct(){
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "records";
        }

        function insertRecord(){
            
            try{
                // Conexion a la base de datos 
                $pdo = new PDO("mysql:host=$this->server;dbname=$this->dbname;charset=utf8", $this->user, $this->pass);
                // Consulta sql
                $sql = "INSERT INTO registro (nombre, apellidos, tiempo, nivel) 
                            VALUES (?, ?, ?, ?)";
                
                // Creamos el prepared statement
                $smntc = $pdo->prepare($sql);
                // Añadimos los parametros 
                $tiempo = floatval($_POST['tiempo']);
                $dificultad = floatval($_POST['nivel']);
                $smntc->bindParam(1, $_POST['nombre']);
                $smntc->bindParam(2, $_POST['apellidos']);
                $smntc->bindParam(3, $tiempo );
                $smntc->bindParam(4, $dificultad);
                // Ejecutamos la consulta
                $resultc = $smntc->execute();
        
            } catch(PDOException $e) {
               return false;
            } catch(mysqli_sql_exception $e){
                return false;
            }
            return true;
        }

        function obtenerMejoresRecords(){
            try{
                // Conexion a la base de datos 
                $pdo = new PDO("mysql:host=$this->server;dbname=$this->dbname;charset=utf8", $this->user, $this->pass);
                // Consulta sql
                $sql = "SELECT * FROM registro WHERE nivel = ? ORDER BY tiempo LIMIT 10";
                
                // Creamos el prepared statement
                $smntc = $pdo->prepare($sql);
                // Añadimos los parametros 
                $dificultad = floatval($_POST['nivel']);
                $smntc->bindParam(1, $dificultad);
                // Ejecutamos la consulta
                $smntc->execute();
                // Obtenemos los mejores resultados para devolverlos
                $resultc = $smntc->fetchAll(PDO::FETCH_ASSOC);
        
            } catch(PDOException $e) {
               return false;
            } catch(mysqli_sql_exception $e){
                return false;
            }
            return $resultc;
        }
    }
?>
<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Saul Tuñon Fernandez" />
    <meta name="description" content="Seccion de juego de tiempo de reaccion del F1 Desktop" />
    <meta name="keywords" content=" f1, formulauno, juego, semaforo" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>F1Desktop - Semaforo</title>
    
    <link rel="icon" href="multimedia/imagenes/f1_icono.ico"/>
    <!-- añadir el elemento link de enlace a la hoja de estilo dentro del <head> del documento html -->
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo.css" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/semaforo.js"></script>
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
            <a href="viajes.php" title="viajes">Viajes</a>
            <a href="juegos.html" title="juegos" class="active">Juegos</a>
        </nav>        
    </header>
    <p>Estás en: <a href="index.html" title="Enlace a la pagina de inicio de F1Desktop">Inicio</a> >> 
        <a href="juegos.html" title="Enlace a la pagina de juegos del F1Desktop">Juegos</a> >> 
        Juego de tiempo de reacción</p>
    <h2>Juegos</h2>
    <p>Los juegos que hay disponibles son los siguientes:</p>
    <ul>
        <li><a href="memoria.html" title="Enlace a la pagina del juego de memoria">Juego de memoria</a></li>
        <li><a href="semaforo.php" title="Enlace a la pagina del juego del tiempo de reaccion">Juego de tiempo de reacción</a></li>
        <li><a href="api.html" title="Enlace a la pagina del parrilla ideal">Parrilla perfecta</a></li>
        <li><a href="php/equipo.php" title="Enlace a la pagina de puntuar equipo aleatorio">Equipo aleatorio</a></li>
    </ul>
    <main>
        <script>
            var semaforo = new Semaforo();
        </script>

        <?php
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST)) {
                $record = new Record();
                $confirmacion = $record->insertRecord(); 
                if($confirmacion){
                    $records = $record->obtenerMejoresRecords(); 
                    echo '<article>';
                    echo '<h4>Mejores tiempos</h4>';
                    echo '<ol>';
                    foreach($records as $r){
                        echo '<li>'.$r['nombre'].' '.$r['apellidos'].' - '.$r['tiempo'].'</li>';
                    }
                    echo '</ol>';
                    echo '</article>';
                }
            } 
        ?>
    </main>
</body>

</html>