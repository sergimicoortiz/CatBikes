-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: CatBikes
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add bike',6,'add_bike'),(22,'Can change bike',6,'change_bike'),(23,'Can delete bike',6,'delete_bike'),(24,'Can view bike',6,'view_bike'),(25,'Can add station',7,'add_station'),(26,'Can change station',7,'change_station'),(27,'Can delete station',7,'delete_station'),(28,'Can view station',7,'view_station'),(29,'Can add slot',8,'add_slot'),(30,'Can change slot',8,'change_slot'),(31,'Can delete slot',8,'delete_slot'),(32,'Can view slot',8,'view_slot'),(33,'Can add user',9,'add_user'),(34,'Can change user',9,'change_user'),(35,'Can delete user',9,'delete_user'),(36,'Can view user',9,'view_user'),(37,'Can add blacklist',10,'add_blacklist'),(38,'Can change blacklist',10,'change_blacklist'),(39,'Can delete blacklist',10,'delete_blacklist'),(40,'Can view blacklist',10,'view_blacklist'),(41,'Can add rent',11,'add_rent'),(42,'Can change rent',11,'change_rent'),(43,'Can delete rent',11,'delete_rent'),(44,'Can view rent',11,'view_rent'),(45,'Can add incident',12,'add_incident'),(46,'Can change incident',12,'change_incident'),(47,'Can delete incident',12,'delete_incident'),(48,'Can view incident',12,'view_incident'),(49,'Can add notification',13,'add_notification'),(50,'Can change notification',13,'change_notification'),(51,'Can delete notification',13,'delete_notification'),(52,'Can view notification',13,'view_notification');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blacklist_blacklist`
--

DROP TABLE IF EXISTS `blacklist_blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklist_blacklist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(254) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blacklist_blacklist`
--

