DROP DATABASE  IF EXISTS `spring_security_demo_plaintext`;

CREATE DATABASE  IF NOT EXISTS `spring_security_demo_plaintext`;
USE `spring_security_demo_plaintext`;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `users`
--

INSERT INTO `users` 
VALUES 
('john','{noop}test123',1),
('mary','{noop}test123',1),
('susan','{noop}test123',1);


--
-- Table structure for table `authorities`
--

DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL,
  UNIQUE KEY `authorities_idx_1` (`username`,`authority`),
  CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `authorities`
--

INSERT INTO `authorities` 
VALUES 
('john','ROLE_EMPLOYEE'),
('mary','ROLE_EMPLOYEE'),
('mary','ROLE_MANAGER'),
('susan','ROLE_EMPLOYEE'),
('susan','ROLE_ADMIN');


DROP TABLE IF EXISTS `sauces`;
CREATE TABLE `sauces` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `cheeses`;
CREATE TABLE `cheeses` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `veggies`;
CREATE TABLE `veggies` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `meats`;
CREATE TABLE `meats` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS `build_your_owns`;
CREATE TABLE `build_your_owns` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `size` varchar(50) NOT NULL,
  `crust` varchar(50) NOT NULL,
  `sauces_id` int(11) DEFAULT NULL,
  `cheeses_id` int(11) DEFAULT NULL,
  `veggies_id` int(11) DEFAULT NULL,
  `meats_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sauces_idx` (`sauces_id`),
  CONSTRAINT `sauces` FOREIGN KEY (`sauces_id`) 
  REFERENCES `sauces` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
   
   KEY `cheeses_idx` (`cheeses_id`),
  CONSTRAINT `cheeses` FOREIGN KEY (`cheeses_id`) 
  REFERENCES `cheeses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
   
   KEY `veggies_idx` (`veggies_id`),
  CONSTRAINT `veggies` FOREIGN KEY (`veggies_id`) 
  REFERENCES `veggies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  
  KEY `meats_idx` (`meats_id`),
  CONSTRAINT `meats` FOREIGN KEY (`meats_id`) 
  REFERENCES `meats` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `specialty_pizzas`;
CREATE TABLE `specialty_pizzas` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `salads`;
CREATE TABLE `salads` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `desserts`;
CREATE TABLE `desserts` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `drinks`;
CREATE TABLE `drinks` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `build_your_owns_id` int(11) DEFAULT NULL,
  `specialty_pizzas_id` int(11) DEFAULT NULL,
  `salads_id` int(11) DEFAULT NULL,
  `desserts_id` int(11) DEFAULT NULL,
  `drinks_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `byos_idx` (`build_your_owns_id`),
  CONSTRAINT `byos` FOREIGN KEY (`build_your_owns_id`) 
  REFERENCES `build_your_owns` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  
   KEY `specialties_idx` (`specialty_pizzas_id`),
  CONSTRAINT `specialties` FOREIGN KEY (`specialty_pizzas_id`) 
  REFERENCES `specialty_pizzas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  
   KEY `salads_idx` (`salads_id`),
  CONSTRAINT `salads` FOREIGN KEY (`salads_id`) 
  REFERENCES `salads` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  
   KEY `desserts_idx` (`desserts_id`),
  CONSTRAINT `desserts` FOREIGN KEY (`desserts_id`) 
  REFERENCES `desserts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  
   KEY `drinks_idx` (`drinks_id`),
  CONSTRAINT `drinks` FOREIGN KEY (`drinks_id`) 
  REFERENCES `drinks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;