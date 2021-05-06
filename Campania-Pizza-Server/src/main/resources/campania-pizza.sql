DROP DATABASE `campania-pizza`;

CREATE DATABASE `campania-pizza`;

USE `campania-pizza`;

CREATE TABLE `openiduser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `past_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ordered_at` timestamp DEFAULT NOW(),
  `location` varchar(45) DEFAULT NULL,
  `openiduser_id` int(11) DEFAULT NULL, 
  PRIMARY KEY (`id`),
  KEY `FK_OPENIDUSER_idx` (`openiduser_id`),
  CONSTRAINT `FK_OPENIDUSER` FOREIGN KEY (`openiduser_id`) 
  REFERENCES `openiduser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `pizza` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `past_order_id` int(11) DEFAULT NULL, 
  `type` varchar(45) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `crust` varchar(45) DEFAULT NULL,
  `sauce` varchar(45) DEFAULT NULL,
  `cheese` varchar(120) DEFAULT NULL,
  `veggies` varchar(200) DEFAULT NULL,
  `meats` varchar(120) DEFAULT NULL,
  `finishes` varchar(120) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PASTORDER_idx` (`past_order_id`),
  CONSTRAINT `FK_PASTORDER_1` FOREIGN KEY (`past_order_id`) 
  REFERENCES `past_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `salad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `past_order_id` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `greens` varchar(120) DEFAULT NULL,
  `cheese` varchar(120) DEFAULT NULL,
  `fresh_produce` varchar(200) DEFAULT NULL,
  `meats` varchar(120) DEFAULT NULL,
  `top_it_off` varchar(120) DEFAULT NULL,
  `dressings` varchar(120) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PASTORDER_idx` (`past_order_id`),
  CONSTRAINT `FK_PASTORDER_2` FOREIGN KEY (`past_order_id`) 
  REFERENCES `past_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `drink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `past_order_id` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PASTORDER_idx` (`past_order_id`),
  CONSTRAINT `FK_PASTORDER_3` FOREIGN KEY (`past_order_id`) 
  REFERENCES `past_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `dessert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `past_order_id` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `cookie_choice` varchar(45) DEFAULT NULL,
  `brownie_choice` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PASTORDER_idx` (`past_order_id`),
  CONSTRAINT `FK_PASTORDER_4` FOREIGN KEY (`past_order_id`) 
  REFERENCES `past_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
