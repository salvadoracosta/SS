CREATE DATABASE `ss` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE ss;
CREATE TABLE `usuario` (
  `idusuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `hash` varchar(60) NOT NULL,
  `salt` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `institucion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `idusuario_UNIQUE` (`idusuario`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;