-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema runnerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `runnerdb` ;

-- -----------------------------------------------------
-- Schema runnerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `runnerdb` DEFAULT CHARACTER SET utf8 ;
USE `runnerdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `enabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `run`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `run` ;

CREATE TABLE IF NOT EXISTS `run` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `race_title` VARCHAR(200) NULL,
  `hours` INT UNSIGNED NULL,
  `minutes` INT UNSIGNED NULL,
  `seconds` INT UNSIGNED NULL,
  `location` VARCHAR(1000) NULL,
  `distance` DECIMAL(32) UNSIGNED NULL,
  `distance_unit` VARCHAR(100) NULL,
  `notes` VARCHAR(10000) NULL,
  `user_id` INT NOT NULL,
  `enabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_run_User_idx` (`user_id` ASC),
  CONSTRAINT `fk_run_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS runuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'runuser'@'localhost' IDENTIFIED BY 'runuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'runuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `runnerdb`;
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `enabled`) VALUES (1, 'ShalineRuns', 'run4Java', NULL, NULL, 1);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `enabled`) VALUES (2, 'JoeParker', 'lessCardio7', 'Joe', 'Parker', 1);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `enabled`) VALUES (3, 'negativeSplits', 'v02max', 'Amanda', 'Choo', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `run`
-- -----------------------------------------------------
START TRANSACTION;
USE `runnerdb`;
INSERT INTO `run` (`id`, `race_title`, `hours`, `minutes`, `seconds`, `location`, `distance`, `distance_unit`, `notes`, `user_id`, `enabled`) VALUES (1, 'Boston Marathon', 2, 41, 42, 'Boston Massachusetts', 26.2, 'miles', 'Boston is always my favorite race of the year.  Love my hometown.', 3, 1);
INSERT INTO `run` (`id`, `race_title`, `hours`, `minutes`, `seconds`, `location`, `distance`, `distance_unit`, `notes`, `user_id`, `enabled`) VALUES (2, NULL, 1, 2, 53, 'Neighborhood ', 5, 'miles', 'Shake out run after work', 2, 1);
INSERT INTO `run` (`id`, `race_title`, `hours`, `minutes`, `seconds`, `location`, `distance`, `distance_unit`, `notes`, `user_id`, `enabled`) VALUES (3, 'New York Marathon', 6, 47, 17, 'NY', 26.2, 'miles', 'My first marathon ever!  It was the best thing ever, even though it was the most painful thing ever!', 1, 1);
INSERT INTO `run` (`id`, `race_title`, `hours`, `minutes`, `seconds`, `location`, `distance`, `distance_unit`, `notes`, `user_id`, `enabled`) VALUES (4, NULL, 1, 5, 22, 'Metro Area', 3, 'miles', NULL, 3, 1);

COMMIT;