LOCK TABLES `blacklist_blacklist` WRITE;
/*!40000 ALTER TABLE `blacklist_blacklist` DISABLE KEYS */;
INSERT INTO `blacklist_blacklist` VALUES (2,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFzZGFzZGFzZCIsImV4cCI6MTY3NjY0NjIzMn0.4c8zqhRcK5be25MfLKLeY4Fj62yMq0fmNjAgt_OkEVQ'),(1,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFzZGFzZGFzZCIsImV4cCI6MTY3NjY0NTYzMX0.DTHjosp8J03vxBVXc7kJ4bksPebFcV6xdZYJQcxy9ZQ');
/*!40000 ALTER TABLE `blacklist_blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(10,'blacklist','blacklist'),(4,'contenttypes','contenttype'),(12,'incidents','incident'),(13,'incidents','notification'),(11,'rent','rent'),(5,'sessions','session'),(6,'stations','bike'),(8,'stations','slot'),(7,'stations','station'),(9,'user','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-02-17 14:20:48.314054'),(2,'contenttypes','0002_remove_content_type_name','2023-02-17 14:20:48.404253'),(3,'auth','0001_initial','2023-02-17 14:20:48.809992'),(4,'auth','0002_alter_permission_name_max_length','2023-02-17 14:20:48.889169'),(5,'auth','0003_alter_user_email_max_length','2023-02-17 14:20:48.907712'),(6,'auth','0004_alter_user_username_opts','2023-02-17 14:20:48.925128'),(7,'auth','0005_alter_user_last_login_null','2023-02-17 14:20:48.943869'),(8,'auth','0006_require_contenttypes_0002','2023-02-17 14:20:48.951178'),(9,'auth','0007_alter_validators_add_error_messages','2023-02-17 14:20:48.968668'),(10,'auth','0008_alter_user_username_max_length','2023-02-17 14:20:48.990022'),(11,'auth','0009_alter_user_last_name_max_length','2023-02-17 14:20:49.007103'),(12,'auth','0010_alter_group_name_max_length','2023-02-17 14:20:49.043295'),(13,'auth','0011_update_proxy_permissions','2023-02-17 14:20:49.060545'),(14,'auth','0012_alter_user_first_name_max_length','2023-02-17 14:20:49.078166'),(15,'user','0001_initial','2023-02-17 14:20:49.547434'),(16,'admin','0001_initial','2023-02-17 14:20:49.730529'),(17,'admin','0002_logentry_remove_auto_add','2023-02-17 14:20:49.759245'),(18,'admin','0003_logentry_add_action_flag_choices','2023-02-17 14:20:49.786283'),(19,'blacklist','0001_initial','2023-02-17 14:20:49.822422'),(20,'stations','0001_initial','2023-02-17 14:20:50.054463'),(21,'incidents','0001_initial','2023-02-17 14:20:50.178530'),(22,'incidents','0002_initial','2023-02-17 14:20:50.510041'),(23,'rent','0001_initial','2023-02-17 14:20:50.830547'),(24,'rent','0002_initial','2023-02-17 14:20:50.970574'),(25,'sessions','0001_initial','2023-02-17 14:20:51.031299');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidents_incident`
--

DROP TABLE IF EXISTS `incidents_incident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidents_incident` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `body` varchar(300) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `modified_at` datetime(6) NOT NULL,
  `slot_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `incidents_incident_modified_at_dedf2cef` (`modified_at`),
  KEY `incidents_incident_slot_id_2ae57628_fk_stations_slot_id` (`slot_id`),
  KEY `incidents_incident_user_id_d45fd8f9_fk_user_user_id` (`user_id`),
  CONSTRAINT `incidents_incident_slot_id_2ae57628_fk_stations_slot_id` FOREIGN KEY (`slot_id`) REFERENCES `stations_slot` (`id`),
  CONSTRAINT `incidents_incident_user_id_d45fd8f9_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidents_incident`
--

LOCK TABLES `incidents_incident` WRITE;
/*!40000 ALTER TABLE `incidents_incident` DISABLE KEYS */;
/*!40000 ALTER TABLE `incidents_incident` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `incidents_incident_AU` AFTER UPDATE ON `incidents_incident` FOR EACH ROW BEGIN
IF NEW.status = 'in_progress' THEN
INSERT INTO incidents_notification (body, user_id, seen, created_at, modified_at) VALUES (CONCAT('The incidence: ', OLD.slug, ' is in progress.'), OLD.user_id, FALSE, NOW(), NOW());
END IF;
IF NEW.status = 'resolved' THEN INSERT INTO incidents_notification (body, user_id, seen, created_at, modified_at) VALUES 
(CONCAT('The incidence: ', OLD.slug, ' is resolved.'), OLD.user_id, FALSE, NOW(), NOW());
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `incidents_notification`
--

DROP TABLE IF EXISTS `incidents_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidents_notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `seen` tinyint(1) NOT NULL,
  `body` varchar(300) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `modified_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `incidents_notification_modified_at_fd71004e` (`modified_at`),
  KEY `incidents_notification_user_id_640b50dc_fk_user_user_id` (`user_id`),
  CONSTRAINT `incidents_notification_user_id_640b50dc_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidents_notification`
--

LOCK TABLES `incidents_notification` WRITE;
/*!40000 ALTER TABLE `incidents_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `incidents_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rent_rent`
--

DROP TABLE IF EXISTS `rent_rent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rent_rent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_date` datetime(6) NOT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `bike_id` bigint NOT NULL,
  `end_slot_id` bigint DEFAULT NULL,
  `start_slot_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rent_rent_bike_id_4ecb3af0_fk_stations_bike_id` (`bike_id`),
  KEY `rent_rent_end_slot_id_e6928abe_fk_stations_slot_id` (`end_slot_id`),
  KEY `rent_rent_start_slot_id_75e1b348_fk_stations_slot_id` (`start_slot_id`),
  KEY `rent_rent_user_id_07f92b1b_fk_user_user_id` (`user_id`),
  CONSTRAINT `rent_rent_bike_id_4ecb3af0_fk_stations_bike_id` FOREIGN KEY (`bike_id`) REFERENCES `stations_bike` (`id`),
  CONSTRAINT `rent_rent_end_slot_id_e6928abe_fk_stations_slot_id` FOREIGN KEY (`end_slot_id`) REFERENCES `stations_slot` (`id`),
  CONSTRAINT `rent_rent_start_slot_id_75e1b348_fk_stations_slot_id` FOREIGN KEY (`start_slot_id`) REFERENCES `stations_slot` (`id`),
  CONSTRAINT `rent_rent_user_id_07f92b1b_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rent_rent`
--

LOCK TABLES `rent_rent` WRITE;
/*!40000 ALTER TABLE `rent_rent` DISABLE KEYS */;
/*!40000 ALTER TABLE `rent_rent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations_bike`
--

DROP TABLE IF EXISTS `stations_bike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations_bike` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations_bike`
--

LOCK TABLES `stations_bike` WRITE;
/*!40000 ALTER TABLE `stations_bike` DISABLE KEYS */;
INSERT INTO `stations_bike` VALUES (1,'william-scott-58kbks','William Scott','used'),(2,'chase-holmes-lo69mt','Chase Holmes','used'),(3,'jonathan-taylor-79kqw1','Jonathan Taylor','unused'),(4,'richard-johnson-k8pjtw','Richard Johnson','used'),(5,'ryan-silva-t5suer','Ryan Silva','used'),(6,'sara-white-auotwa','Sara White','used'),(7,'austin-johnson-b200ph','Austin Johnson','unused'),(8,'katelyn-shepard-22ao86','Katelyn Shepard','used'),(9,'dennis-black-qmdjzo','Dennis Black','used'),(10,'mr-joshua-alexander-vyhdtu','Mr. Joshua Alexander','used'),(11,'anthony-bishop-0loong','Anthony Bishop','used'),(12,'erik-henderson-v76cjk','Erik Henderson','used'),(13,'david-martin-vke76t','David Martin','used'),(14,'andre-lara-h3ur03','Andre Lara','used'),(15,'brenda-nixon-md-6owz72','Brenda Nixon MD','used'),(16,'rebecca-fernandez-z5r87f','Rebecca Fernandez','used'),(17,'rachel-russell-a6vp03','Rachel Russell','used'),(18,'craig-arellano-yyo303','Craig Arellano','unused'),(19,'laurie-moore-xz9twe','Laurie Moore','unused'),(20,'ryan-horton-qpif7j','Ryan Horton','used'),(21,'jennifer-green-7lhai1','Jennifer Green','unused'),(22,'kathryn-knight-hpyghi','Kathryn Knight','used'),(23,'nicholas-wilkins-uhored','Nicholas Wilkins','used'),(24,'stephanie-smith-ehrzr2','Stephanie Smith','unused'),(25,'johnny-ramirez-1pqft6','Johnny Ramirez','used'),(26,'daniel-lamb-736awo','Daniel Lamb','used'),(27,'joseph-dudley-ti3ybu','Joseph Dudley','used'),(28,'eric-berry-x885e7','Eric Berry','used'),(29,'alexandra-romero-7uuugi','Alexandra Romero','used'),(30,'hunter-lambert-35660k','Hunter Lambert','unused'),(31,'kaitlyn-foster-qn7r90','Kaitlyn Foster','unused'),(32,'matthew-singleton-e9e0a7','Matthew Singleton','unused'),(33,'susan-marquez-6rhple','Susan Marquez','unused'),(34,'christopher-young-833ijp','Christopher Young','used'),(35,'caroline-clark-93ri2j','Caroline Clark','used'),(36,'jean-kemp-hgbt63','Jean Kemp','unused'),(37,'charles-zuniga-5xs9tc','Charles Zuniga','used'),(38,'audrey-king-aw9a5j','Audrey King','used'),(39,'deborah-sanchez-s97a0j','Deborah Sanchez','used'),(40,'ronald-reyes-97ceis','Ronald Reyes','used'),(41,'lawrence-stein-x6eep6','Lawrence Stein','used'),(42,'billy-edwards-jofsnk','Billy Edwards','unused'),(43,'kenneth-james-0jijtr','Kenneth James','unused'),(44,'jesse-nicholson-s3jskh','Jesse Nicholson','used'),(45,'charles-parker-qz9y3z','Charles Parker','used'),(46,'carol-west-uhgoj1','Carol West','unused'),(47,'krista-deleon-2elit0','Krista Deleon','unused'),(48,'kelly-duncan-413b95','Kelly Duncan','used'),(49,'valerie-walters-03p2sl','Valerie Walters','used'),(50,'victoria-delgado-q6r6hh','Victoria Delgado','used');
/*!40000 ALTER TABLE `stations_bike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations_slot`
--

DROP TABLE IF EXISTS `stations_slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations_slot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(200) NOT NULL,
  `bike_id` bigint DEFAULT NULL,
  `station_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bike_id` (`bike_id`),
  KEY `stations_slot_station_id_5681ed9a_fk_stations_station_id` (`station_id`),
  CONSTRAINT `stations_slot_bike_id_ff035efc_fk_stations_bike_id` FOREIGN KEY (`bike_id`) REFERENCES `stations_bike` (`id`),
  CONSTRAINT `stations_slot_station_id_5681ed9a_fk_stations_station_id` FOREIGN KEY (`station_id`) REFERENCES `stations_station` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations_slot`
--

LOCK TABLES `stations_slot` WRITE;
/*!40000 ALTER TABLE `stations_slot` DISABLE KEYS */;
INSERT INTO `stations_slot` VALUES (1,'unused',NULL,1),(2,'used',30,1),(3,'used',18,1),(4,'unused',NULL,1),(5,'used',47,1),(6,'used',19,2),(7,'unused',NULL,2),(8,'used',42,2),(9,'unused',NULL,2),(10,'used',31,2),(11,'used',21,3),(12,'used',24,3),(13,'unused',NULL,3),(14,'used',3,3),(15,'used',32,3),(16,'used',7,4),(17,'unused',NULL,4),(18,'used',33,4),(19,'unused',NULL,4),(20,'unused',NULL,4),(21,'unused',NULL,5),(22,'used',36,5),(23,'used',43,5),(24,'used',46,5),(25,'unused',NULL,5);
/*!40000 ALTER TABLE `stations_slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations_station`
--

DROP TABLE IF EXISTS `stations_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations_station` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations_station`
--

LOCK TABLES `stations_station` WRITE;
/*!40000 ALTER TABLE `stations_station` DISABLE KEYS */;
INSERT INTO `stations_station` VALUES (1,'William Lewis','william-lewis-96swlh','active','https://la.network/wp-content/uploads/2017/10/mendoza-bicis.jpg',-0.6128461616181847,38.8166251126952),(2,'Brandon Martin','brandon-martin-m706xt','active','http://www.gacetadelmeridiano.com/images/fotografias_noticias/unuso2/El_Pinar-kit_bici4.jpg',-0.6073548517174,38.8215600315058),(3,'Anita Pitts','anita-pitts-r6u9rl','active','https://imagenes.bikezona.com/imagenes/bike/noticias/strava-mostrara-informacion-mas-71-0004543.jpg',-0.5950006972078369,38.82388500859232),(4,'John Webster','john-webster-h7ent4','active','https://www.palma.cat/portal/PALMA/RecursosWeb/IMAGENES/1/0_101657_1.jpg',-0.6064376578528998,38.81776717196601),(5,'Julie Washington','julie-washington-4pu670','active','https://www.godoycruz.gob.ar/wp-content/uploads/2018/03/estacion-bici2.jpg',-0.598542653224862,38.81630724035015);
/*!40000 ALTER TABLE `stations_station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user`
--

DROP TABLE IF EXISTS `user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `types` varchar(10) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `countTokens` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user`
--

LOCK TABLES `user_user` WRITE;
/*!40000 ALTER TABLE `user_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_groups`
--

DROP TABLE IF EXISTS `user_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_groups_user_id_group_id_bb60391f_uniq` (`user_id`,`group_id`),
  KEY `user_user_groups_group_id_c57f13c0_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_user_groups_group_id_c57f13c0_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_user_groups_user_id_13f9a20d_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_groups`
--

LOCK TABLES `user_user_groups` WRITE;
/*!40000 ALTER TABLE `user_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_user_permissions`
--

DROP TABLE IF EXISTS `user_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_user_permissions_user_id_permission_id_64f4d5b8_uniq` (`user_id`,`permission_id`),
  KEY `user_user_user_permi_permission_id_ce49d4de_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_user_user_permi_permission_id_ce49d4de_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `user_user_user_permissions_user_id_31782f58_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_user_permissions`
--

LOCK TABLES `user_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `user_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 15:35:46
