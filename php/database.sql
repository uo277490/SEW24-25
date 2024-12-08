-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2024 a las 23:17:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `equipos`
--
CREATE DATABASE IF NOT EXISTS `equipos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `equipos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escuderia`
--

CREATE TABLE `escuderia` (
  `idEscuderia` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL,
  `pais` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `escuderia`
--

INSERT INTO `escuderia` (`idEscuderia`, `nombre`, `pais`) VALUES
(1, 'Ferrari', 'Italia'),
(2, 'Alpine', 'Francia'),
(3, 'Mercedes', 'Alemania'),
(6, 'Haas', 'Estados Unidos'),
(7, 'Redbull', 'Reino Unido'),
(8, 'McLaren', 'Reino Unido'),
(9, 'Aston Martin', 'Reino Unido'),
(10, 'RB', 'Italia'),
(11, 'Kick Sauber', 'Suiza'),
(12, 'Williams', 'Reino Unido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jefe_equipo`
--

CREATE TABLE `jefe_equipo` (
  `idJefe` int(11) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `apellidos` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jefe_equipo`
--

INSERT INTO `jefe_equipo` (`idJefe`, `nombre`, `apellidos`) VALUES
(1, 'Christian', 'Horner'),
(2, 'Toto', 'Wolff'),
(3, 'Frederic', 'Vasseur'),
(4, 'Andrea', 'Stella'),
(5, 'Oliver', 'Oakes'),
(6, 'Mike', 'Krack'),
(7, 'Alessandro', 'Alunni Bravi'),
(8, 'Laurent', 'Mekies'),
(9, 'Ayao', 'Komatsu'),
(10, 'James', 'Vowles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motor`
--

CREATE TABLE `motor` (
  `idMotor` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `motor`
--

INSERT INTO `motor` (`idMotor`, `nombre`) VALUES
(1, 'Honda'),
(2, 'Ferrari'),
(3, 'Mercedes'),
(4, 'Renault');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinion`
--

CREATE TABLE `opinion` (
  `nombreUsuario` varchar(64) NOT NULL,
  `calificacion` int(11) NOT NULL,
  `comentario` varchar(256) NOT NULL,
  `idPiloto1` int(11) NOT NULL,
  `idPiloto2` int(11) NOT NULL,
  `idEscuderia` int(11) NOT NULL,
  `idMotor` int(11) NOT NULL,
  `idJefe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `opinion`
--

INSERT INTO `opinion` (`nombreUsuario`, `calificacion`, `comentario`, `idPiloto1`, `idPiloto2`, `idEscuderia`, `idMotor`, `idJefe`) VALUES
('Saul', 6, 'Equipo de mitad de tabla', 3, 4, 1, 4, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piloto`
--

CREATE TABLE `piloto` (
  `idPiloto` int(11) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `apellidos` varchar(128) NOT NULL,
  `campeonatos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `piloto`
--

INSERT INTO `piloto` (`idPiloto`, `nombre`, `apellidos`, `campeonatos`) VALUES
(1, 'Fernando', 'Alonso', 2),
(2, 'Lewis', 'Hamilton', 7),
(3, 'Max', 'Verstappen', 4),
(4, 'Yuki', 'Tsunoda', 0),
(5, 'Logan', 'Sargeant', 0),
(6, 'Alexander', 'Albon', 0),
(7, 'Guanyu', 'Zhou', 0),
(8, 'Valtteri', 'Bottas', 0),
(9, 'Charles', 'Leclerc', 0),
(10, 'Carlos', 'Sainz', 0),
(11, 'Daniel', 'Ricciardo', 0),
(12, 'Lance', 'Stroll', 0),
(13, 'Lando', 'Norris', 0),
(14, 'Oscar', 'Piastri', 0),
(15, 'Sergio', 'Perez', 0),
(16, 'Kevin', 'Magnussen', 0),
(17, 'Nico', 'Hulkenberg', 0),
(18, 'Pierre', 'Gasly', 0),
(19, 'Esteban', 'Ocon', 0),
(20, 'George', 'Russell', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `escuderia`
--
ALTER TABLE `escuderia`
  ADD PRIMARY KEY (`idEscuderia`);

--
-- Indices de la tabla `jefe_equipo`
--
ALTER TABLE `jefe_equipo`
  ADD PRIMARY KEY (`idJefe`);

--
-- Indices de la tabla `motor`
--
ALTER TABLE `motor`
  ADD PRIMARY KEY (`idMotor`);

--
-- Indices de la tabla `opinion`
--
ALTER TABLE `opinion`
  ADD KEY `fk_piloto1` (`idPiloto1`),
  ADD KEY `fk_piloto2` (`idPiloto2`),
  ADD KEY `fk_motor` (`idMotor`),
  ADD KEY `fk_escuderia` (`idEscuderia`),
  ADD KEY `fk_jefe` (`idJefe`);

--
-- Indices de la tabla `piloto`
--
ALTER TABLE `piloto`
  ADD PRIMARY KEY (`idPiloto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `escuderia`
--
ALTER TABLE `escuderia`
  MODIFY `idEscuderia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `jefe_equipo`
--
ALTER TABLE `jefe_equipo`
  MODIFY `idJefe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `motor`
--
ALTER TABLE `motor`
  MODIFY `idMotor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `piloto`
--
ALTER TABLE `piloto`
  MODIFY `idPiloto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `fk_escuderia` FOREIGN KEY (`idEscuderia`) REFERENCES `escuderia` (`idEscuderia`),
  ADD CONSTRAINT `fk_jefe` FOREIGN KEY (`idJefe`) REFERENCES `jefe_equipo` (`idJefe`),
  ADD CONSTRAINT `fk_motor` FOREIGN KEY (`idMotor`) REFERENCES `motor` (`idMotor`),
  ADD CONSTRAINT `fk_piloto1` FOREIGN KEY (`idPiloto1`) REFERENCES `piloto` (`idPiloto`),
  ADD CONSTRAINT `fk_piloto2` FOREIGN KEY (`idPiloto2`) REFERENCES `piloto` (`idPiloto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
