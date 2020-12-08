-- MySQL dump 10.17  Distrib 10.3.17-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: tips
-- ------------------------------------------------------
-- Server version	10.3.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `answer_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `problem_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` varchar(4096) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`answer_id`),
  KEY `created` (`created`),
  KEY `problem_id` (`problem_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`problem_id`),
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,1,1,'answer','reference','2020-12-09 05:15:31'),(2,1,2,'answer 2','reference 2','2020-12-09 05:15:31');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board` (
  `board_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`board_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'notice','notice'),(2,'free','free'),(3,'qna','qna');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `class_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `is_default` tinyint(1) NOT NULL DEFAULT 0 CHECK (`is_default` in (0,1)),
  `is_admin` tinyint(1) NOT NULL DEFAULT 0 CHECK (`is_admin` in (0,1)),
  `is_prime` tinyint(1) NOT NULL DEFAULT 0 CHECK (`is_prime` in (0,1)),
  PRIMARY KEY (`class_id`),
  UNIQUE KEY `name` (`name`),
  KEY `created` (`created`),
  KEY `is_default` (`is_default`),
  KEY `is_admin` (`is_admin`),
  KEY `is_prime` (`is_prime`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'default','default','2020-12-09 05:15:31',1,0,0),(2,'admin','admin','2020-12-09 05:15:31',0,1,0),(3,'prime','prime','2020-12-09 05:15:31',0,0,1);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_member`
--

DROP TABLE IF EXISTS `class_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_member` (
  `class_member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`class_member_id`),
  UNIQUE KEY `class_id` (`class_id`,`member_id`),
  KEY `created` (`created`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `class_member_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`),
  CONSTRAINT `class_member_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_member`
--

