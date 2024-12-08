<?php
    class Equipo {

        private $server;
        private $user;
        private $pass;
        private $dbname;

        private $pdo;

        private $idpiloto1;
        private $idpiloto2;
        private $idmotor;
        private $idEscuderia;
        private $idJefe;

        public function __construct(){
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "equipos";

            $this->pdo = new PDO("mysql:host=$this->server;dbname=$this->dbname;charset=utf8", $this->user, $this->pass);
        }

        function obtenerEquipoAleatorio(){
            $pilotos = $this->obtenerPilotos();
            $escuderia = $this->obtenerEscuderia();
            $this->idEscuderia = $escuderia[0]['idEscuderia'];
            $motor = $this->obtenerMotor();
            $this->idMotor = $motor[0]['idMotor'];
            $jefe = $this->obtenerJefe();
            $this->idJefe = $jefe[0]['idJefe'];

            $piloto1 = $pilotos[0]['nombre']." ".$pilotos[0]['apellidos'];
            $piloto2 = $pilotos[1]['nombre']." ".$pilotos[1]['apellidos'];
            $this->idPiloto1 = $pilotos[0]['idPiloto'];
            $this->idPiloto2 = $pilotos[1]['idPiloto'];

            echo '<section>';
            echo '<h2>Equipo Aleatorio</h2>';
            echo '<p>A continuacion se muestra un equipo completamente aleatorio compuesto por dos de los 
                pilotos actuales de Formula 1, un motor utilizado en la categoria y una escuderia, ponle una 
                calificacion y comenta que mejorarias.</p>';
            echo 'Pilotos: ';
            echo '<ol>';
            echo '<li>'.$piloto1.'</li>';
            echo '<li>'.$piloto2.'</li>';
            echo '</ol>';
            echo '<p>Motor: '.$motor[0]['nombre'].'</p>';
            echo '<p>Escuderia: '.$escuderia[0]['nombre'].'</p>';
            echo '<p>Jefe de equipo: '.$jefe[0]['nombre'].' '.$jefe[0]['apellidos'].'</p>';
            echo '</section>';

            $this->mostrarFormulario();

        }

        function obtenerPilotos(){
            try{
                
                // Consulta sql
                $sql = "SELECT * FROM piloto ORDER BY RAND() LIMIT 2";
                
                // Creamos el prepared statement
                $smntc = $this->pdo->prepare($sql);
                // Ejecutamos la consulta
                $smntc->execute();
                // Obtenemos los dos pilotos aleatorios para devolverlos
                $resultc = $smntc->fetchAll(PDO::FETCH_ASSOC);
        
            } catch(PDOException $e) {
               return false;
            } catch(mysqli_sql_exception $e){
                return false;
            }
            return $resultc;
        }

        function obtenerEscuderia(){
            try{
                // Conexion a la base de datos 
                // Consulta sql
                $sql = "SELECT * FROM escuderia ORDER BY RAND() LIMIT 1";
                // Creamos el prepared statement
                $smntc = $this->pdo->prepare($sql);
                // Ejecutamos la consulta
                $smntc->execute();
                // Obtenemos la escuderia aleatoria para devolverla
                $resultc = $smntc->fetchAll(PDO::FETCH_ASSOC);
        
            } catch(PDOException $e) {
               return false;
            } catch(mysqli_sql_exception $e){
                return false;
            }
            return $resultc;
        }

        function obtenerMotor(){
            try{
                // Consulta sql
                $sql = "SELECT * FROM motor ORDER BY RAND() LIMIT 1";
                // Creamos el prepared statement
                $smntc = $this->pdo->prepare($sql);
                // Ejecutamos la consulta
                $smntc->execute();
                // Obtenemos el motor aleatorio para devolverlo
                $resultc = $smntc->fetchAll(PDO::FETCH_ASSOC);
        
            } catch(PDOException $e) {
               return false;
            } catch(mysqli_sql_exception $e){
                return false;
            }
            return $resultc;   
        }

        function obtenerJefe(){
            try{
                // Consulta sql
                $sql = "SELECT * FROM jefe_equipo ORDER BY RAND() LIMIT 1";
                // Creamos el prepared statement
                $smntc = $this->pdo->prepare($sql);
                // Ejecutamos la consulta
                $smntc->execute();
                // Obtenemos el motor aleatorio para devolverlo
                $resultc = $smntc->fetchAll(PDO::FETCH_ASSOC);
        
            } catch(PDOException $e) {
               return false;
            } catch(mysqli_sql_exception $e){
                return false;
            }
            return $resultc;   
        }

        function mostrarFormulario(){
            echo '<form action="equipo.php" method="POST">';
            echo '<label>Nombre del Usuario:
                    <input type="text" name="nombre" placeholder="Escribe tu nombre" required>
                </label>';
            echo '<label for="opinion">Opinión:</label>
                <textarea id="opinion" name="opinion" rows="5" placeholder="Escribe tu opinión aquí..." required></textarea>';
            echo '<label>Calificación (0-10):
                    <input type="number" name="calificacion" min="0" max="10" placeholder="Ingresa una calificación" required>
                </label>';

            // Campos ocultos para los IDs
            echo '<input type="hidden" name="idPiloto1" value="'.$this->idPiloto1.'">';
            echo '<input type="hidden" name="idPiloto2" value="'.$this->idPiloto2.'">';
            echo '<input type="hidden" name="idMotor" value="'.$this->idMotor.'">';
            echo '<input type="hidden" name="idEscuderia" value="'.$this->idEscuderia.'">';
            echo '<input type="hidden" name="idJefe" value="'.$this->idJefe.'">';

            echo '<input type="submit" value="Enviar">';
            echo '</form>';
        }

        function guardarOpinion($nombre, $opinion, $calificacion, $idPiloto1, $idPiloto2, 
                                $idMotor, $idEscuderia, $idJefe){
            try{
                // Consulta sql
                $sql = "INSERT INTO opinion (nombreUsuario, calificacion, comentario, idPiloto1, idPiloto2, idEscuderia, idMotor, idJefe)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                // Creamos el prepared statement
                $smntc = $this->pdo->prepare($sql);

                $smntc->bindParam(1, $nombre);
                $smntc->bindParam(2, $calificacion);
                $smntc->bindParam(3, $opinion);
                $smntc->bindParam(4, $idPiloto1);
                $smntc->bindParam(5, $idPiloto2);
                $smntc->bindParam(6, $idEscuderia);
                $smntc->bindParam(7, $idMotor);
                $smntc->bindParam(8, $idJefe);

                // Ejecutamos la consulta
                $smntc->execute();
                
            } catch(PDOException $e) {
            return false;
            } catch(mysqli_sql_exception $e){
                return false;
            }
            return true;   
        }
    }

    // Procesar el formulario
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['nombre'])) {
        $nombre = $_POST['nombre'];
        $opinion = $_POST['opinion'];
        $calificacion = (int) $_POST['calificacion'];

        // Ejemplo de valores; se deben obtener dinámicamente según el equipo mostrado
        $idPiloto1 = (int) $_POST['idPiloto1'];
        $idPiloto2 = (int) $_POST['idPiloto2'];
        $idMotor = (int) $_POST['idMotor'];   
        $idEscuderia = (int) $_POST['idEscuderia'];
        $idJefe = (int) $_POST['idJefe'];
        
        $equipo = new Equipo();        
        $equipo->guardarOpinion($nombre, $opinion, $calificacion, $idPiloto1, $idPiloto2, $idMotor, $idEscuderia, $idJefe);
    }
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Saul Tuñon Fernandez" />
    <meta name="description" content="Juego del equipo aleatorio de F1 Desktop" />
    <meta name="keywords" content="f1, formulauno, juegos, equipoaleatorio" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>F1Desktop - Equipo Aleatorio</title>
    
    <link rel="icon" href="../multimedia/imagenes/f1_icono.ico"/>
    <!-- añadir el elemento link de enlace a la hoja de estilo dentro del <head> del documento html -->
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />

</head>

<body>
    <header>
        <h1><a href="../index.html">F1 Desktop</a></h1>
        <nav>
            <a href="../index.html" title="inicio">Inicio</a>
            <a href="../piloto.html" title="piloto">Piloto</a>
            <a href="../noticias.html" title="noticias">Noticias</a>
            <a href="../calendario.html" title="calendario">Calendario</a>
            <a href="../meteorologia.html" title="meteorologia">Meteorologia</a>
            <a href="../circuito.html" title="circuito">Circuito</a>
            <a href="../viajes.php" title="viajes">Viajes</a>
            <a href="../juegos.html" title="juegos" class="active">Juegos</a>
        </nav>        
    </header>
    <p>Estás en: 
        <a href="../index.html" title="Enlace a la pagina de inicio de F1Desktop">Inicio</a> >> 
        <a href="../juegos.html" title="Enlace a la pagina de juegos de F1Desktop">Juegos</a> >> 
        Equipo aleatorio</p>
    
    <p>Los juegos que hay disponibles son los siguientes:</p>
    <ul>
        <li><a href="../memoria.html" title="Enlace a la pagina del juego de memoria">Juego de memoria</a></li>
        <li><a href="../semaforo.php" title="Enlace a la pagina del juego del tiempo de reaccion">Juego de tiempo de reaccion</a></li>
        <li><a href="../api.html" title="Enlace a la pagina del parrilla ideal">Parrilla perfecta</a></li>
    </ul> 
    
    <?php
        
        include 'setup.php';

        $setup = new SetUp();

        // SE ha pulsado en exportar
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['exportar'])) {
            $setup->exportCSVData();
        }
        // Se ha añadido un csv para importar los datos a la bd
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['csvFile'])) {
            $file = $_FILES['csvFile'];
        
            $uploadDir = './';
            $filePath = $uploadDir . basename($file['name']);
            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                $setup->importCSVData($filePath);
                //unlink($filePath);
            } else {
                echo "Error al subir el archivo.";
            }
        }
    ?>

    <?php
        $equipo = new Equipo();
        $equipo->obtenerEquipoAleatorio();
    ?>

</body>

</html>