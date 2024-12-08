<?php
    class SetUp{
        private $server;
        private $usuario;
        private $password;
        private $archivoSQL;
        private $dbname;

        public function __construct() {
            $this->server = 'localhost';
            $this->usuario = 'DBUSER2024';
            $this->password = 'DBPSWD2024';
            $this->archivoSQL = 'database.sql';
            $this->dbname = 'equipos';

            //Creamos la base de datos si no esta creada
            $this->createDatabase();
            //Añadimos las opciones de importar y exportar ficheros
            $this->createUtilities();
        }

        function createUtilities(){
            //Se crea un formulario con un boton para que al pulsarlo se exporten los datos de la base de datos
            echo '<p>Pulse en el siguiente boton si desea exportar los datos de la base de datos actual.</p>';
            echo '<form method="post">';
            echo '<button type="submit" name="exportar">Exportar CSV</button>';
            echo '</form>';
            //Se crea un formulario para importar el fichero csv
            echo '<form method="post" enctype="multipart/form-data">';
            echo '<label for="csvFile">Subir archivo CSV:</label>';
            echo '<input type="file" name="csvFile" id="csvFile" accept=".csv" required>';
            echo '<button type="submit">Importar</button>';
            echo '</form>';
        }

        function createDatabase(){
            try {
                $conexion = new PDO("mysql:host=$this->server", $this->usuario, $this->password);
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
                $comandosSQL = file_get_contents($this->archivoSQL);
                if ($comandosSQL === false) {
                    throw new Exception("No se pudo leer el archivo SQL.");
                }
            
                $conexion->exec($comandosSQL);
            
            } catch (PDOException $e) { // Salta cuando la base de datos ya existe
                
            } catch (Exception $e) {
                echo "<p>Error al inicializar la base de datos</p>";
            }
        }

        function importCSVData($archivoCSV){
            try {
                // Vaciamos las tablas para evitar problemas de duplicidad de claves
                $this->vaciarTablas();

                // Conectar a la base de datos
                $conexion = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->usuario, $this->password);
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
                // Abrir el archivo CSV
                if (($f_import = fopen($archivoCSV, "r")) !== false) {
                    $tablaActual = null; // Almacena la tabla que se está procesando
                    $stmt = null;
            
                    // Leer línea por línea
                    while (($fila = fgetcsv($f_import, 1000 ,",")) !== false) {
                        // Miro el id de cada tabla para saber en cuala me encuentro
                        // El continue es para saltarse la fila de encabezados
                        if ($fila[0] === "idEscuderia") {
                            $tablaActual = "escuderia";
                            continue;
                        } elseif ($fila[0] === "idJefe") {
                            $tablaActual = "jefe_equipo";
                            continue;
                        } elseif ($fila[0] === "idMotor") {
                            $tablaActual = "motor";
                            continue;
                        } elseif ($fila[0] === "nombreUsuario") {
                            $tablaActual = "opinion";
                            continue;
                        } elseif ($fila[0] === "idPiloto") {
                            $tablaActual = "piloto";
                            continue;
                        }
                        
                        // Insertar datos según la tabla actual
                        if($tablaActual == "escuderia"){
                            $sql = "INSERT INTO escuderia (idEscuderia, nombre, pais) VALUES (:idEscuderia, :nombre, :pais)";
                            $stmt = $conexion->prepare($sql);
                            $stmt->execute([
                                ':idEscuderia' => $fila[0],
                                ':nombre' => $fila[1],
                                ':pais' => $fila[2]
                            ]);
                        } else if($tablaActual == "jefe_equipo"){
                            $sql = "INSERT INTO jefe_equipo (idJefe, nombre, apellidos) VALUES (:idJefe, :nombre, :apellidos)";
                            $stmt = $conexion->prepare($sql);
                            $stmt->execute([
                                ':idJefe' => $fila[0],
                                ':nombre' => $fila[1],
                                ':apellidos' => $fila[2]
                            ]);
                        } else if($tablaActual == "motor"){
                            $sql = "INSERT INTO motor (idMotor, nombre) VALUES (:idMotor, :nombre)";
                            $stmt = $conexion->prepare($sql);
                            $stmt->execute([
                                ':idMotor' => $fila[0],
                                ':nombre' => $fila[1]
                            ]);
                        } else if($tablaActual == "opinion"){
                            $sql = "INSERT INTO opinion (nombreUsuario, calificacion, comentario, idPiloto1, idPiloto2, idEscuderia, idMotor, idJefe) 
                                        VALUES (:nombreUsuario, :calificacion, :comentario, :idPiloto1, :idPiloto2, :idEscuderia, :idMotor, :idJefe)";
                            $stmt = $conexion->prepare($sql);
                            $stmt->execute([
                                ':nombreUsuario' => $fila[0],
                                ':calificacion' => $fila[1],
                                ':comentario' => $fila[2],
                                ':idPiloto1' => $fila[3],
                                ':idPiloto2' => $fila[4],
                                ':idEscuderia' => $fila[5],
                                ':idMotor' => $fila[6],
                                ':idJefe' => $fila[7]
                            ]);
                        } else if($tablaActual == "piloto") {
                            $sql = "INSERT INTO piloto (idPiloto, nombre, apellidos, campeonatos) 
                            VALUES (:idPiloto, :nombre, :apellidos, :campeonatos)";
                            $stmt = $conexion->prepare($sql);
                            $stmt->execute([
                                ':idPiloto' => $fila[0],
                                ':nombre' => $fila[1],
                                ':apellidos' => $fila[2],
                                ':campeonatos' => $fila[3]
                            ]); 
                        }
                        
                    }
                    fclose($f_import);
                } else {
                    
                }
            } catch (PDOException $e) {
                echo "<p>Error en la conexión o ejecución</p>";
            } catch (Exception $e) {
                echo "<p>Error al importar</p>";
            }
        }

        function exportCSVData(){
            $nombreArchivo = 'exportado_datos.csv';

            try {
                $conexion = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->usuario, $this->password);
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
                $archivo = fopen($nombreArchivo, 'w');
                if (!$archivo) {
                    
                }
            
                // Obtenemos las tablas
                $tablas = $conexion->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
            
                foreach ($tablas as $t) {
                    // Escribir el encabezado de la tabla como identificador
                    //fputcsv($archivo, [$t]);
            
                    // Obtenemos los datos de la tabla
                    $consulta = $conexion->query("SELECT * FROM $t");
                    $filas = $consulta->fetchAll(PDO::FETCH_ASSOC);
            
                    if (!empty($filas)) {
                        // Escribimos encabezados
                        fputcsv($archivo, array_keys($filas[0]));
            
                        // Escribimos datos
                        foreach ($filas as $f) {
                            fputcsv($archivo, $f);
                        }
                    }
                }
            
                fclose($archivo);
                echo "<p>Archivo CSV generado exitosamente: $nombreArchivo</p>";
            } catch (PDOException $e) {
                echo "<p>Error en la conexión o ejecución</p>";
            } catch (Exception $e) {
                echo "<p>Error al exportar</p>";
            }
        }

        function vaciarTablas(){
            try {
                $pdo = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->usuario, $this->password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
                $tablas = ['opinion', 'piloto', 'escuderia', 'motor', 'jefe_equipo'];
            
                foreach ($tablas as $t) {
                    $pdo->exec("DELETE FROM $t");
                }
            
            } catch (PDOException $e) {
                echo "<p>Error al vaciar las tablas para el importe</p>";;
            }
        }
    }
?>