LOCK TABLES `class_member` WRITE;
/*!40000 ALTER TABLE `class_member` DISABLE KEYS */;
INSERT INTO `class_member` VALUES (1,1,1,'2020-12-09 05:15:31'),(2,2,1,'2020-12-09 05:15:31'),(3,1,2,'2020-12-09 05:15:31'),(4,3,2,'2020-12-09 05:15:31'),(5,1,3,'2020-12-09 05:15:31');
/*!40000 ALTER TABLE `class_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) NOT NULL,
  `problem_id` bigint(20) DEFAULT NULL,
  `answer_id` bigint(20) DEFAULT NULL,
  `document_id` bigint(20) DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`comment_id`),
  KEY `created` (`created`),
  KEY `parent_id` (`parent_id`),
  KEY `member_id` (`member_id`),
  KEY `problem_id` (`problem_id`),
  KEY `answer_id` (`answer_id`),
  KEY `document_id` (`document_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`problem_id`),
  CONSTRAINT `comment_ibfk_4` FOREIGN KEY (`answer_id`) REFERENCES `answer` (`answer_id`),
  CONSTRAINT `comment_ibfk_5` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,NULL,2,NULL,NULL,1,'comment','2020-12-09 05:15:31'),(2,1,1,NULL,NULL,1,'comment 2','2020-12-09 05:15:31');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `difficulty`
--

DROP TABLE IF EXISTS `difficulty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `difficulty` (
  `difficulty_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `problem_id` bigint(20) NOT NULL,
  `score` tinyint(1) NOT NULL CHECK (`score` >= 1 and `score` <= 5),
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`difficulty_id`),
  UNIQUE KEY `member_id` (`member_id`,`problem_id`),
  KEY `score` (`score`),
  KEY `created` (`created`),
  KEY `problem_id` (`problem_id`),
  CONSTRAINT `difficulty_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `difficulty_ibfk_2` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`problem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `difficulty`
--

LOCK TABLES `difficulty` WRITE;
/*!40000 ALTER TABLE `difficulty` DISABLE KEYS */;
INSERT INTO `difficulty` VALUES (1,1,1,4,'4 stars','2020-12-09 05:15:31'),(2,2,1,2,'2 stars','2020-12-09 05:15:31');
/*!40000 ALTER TABLE `difficulty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `document_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `board_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` varchar(4096) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`document_id`),
  KEY `title` (`title`),
  KEY `created` (`created`),
  KEY `board_id` (`board_id`),
  KEY `category_id` (`category_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `document_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `document_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `document_category` (`category_id`),
  CONSTRAINT `document_ibfk_3` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (1,1,1,1,'notice','notice','reference','2020-12-09 05:15:31'),(2,2,1,2,'free','free','reference','2020-12-09 05:15:31'),(3,3,1,2,'qna','qna','reference','2020-12-09 05:15:31');
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_category`
--

DROP TABLE IF EXISTS `document_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document_category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `board_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`),
  KEY `name` (`name`),
  KEY `parent_id` (`parent_id`),
  KEY `board_id` (`board_id`),
  CONSTRAINT `document_category_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `document_category` (`category_id`),
  CONSTRAINT `document_category_ibfk_2` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_category`
--

LOCK TABLES `document_category` WRITE;
/*!40000 ALTER TABLE `document_category` DISABLE KEYS */;
INSERT INTO `document_category` VALUES (1,NULL,1,'default','default'),(2,NULL,2,'default','default'),(3,NULL,3,'default','default');
/*!40000 ALTER TABLE `document_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `is_admin` tinyint(1) NOT NULL DEFAULT 0 CHECK (`is_admin` in (0,1)),
  `is_prime` tinyint(1) NOT NULL DEFAULT 0 CHECK (`is_prime` in (0,1)),
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`),
  KEY `created` (`created`),
  KEY `is_admin` (`is_admin`),
  KEY `is_prime` (`is_prime`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'admin','admin','admin@test.test','$2b$10$Yqae9guCSOF66IcMzAy2RuYmExWv9YLvYt3gRrrltV0J2OxLIeLP6','2020-12-09 05:15:31',1,0),(2,'test','test','test@test.test','$2b$10$8EFzwb3sIlAOOvRKikBSS./YJs8HBEoc1Ke9WfUZVjlN6mT5OKBYG','2020-12-09 05:15:31',0,1),(3,'test2','test2','test2@test.test','$2b$10$8EFzwb3sIlAOOvRKikBSS./YJs8HBEoc1Ke9WfUZVjlN6mT5OKBYG','2020-12-09 05:15:31',0,0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem`
--

DROP TABLE IF EXISTS `problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problem` (
  `problem_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_limit` smallint(6) NOT NULL DEFAULT 0,
  `reference` varchar(4096) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hint` varchar(4096) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`problem_id`),
  KEY `title` (`title`),
  KEY `time_limit` (`time_limit`),
  KEY `created` (`created`),
  KEY `category_id` (`category_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `problem_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `problem_category` (`category_id`),
  CONSTRAINT `problem_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
INSERT INTO `problem` VALUES (1,1,1,'problem','problem',30,'reference','hint','2020-12-09 05:15:31'),(2,1,1,'problem 2','problem 2',120,'reference 2','hint 2','2020-12-09 05:15:31');
/*!40000 ALTER TABLE `problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem_category`
--

DROP TABLE IF EXISTS `problem_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problem_category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`),
  KEY `name` (`name`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `problem_category_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `problem_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_category`
--

LOCK TABLES `problem_category` WRITE;
/*!40000 ALTER TABLE `problem_category` DISABLE KEYS */;
INSERT INTO `problem_category` VALUES (1,NULL,'os','os'),(2,NULL,'network','network');
/*!40000 ALTER TABLE `problem_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solve`
--

DROP TABLE IF EXISTS `solve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solve` (
  `solve_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `problem_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` smallint(6) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`solve_id`),
  KEY `duration` (`duration`),
  KEY `created` (`created`),
  KEY `problem_id` (`problem_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `solve_ibfk_1` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`problem_id`),
  CONSTRAINT `solve_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solve`
--

LOCK TABLES `solve` WRITE;
/*!40000 ALTER TABLE `solve` DISABLE KEYS */;
INSERT INTO `solve` VALUES (1,1,2,'solve',60,'2020-12-09 05:15:31'),(2,1,2,'solve 2',30,'2020-12-09 05:15:31');
/*!40000 ALTER TABLE `solve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vote` (
  `vote_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `problem_id` bigint(20) DEFAULT NULL,
  `answer_id` bigint(20) DEFAULT NULL,
  `document_id` bigint(20) DEFAULT NULL,
  `comment_id` bigint(20) DEFAULT NULL,
  `type` char(1) COLLATE utf8mb4_unicode_ci NOT NULL CHECK (`type` in ('u','d')),
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`vote_id`),
  UNIQUE KEY `member_id` (`member_id`,`problem_id`),
  UNIQUE KEY `member_id_2` (`member_id`,`answer_id`),
  UNIQUE KEY `member_id_3` (`member_id`,`document_id`),
  UNIQUE KEY `member_id_4` (`member_id`,`comment_id`),
  KEY `type` (`type`),
  KEY `created` (`created`),
  KEY `problem_id` (`problem_id`),
  KEY `answer_id` (`answer_id`),
  KEY `document_id` (`document_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `vote_ibfk_2` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`problem_id`),
  CONSTRAINT `vote_ibfk_3` FOREIGN KEY (`answer_id`) REFERENCES `answer` (`answer_id`),
  CONSTRAINT `vote_ibfk_4` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`),
  CONSTRAINT `vote_ibfk_5` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (1,1,1,NULL,NULL,NULL,'u','2020-12-09 05:15:31'),(2,1,NULL,2,NULL,NULL,'u','2020-12-09 05:15:31'),(3,2,NULL,NULL,1,NULL,'d','2020-12-09 05:15:31'),(4,2,NULL,NULL,NULL,2,'u','2020-12-09 05:15:31');
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-09  5:15:50
