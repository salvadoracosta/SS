-- MySQL Script generated by MySQL Workbench
-- 09/29/14 18:24:16
-- Model: New Model    Version: 1.0
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `per_id` INT NOT NULL AUTO_INCREMENT,
  `per_nombre` VARCHAR(45) NULL,
  `per_proyecto` VARCHAR(45) NULL,
  `per_fecha` DATETIME NULL,
  `per_tipo` VARCHAR(10) NULL,
  `per_hash` VARCHAR(60) NOT NULL,
  `per_correo` VARCHAR(45) NOT NULL,
  `per_telefono` VARCHAR(45) NULL ,
  `per_institucion` VARCHAR(45) NULL ,
  PRIMARY KEY (`per_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Variables Independientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Variables Independientes` (
  `varind_id` INT NOT NULL AUTO_INCREMENT,
  `varind_descripcion JSON` VARCHAR(45) NULL,
  `varind_fecha` DATETIME NULL,
  PRIMARY KEY (`varind_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Funcion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Funcion` (
  `fun_id` INT NOT NULL AUTO_INCREMENT,
  `fun_tipo` INT NULL,
  `fun_val1` DOUBLE NULL,
  `fun_com1` VARCHAR(120) NULL,
  `fun_val2` DOUBLE NULL,
  `fun_com2` VARCHAR(120) NULL,
  `fun_val3` DOUBLE NULL,
  `fun_com3` VARCHAR(120) NULL,
  `fun_val4` DOUBLE NULL,
  `fun_com4` VARCHAR(120) NULL,
  `fun_val5` DOUBLE NULL,
  `fun_com5` VARCHAR(120) NULL,
  `fun_val6` DOUBLE NULL,
  `fun_com6` VARCHAR(120) NULL,
  `fun_val7` DOUBLE NULL,
  `fun_com7` VARCHAR(120) NULL,
  `fun_val8` DOUBLE NULL,
  `fun_com8` VARCHAR(120) NULL,
  `fun_val9` DOUBLE NULL,
  `fun_com9` VARCHAR(120) NULL,
  PRIMARY KEY (`fun_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Variable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Variable` (
  `var_id` INT NOT NULL AUTO_INCREMENT,
  `var_sigla` VARCHAR(1) NULL,
  `var_nombre` VARCHAR(45) NULL,
  `var_descripcion` TEXT NULL,
  `var_comentario` TEXT NULL,
  `var_fecha` DATETIME NULL,
  `var_funcion` INT NULL,
  PRIMARY KEY (`var_id`),
  INDEX `funcion_idx` (`var_funcion` ASC),
  CONSTRAINT `funcion`
    FOREIGN KEY (`var_funcion`)
    REFERENCES `mydb`.`Funcion` (`fun_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Proyecto` (
  `pro_id` INT NOT NULL AUTO_INCREMENT,
  `pro_sigla` VARCHAR(2) NULL,
  `pro_nombre` VARCHAR(45) NULL,
  `pro_autor` INT NULL,
  `pro_modulos` INT NULL,
  `pro_varind` INT NULL,
  `pro_var` INT NULL,
  PRIMARY KEY (`pro_id`),
  INDEX `autor_idx` (`pro_autor` ASC),
  INDEX `var_independiente_idx` (`pro_varind` ASC),
  INDEX `var_idx` (`pro_var` ASC),
  CONSTRAINT `autor`
    FOREIGN KEY (`pro_autor`)
    REFERENCES `mydb`.`Usuario` (`per_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `var_independiente`
    FOREIGN KEY (`pro_varind`)
    REFERENCES `mydb`.`Variables Independientes` (`varind_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `var`
    FOREIGN KEY (`pro_var`)
    REFERENCES `mydb`.`Variable` (`var_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Subcategoria` (
  `sub_id` INT NOT NULL AUTO_INCREMENT,
  `sub_nombre` VARCHAR(45) NULL,
  `sub_sigla` VARCHAR(45) NULL,
  `sub_valor` INT NULL,
  PRIMARY KEY (`sub_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Peso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Peso` (
  `peso_id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`peso_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Modulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Modulo` (
  `mod_id` INT NOT NULL AUTO_INCREMENT,
  `mod_var1` INT NULL,
  `mod_var2` INT NULL,
  `mod_var3` INT NULL,
  `mod_subcategoria` INT NULL,
  `mod_peso` INT NULL,
  `mod_peso2` INT NULL,
  `mod_peso3` INT NULL,
  PRIMARY KEY (`mod_id`),
  INDEX `subcategoria_idx` (`mod_subcategoria` ASC),
  INDEX `var1_idx` (`mod_var1` ASC),
  INDEX `peso1_idx` (`mod_peso` ASC),
  CONSTRAINT `subcategoria`
    FOREIGN KEY (`mod_subcategoria`)
    REFERENCES `mydb`.`Subcategoria` (`sub_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `var1`
    FOREIGN KEY (`mod_var1`)
    REFERENCES `mydb`.`Variable` (`var_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `peso1`
    FOREIGN KEY (`mod_peso`)
    REFERENCES `mydb`.`Peso` (`peso_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Subsistema`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Subsistema` (
  `sub_id` INT NOT NULL AUTO_INCREMENT,
  `sub_nombre` VARCHAR(45) NULL,
  `sub_sigla` VARCHAR(45) NULL,
  `sub_valor` VARCHAR(45) NULL,
  `sub_experto` INT NULL,
  `sub_modulo1` INT NULL,
  `sub_modulo2` INT NULL,
  `sub_modulo3` INT NULL,
  `sub_fecha` DATETIME NULL,
  PRIMARY KEY (`sub_id`),
  INDEX `modulo1_idx` (`sub_modulo1` ASC),
  INDEX `modulo2_idx` (`sub_modulo2` ASC),
  INDEX `modulo3_idx` (`sub_modulo3` ASC),
  CONSTRAINT `modulo1`
    FOREIGN KEY (`sub_modulo1`)
    REFERENCES `mydb`.`Modulo` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `modulo2`
    FOREIGN KEY (`sub_modulo2`)
    REFERENCES `mydb`.`Modulo` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `modulo3`
    FOREIGN KEY (`sub_modulo3`)
    REFERENCES `mydb`.`Modulo` (`mod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
