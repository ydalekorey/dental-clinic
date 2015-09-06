# --- !Ups

CREATE TABLE `account` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(64) NOT NULL,
	`password` CHAR(64) NOT NULL,
	`name` VARCHAR(64) NOT NULL,
	`role` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `email` (`email`)
)
ENGINE=InnoDB;

# --- !Downs

DROP TABLE `account`;