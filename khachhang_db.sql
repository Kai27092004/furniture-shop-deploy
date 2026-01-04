-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: furniture_db
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Giường','Những mẫu giường ngủ êm ái, mang lại giấc ngủ ngon và tô điểm cho phòng ngủ.','2026-01-01 18:33:20','2026-01-01 18:33:20'),(2,'Tủ quần áo','Giải pháp lưu trữ thông minh với tủ quần áo, kệ sách, kệ trang trí.','2026-01-01 18:33:20','2026-01-01 18:33:20'),(3,'Bàn trang điểm','Các loại bàn trang điểm với thiết kế đa dạng.','2026-01-01 18:33:20','2026-01-01 18:33:20'),(4,'Sofa','Sofa băng, sofa góc cho phòng khách thêm sang trọng và ấm cúng.','2026-01-01 18:33:20','2026-01-01 18:33:20');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emaillogs`
--

DROP TABLE IF EXISTS `emaillogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emaillogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `recipientEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipientName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('sent','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sent',
  `errorMessage` text COLLATE utf8mb4_unicode_ci,
  `sentBy` int NOT NULL,
  `sentAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sentBy` (`sentBy`),
  KEY `idx_email_logs_user` (`userId`),
  KEY `idx_email_logs_status` (`status`),
  KEY `idx_email_logs_sent_at` (`sentAt`),
  CONSTRAINT `emaillogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `emaillogs_ibfk_2` FOREIGN KEY (`sentBy`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emaillogs`
--

LOCK TABLES `emaillogs` WRITE;
/*!40000 ALTER TABLE `emaillogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `emaillogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailtemplates`
--

DROP TABLE IF EXISTS `emailtemplates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailtemplates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailtemplates`
--

LOCK TABLES `emailtemplates` WRITE;
/*!40000 ALTER TABLE `emailtemplates` DISABLE KEYS */;
INSERT INTO `emailtemplates` VALUES (1,'Chào mừng khách hàng mới','Chào mừng bạn đến với Furniture Shop!','<h2>Xin chào {{customerName}}!</h2>\n<p>Chúng tôi rất vui mừng chào đón bạn đến với <strong>Furniture Shop</strong> - nơi cung cấp các sản phẩm nội thất chất lượng cao.</p>\n<p>Hãy khám phá bộ sưu tập đa dạng của chúng tôi và tìm kiếm những món đồ hoàn hảo cho ngôi nhà của bạn.</p>\n<p>Trân trọng,<br/>Đội ngũ Furniture Shop</p>','Mẫu email chào mừng khách hàng mới đăng ký','2026-01-01 18:33:20','2026-01-01 18:33:20'),(2,'Khuyến mãi đặc biệt','Ưu đãi đặc biệt dành cho bạn!','<h2>Chào {{customerName}}!</h2>\n<p>Chúng tôi có tin vui dành cho bạn! ?</p>\n<p><strong>GIẢM GIÁ LÊN ĐẾN 30%</strong> cho tất cả sản phẩm nội thất trong tháng này.</p>\n<p>Đừng bỏ lỡ cơ hội tuyệt vời này để làm mới không gian sống của bạn!</p>\n<p>Ghé thăm cửa hàng của chúng tôi ngay hôm nay.</p>\n<p>Trân trọng,<br/>Đội ngũ Furniture Shop</p>','Mẫu email thông báo khuyến mãi','2026-01-01 18:33:20','2026-01-01 18:33:20'),(3,'Cảm ơn đơn hàng','Cảm ơn bạn đã đặt hàng!','<h2>Xin chào {{customerName}}!</h2>\n<p>Cảm ơn bạn đã tin tưởng và đặt hàng tại <strong>Furniture Shop</strong>.</p>\n<p>Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến tận nơi.</p>\n<p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.</p>\n<p>Trân trọng,<br/>Đội ngũ Furniture Shop</p>','Mẫu email cảm ơn sau khi khách hàng đặt hàng','2026-01-01 18:33:20','2026-01-01 18:33:20');
/*!40000 ALTER TABLE `emailtemplates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=323 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (1,1,1,3,10000.00),(2,2,16,2,12500000.00),(3,2,1,1,10000.00),(4,2,10,3,750000.00),(5,2,15,3,2500000.00),(6,3,4,2,10000.00),(7,3,15,1,2500000.00),(8,3,13,2,7800000.00),(9,3,2,1,10000.00),(10,3,8,3,3800000.00),(11,4,12,3,2800000.00),(12,4,10,1,750000.00),(13,4,4,2,10000.00),(14,4,14,3,1850000.00),(15,4,1,1,10000.00),(16,5,15,3,2500000.00),(17,5,1,3,10000.00),(18,6,2,2,10000.00),(19,6,8,2,3800000.00),(20,6,9,2,4500000.00),(21,6,9,1,4500000.00),(22,7,9,2,4500000.00),(23,7,15,1,2500000.00),(24,7,5,2,1200000.00),(25,8,14,1,1850000.00),(26,8,11,1,3200000.00),(27,9,13,3,7800000.00),(28,9,2,2,10000.00),(29,10,12,2,2800000.00),(30,10,3,3,10000.00),(31,10,12,1,2800000.00),(32,10,6,2,6500000.00),(33,10,12,2,2800000.00),(34,11,13,2,7800000.00),(35,11,9,3,4500000.00),(36,11,11,2,3200000.00),(37,11,16,3,12500000.00),(38,11,14,3,1850000.00),(39,12,15,2,2500000.00),(40,12,6,3,6500000.00),(41,12,8,2,3800000.00),(42,12,3,1,10000.00),(43,13,5,3,1200000.00),(44,13,2,2,10000.00),(45,13,4,2,10000.00),(46,13,5,2,1200000.00),(47,14,2,2,10000.00),(48,14,12,2,2800000.00),(49,14,2,2,10000.00),(50,14,8,3,3800000.00),(51,15,11,2,3200000.00),(52,15,14,3,1850000.00),(53,16,12,2,2800000.00),(54,16,16,3,12500000.00),(55,17,10,1,750000.00),(56,17,11,3,3200000.00),(57,17,16,3,12500000.00),(58,17,7,2,2100000.00),(59,18,12,2,2800000.00),(60,18,13,3,7800000.00),(61,18,12,1,2800000.00),(62,18,3,2,10000.00),(63,19,9,1,4500000.00),(64,19,3,2,10000.00),(65,19,11,1,3200000.00),(66,19,5,1,1200000.00),(67,19,3,1,10000.00),(68,20,4,3,10000.00),(69,20,3,3,10000.00),(70,20,16,1,12500000.00),(71,20,13,2,7800000.00),(72,21,8,3,3800000.00),(73,21,6,2,6500000.00),(74,21,13,1,7800000.00),(75,21,10,3,750000.00),(76,21,12,1,2800000.00),(77,22,1,3,10000.00),(78,22,9,2,4500000.00),(79,22,14,3,1850000.00),(80,23,3,1,10000.00),(81,23,6,1,6500000.00),(82,23,3,1,10000.00),(83,23,4,3,10000.00),(84,23,16,2,12500000.00),(85,24,6,2,6500000.00),(86,24,4,1,10000.00),(87,24,5,3,1200000.00),(88,24,2,1,10000.00),(89,24,6,2,6500000.00),(90,25,8,1,3800000.00),(91,25,13,1,7800000.00),(92,25,4,1,10000.00),(93,25,11,1,3200000.00),(94,26,12,1,2800000.00),(95,27,11,2,3200000.00),(96,27,10,2,750000.00),(97,27,8,3,3800000.00),(98,27,2,3,10000.00),(99,27,13,2,7800000.00),(100,28,8,3,3800000.00),(101,29,5,1,1200000.00),(102,29,8,2,3800000.00),(103,30,3,1,10000.00),(104,31,16,1,12500000.00),(105,31,4,1,10000.00),(106,31,12,2,2800000.00),(107,31,13,3,7800000.00),(108,31,9,1,4500000.00),(109,32,14,2,1850000.00),(110,33,1,1,10000.00),(111,33,6,2,6500000.00),(112,33,7,2,2100000.00),(113,33,2,1,10000.00),(114,34,4,3,10000.00),(115,34,3,2,10000.00),(116,34,5,3,1200000.00),(117,35,8,3,3800000.00),(118,36,15,1,2500000.00),(119,37,13,3,7800000.00),(120,38,14,3,1850000.00),(121,39,2,1,10000.00),(122,39,7,2,2100000.00),(123,39,6,1,6500000.00),(124,40,6,2,6500000.00),(125,40,11,1,3200000.00),(126,40,9,3,4500000.00),(127,41,12,2,2800000.00),(128,41,9,1,4500000.00),(129,41,11,1,3200000.00),(130,41,8,1,3800000.00),(131,42,6,1,6500000.00),(132,42,7,1,2100000.00),(133,42,12,1,2800000.00),(134,43,14,3,1850000.00),(135,44,6,2,6500000.00),(136,44,12,1,2800000.00),(137,44,16,3,12500000.00),(138,44,16,2,12500000.00),(139,45,9,1,4500000.00),(140,46,5,2,1200000.00),(141,46,11,3,3200000.00),(142,46,9,3,4500000.00),(143,46,10,2,750000.00),(144,47,1,2,10000.00),(145,47,12,3,2800000.00),(146,48,3,3,10000.00),(147,48,5,3,1200000.00),(148,48,9,2,4500000.00),(149,48,9,3,4500000.00),(150,48,13,1,7800000.00),(151,49,8,2,3800000.00),(152,49,9,3,4500000.00),(153,49,4,1,10000.00),(154,49,16,2,12500000.00),(155,50,8,3,3800000.00),(156,50,7,1,2100000.00),(157,50,8,3,3800000.00),(158,51,4,2,10000.00),(159,51,5,1,1200000.00),(160,51,2,3,10000.00),(161,52,13,3,7800000.00),(162,52,3,1,10000.00),(163,53,12,1,2800000.00),(164,53,8,1,3800000.00),(165,53,16,2,12500000.00),(166,54,7,3,2100000.00),(167,54,9,3,4500000.00),(168,54,6,2,6500000.00),(169,54,1,3,10000.00),(170,54,1,3,10000.00),(171,55,15,3,2500000.00),(172,55,10,2,750000.00),(173,55,7,3,2100000.00),(174,55,12,1,2800000.00),(175,55,5,2,1200000.00),(176,56,2,1,10000.00),(177,56,12,3,2800000.00),(178,56,11,1,3200000.00),(179,57,16,1,12500000.00),(180,57,4,3,10000.00),(181,57,15,3,2500000.00),(182,57,9,1,4500000.00),(183,57,14,1,1850000.00),(184,58,15,2,2500000.00),(185,58,5,3,1200000.00),(186,58,8,1,3800000.00),(187,58,16,1,12500000.00),(188,58,9,1,4500000.00),(189,59,9,3,4500000.00),(190,59,14,2,1850000.00),(191,59,14,3,1850000.00),(192,59,6,2,6500000.00),(193,59,4,3,10000.00),(194,60,11,1,3200000.00),(195,60,16,1,12500000.00),(196,60,11,2,3200000.00),(197,60,13,3,7800000.00),(198,61,9,2,4500000.00),(199,62,8,3,3800000.00),(200,63,14,3,1850000.00),(201,63,3,1,10000.00),(202,63,9,2,4500000.00),(203,63,2,1,10000.00),(204,64,4,1,10000.00),(205,64,4,3,10000.00),(206,64,11,1,3200000.00),(207,64,2,3,10000.00),(208,65,3,2,10000.00),(209,65,10,1,750000.00),(210,65,14,3,1850000.00),(211,66,14,3,1850000.00),(212,66,15,2,2500000.00),(213,66,13,2,7800000.00),(214,66,2,3,10000.00),(215,66,4,2,10000.00),(216,67,9,2,4500000.00),(217,67,13,2,7800000.00),(218,67,8,2,3800000.00),(219,67,5,3,1200000.00),(220,68,6,2,6500000.00),(221,69,7,3,2100000.00),(222,69,13,2,7800000.00),(223,69,1,3,10000.00),(224,69,12,2,2800000.00),(225,70,2,2,10000.00),(226,70,1,3,10000.00),(227,70,16,2,12500000.00),(228,70,6,1,6500000.00),(229,71,15,2,2500000.00),(230,71,1,2,10000.00),(231,71,2,1,10000.00),(232,71,5,1,1200000.00),(233,72,4,2,10000.00),(234,72,1,1,10000.00),(235,72,5,1,1200000.00),(236,72,15,3,2500000.00),(237,72,6,3,6500000.00),(238,73,6,1,6500000.00),(239,73,9,2,4500000.00),(240,73,4,1,10000.00),(241,73,8,1,3800000.00),(242,73,1,1,10000.00),(243,74,5,1,1200000.00),(244,75,16,1,12500000.00),(245,75,11,3,3200000.00),(246,75,11,2,3200000.00),(247,76,4,2,10000.00),(248,76,16,2,12500000.00),(249,76,14,1,1850000.00),(250,76,7,2,2100000.00),(251,76,12,2,2800000.00),(252,77,11,3,3200000.00),(253,77,16,3,12500000.00),(254,77,3,2,10000.00),(255,77,7,3,2100000.00),(256,78,4,2,10000.00),(257,78,6,3,6500000.00),(258,78,10,1,750000.00),(259,78,15,1,2500000.00),(260,78,15,1,2500000.00),(261,79,11,1,3200000.00),(262,80,5,3,1200000.00),(263,81,6,1,6500000.00),(264,81,3,2,10000.00),(265,81,9,3,4500000.00),(266,82,16,1,12500000.00),(267,82,9,2,4500000.00),(268,82,8,3,3800000.00),(269,82,9,2,4500000.00),(270,83,10,1,750000.00),(271,83,8,2,3800000.00),(272,83,12,3,2800000.00),(273,84,3,3,10000.00),(274,84,12,1,2800000.00),(275,85,6,1,6500000.00),(276,85,7,2,2100000.00),(277,85,8,1,3800000.00),(278,85,2,2,10000.00),(279,86,16,1,12500000.00),(280,86,12,2,2800000.00),(281,86,13,1,7800000.00),(282,86,5,3,1200000.00),(283,86,2,2,10000.00),(284,87,8,2,3800000.00),(285,87,13,2,7800000.00),(286,88,4,1,10000.00),(287,88,1,1,10000.00),(288,88,7,3,2100000.00),(289,89,7,3,2100000.00),(290,90,1,3,10000.00),(291,90,13,2,7800000.00),(292,90,2,3,10000.00),(293,90,10,1,750000.00),(294,90,8,1,3800000.00),(295,91,3,1,10000.00),(296,92,14,3,1850000.00),(297,92,2,1,10000.00),(298,92,14,3,1850000.00),(299,92,13,3,7800000.00),(300,92,9,3,4500000.00),(301,93,12,2,2800000.00),(302,93,9,3,4500000.00),(303,94,13,2,7800000.00),(304,94,11,2,3200000.00),(305,94,7,2,2100000.00),(306,95,12,1,2800000.00),(307,95,3,3,10000.00),(308,95,15,2,2500000.00),(309,95,4,1,10000.00),(310,95,7,3,2100000.00),(311,96,7,2,2100000.00),(312,96,15,3,2500000.00),(313,96,12,2,2800000.00),(314,97,12,3,2800000.00),(315,97,5,2,1200000.00),(316,98,5,3,1200000.00),(317,98,14,3,1850000.00),(318,98,4,2,10000.00),(319,98,2,2,10000.00),(320,98,13,3,7800000.00),(321,99,12,1,2800000.00),(322,100,10,2,750000.00);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shippingAddress` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerNotes` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,6,30000.00,'pending','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 1','2025-06-19 18:33:20','2026-01-01 18:33:20'),(2,2,34760000.00,'shipped','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 2','2025-02-07 18:33:20','2026-01-01 18:33:20'),(3,4,29530000.00,'delivered','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 3','2025-12-28 18:33:20','2026-01-01 18:33:20'),(4,5,14730000.00,'cancelled','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 4','2025-02-20 18:33:20','2026-01-01 18:33:20'),(5,3,7530000.00,'cancelled','222 Lê Lợi, Quận Hải Châu, Đà Nẵng','Ghi chú tự động cho đơn hàng 5','2025-03-22 18:33:20','2026-01-01 18:33:20'),(6,5,21120000.00,'shipped','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 6','2025-03-22 18:33:20','2026-01-01 18:33:20'),(7,10,13900000.00,'delivered','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 7','2025-11-06 18:33:20','2026-01-01 18:33:20'),(8,7,5050000.00,'shipped','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 8','2025-09-07 18:33:20','2026-01-01 18:33:20'),(9,9,23420000.00,'cancelled','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 9','2025-12-18 18:33:20','2026-01-01 18:33:21'),(10,5,27030000.00,'pending','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 10','2025-04-29 18:33:21','2026-01-01 18:33:21'),(11,9,78550000.00,'shipped','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 11','2025-12-01 18:33:21','2026-01-01 18:33:21'),(12,9,32110000.00,'shipped','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 12','2025-03-16 18:33:21','2026-01-01 18:33:21'),(13,9,6040000.00,'delivered','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 13','2025-06-18 18:33:21','2026-01-01 18:33:21'),(14,10,17040000.00,'pending','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 14','2025-12-17 18:33:21','2026-01-01 18:33:21'),(15,6,11950000.00,'pending','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 15','2025-04-27 18:33:21','2026-01-01 18:33:21'),(16,4,43100000.00,'delivered','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 16','2025-01-27 18:33:21','2026-01-01 18:33:21'),(17,8,52050000.00,'delivered','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 17','2025-06-08 18:33:21','2026-01-01 18:33:21'),(18,8,31820000.00,'shipped','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 18','2025-04-17 18:33:21','2026-01-01 18:33:21'),(19,3,8930000.00,'shipped','222 Lê Lợi, Quận Hải Châu, Đà Nẵng','Ghi chú tự động cho đơn hàng 19','2025-02-19 18:33:21','2026-01-01 18:33:21'),(20,6,28160000.00,'pending','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 20','2025-03-18 18:33:21','2026-01-01 18:33:21'),(21,3,37250000.00,'processing','222 Lê Lợi, Quận Hải Châu, Đà Nẵng','Ghi chú tự động cho đơn hàng 21','2025-01-24 18:33:21','2026-01-01 18:33:21'),(22,10,14580000.00,'delivered','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 22','2025-06-29 18:33:21','2026-01-01 18:33:21'),(23,2,31550000.00,'pending','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 23','2025-07-19 18:33:21','2026-01-01 18:33:21'),(24,5,29620000.00,'delivered','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 24','2025-02-19 18:33:21','2026-01-01 18:33:21'),(25,4,14810000.00,'delivered','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 25','2025-01-11 18:33:21','2026-01-01 18:33:21'),(26,9,2800000.00,'shipped','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 26','2025-08-20 18:33:21','2026-01-01 18:33:21'),(27,8,34930000.00,'processing','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 27','2025-01-30 18:33:21','2026-01-01 18:33:21'),(28,2,11400000.00,'delivered','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 28','2025-07-18 18:33:21','2026-01-01 18:33:21'),(29,9,8800000.00,'delivered','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 29','2025-02-10 18:33:21','2026-01-01 18:33:21'),(30,2,10000.00,'delivered','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 30','2025-10-11 18:33:21','2026-01-01 18:33:21'),(31,8,46010000.00,'cancelled','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 31','2025-06-13 18:33:21','2026-01-01 18:33:21'),(32,7,3700000.00,'shipped','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 32','2025-01-05 18:33:21','2026-01-01 18:33:21'),(33,9,17220000.00,'pending','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 33','2025-07-21 18:33:21','2026-01-01 18:33:21'),(34,8,3650000.00,'cancelled','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 34','2025-05-02 18:33:21','2026-01-01 18:33:21'),(35,8,11400000.00,'delivered','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 35','2025-03-15 18:33:21','2026-01-01 18:33:21'),(36,7,2500000.00,'delivered','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 36','2025-02-16 18:33:21','2026-01-01 18:33:21'),(37,2,23400000.00,'cancelled','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 37','2025-11-18 18:33:21','2026-01-01 18:33:21'),(38,10,5550000.00,'cancelled','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 38','2025-10-16 18:33:21','2026-01-01 18:33:21'),(39,2,10710000.00,'shipped','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 39','2025-08-09 18:33:21','2026-01-01 18:33:21'),(40,2,29700000.00,'delivered','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 40','2025-09-08 18:33:21','2026-01-01 18:33:21'),(41,10,17100000.00,'cancelled','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 41','2025-10-03 18:33:21','2026-01-01 18:33:21'),(42,4,11400000.00,'cancelled','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 42','2025-08-09 18:33:21','2026-01-01 18:33:21'),(43,4,5550000.00,'cancelled','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 43','2025-12-31 18:33:21','2026-01-01 18:33:21'),(44,2,78300000.00,'cancelled','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 44','2025-04-18 18:33:21','2026-01-01 18:33:21'),(45,2,4500000.00,'processing','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 45','2025-08-07 18:33:21','2026-01-01 18:33:21'),(46,5,27000000.00,'processing','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 46','2025-09-16 18:33:21','2026-01-01 18:33:21'),(47,2,8420000.00,'delivered','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 47','2025-12-17 18:33:21','2026-01-01 18:33:21'),(48,7,33930000.00,'delivered','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 48','2025-03-13 18:33:21','2026-01-01 18:33:21'),(49,9,46110000.00,'processing','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 49','2025-02-18 18:33:21','2026-01-01 18:33:21'),(50,5,24900000.00,'delivered','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 50','2025-09-03 18:33:21','2026-01-01 18:33:21'),(51,2,1250000.00,'shipped','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 51','2025-10-29 18:33:21','2026-01-01 18:33:21'),(52,2,23410000.00,'cancelled','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 52','2025-01-10 18:33:21','2026-01-01 18:33:21'),(53,7,31600000.00,'processing','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 53','2025-10-04 18:33:21','2026-01-01 18:33:21'),(54,3,32860000.00,'pending','222 Lê Lợi, Quận Hải Châu, Đà Nẵng','Ghi chú tự động cho đơn hàng 54','2025-02-26 18:33:21','2026-01-01 18:33:21'),(55,7,20500000.00,'pending','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 55','2025-10-19 18:33:21','2026-01-01 18:33:21'),(56,10,11610000.00,'cancelled','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 56','2025-08-16 18:33:21','2026-01-01 18:33:21'),(57,8,26380000.00,'shipped','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 57','2025-09-25 18:33:21','2026-01-01 18:33:21'),(58,6,29400000.00,'shipped','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 58','2025-08-26 18:33:21','2026-01-01 18:33:21'),(59,10,35780000.00,'delivered','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 59','2025-12-15 18:33:21','2026-01-01 18:33:21'),(60,6,45500000.00,'cancelled','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 60','2025-09-04 18:33:21','2026-01-01 18:33:21'),(61,4,9000000.00,'delivered','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 61','2025-11-03 18:33:21','2026-01-01 18:33:21'),(62,7,11400000.00,'pending','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 62','2025-04-29 18:33:21','2026-01-01 18:33:21'),(63,4,14570000.00,'delivered','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 63','2025-09-01 18:33:21','2026-01-01 18:33:21'),(64,8,3270000.00,'shipped','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 64','2025-05-02 18:33:21','2026-01-01 18:33:21'),(65,2,6320000.00,'delivered','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 65','2025-09-13 18:33:21','2026-01-01 18:33:21'),(66,2,26200000.00,'processing','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 66','2025-11-14 18:33:21','2026-01-01 18:33:21'),(67,4,35800000.00,'pending','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 67','2025-12-16 18:33:21','2026-01-01 18:33:21'),(68,8,13000000.00,'delivered','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 68','2025-07-20 18:33:21','2026-01-01 18:33:21'),(69,10,27530000.00,'shipped','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 69','2025-08-05 18:33:21','2026-01-01 18:33:21'),(70,6,31550000.00,'delivered','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 70','2025-04-08 18:33:21','2026-01-01 18:33:21'),(71,6,6230000.00,'shipped','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 71','2025-03-18 18:33:21','2026-01-01 18:33:21'),(72,8,28230000.00,'shipped','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 72','2025-02-27 18:33:21','2026-01-01 18:33:21'),(73,6,19320000.00,'processing','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 73','2025-04-17 18:33:21','2026-01-01 18:33:21'),(74,4,1200000.00,'shipped','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 74','2025-04-14 18:33:21','2026-01-01 18:33:21'),(75,5,28500000.00,'pending','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 75','2025-05-27 18:33:21','2026-01-01 18:33:21'),(76,10,36670000.00,'delivered','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 76','2025-12-27 18:33:21','2026-01-01 18:33:21'),(77,3,53420000.00,'processing','222 Lê Lợi, Quận Hải Châu, Đà Nẵng','Ghi chú tự động cho đơn hàng 77','2025-08-20 18:33:21','2026-01-01 18:33:21'),(78,10,25270000.00,'processing','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 78','2025-09-16 18:33:21','2026-01-01 18:33:21'),(79,6,3200000.00,'delivered','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 79','2025-09-23 18:33:21','2026-01-01 18:33:21'),(80,5,3600000.00,'shipped','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 80','2025-06-16 18:33:21','2026-01-01 18:33:21'),(81,3,20020000.00,'delivered','222 Lê Lợi, Quận Hải Châu, Đà Nẵng','Ghi chú tự động cho đơn hàng 81','2025-07-09 18:33:21','2026-01-01 18:33:21'),(82,5,41900000.00,'delivered','444 Võ Văn Tần, Quận 3, TP.HCM','Ghi chú tự động cho đơn hàng 82','2025-08-25 18:33:21','2026-01-01 18:33:21'),(83,7,16750000.00,'processing','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 83','2025-04-20 18:33:21','2026-01-01 18:33:21'),(84,10,2830000.00,'pending','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 84','2025-07-07 18:33:21','2026-01-01 18:33:21'),(85,4,14520000.00,'pending','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 85','2025-03-03 18:33:21','2026-01-01 18:33:21'),(86,7,29520000.00,'processing','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 86','2025-03-29 18:33:21','2026-01-01 18:33:21'),(87,9,23200000.00,'pending','888 Hùng Vương, Quận 6, TP.HCM','Ghi chú tự động cho đơn hàng 87','2025-08-24 18:33:21','2026-01-01 18:33:21'),(88,4,6320000.00,'delivered','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 88','2025-10-24 18:33:21','2026-01-01 18:33:21'),(89,8,6300000.00,'processing','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','Ghi chú tự động cho đơn hàng 89','2025-01-23 18:33:21','2026-01-01 18:33:21'),(90,4,20210000.00,'delivered','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 90','2025-08-31 18:33:21','2026-01-01 18:33:21'),(91,7,10000.00,'delivered','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 91','2025-10-16 18:33:21','2026-01-01 18:33:21'),(92,7,48010000.00,'shipped','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','Ghi chú tự động cho đơn hàng 92','2025-07-25 18:33:21','2026-01-01 18:33:21'),(93,10,19100000.00,'shipped','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 93','2025-12-29 18:33:21','2026-01-01 18:33:21'),(94,4,26200000.00,'shipped','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 94','2025-03-13 18:33:21','2026-01-01 18:33:21'),(95,10,14140000.00,'pending','999 Quang Trung, Quận Gò Vấp, TP.HCM','Ghi chú tự động cho đơn hàng 95','2025-10-22 18:33:21','2026-01-01 18:33:21'),(96,6,17300000.00,'shipped','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','Ghi chú tự động cho đơn hàng 96','2025-01-12 18:33:21','2026-01-01 18:33:21'),(97,4,10800000.00,'pending','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 97','2025-09-19 18:33:21','2026-01-01 18:33:21'),(98,2,32590000.00,'cancelled','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','Ghi chú tự động cho đơn hàng 98','2025-03-29 18:33:21','2026-01-01 18:33:21'),(99,3,2800000.00,'delivered','222 Lê Lợi, Quận Hải Châu, Đà Nẵng','Ghi chú tự động cho đơn hàng 99','2025-12-08 18:33:21','2026-01-01 18:33:21'),(100,4,1500000.00,'pending','333 Trần Hưng Đạo, Quận 5, TP.HCM','Ghi chú tự động cho đơn hàng 100','2025-04-26 18:33:21','2026-01-01 18:33:21');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stockQuantity` int NOT NULL DEFAULT '0',
  `imageUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dimensions` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `material` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Giường Diệp Mộc','Giường Diệp Mộc mang lại thiết kế dịu mắt với màu xanh nhẹ nhàng, tạo nên không gian êm ái và dễ chịu cho phòng ngủ của bạn.',10000.00,8,'/upload/giuong-diep-moc.jpg','GIUONG-MDF-001','180cm x 200cm','Gỗ MDF',1,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(2,'Giường Vải Nhung','Giường Vải Nhung được thiết kế để mang đến sự kết hợp hoàn hảo giữa phong cách hiện đại tối giản và sự thoải mái tối đa.',10000.00,10,'/upload/giuong-nhung.jpg','GIUONG-KHUNG-GO-TU-NHIEN-002','140cm x 200cm','Vải nhung, khung gỗ tự nhiên',1,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(3,'Giường Da','Giường da được thiết kế để mang đến sự kết hợp hoàn hảo giữa chất liệu da PU cao cấp và phong cách hiện đại, mang lại sự thoải mái và đẳng cấp cho không gian sống của bạn.',10000.00,5,'/upload/giuong-da.jpg','GIUONG-KHUNG-GO-TU-NHIEN-003','180cm x 200cm','Vải da, khung gỗ tự nhiên',1,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(4,'Giường Gỗ MDF','Thiết kế giường hộp tối giản không chỉ tạo ra vẻ đẹp thanh lịch mà còn giải quyết vấn đề của việc rơi đồ cá nhân dưới giường, nhờ việc loại bỏ chân giường.',10000.00,12,'/upload/giuong-mdf.jpg','GIUONG-MDF-002','180cm x 200cm','Gỗ MDF',1,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(5,'Tủ Áo Diệp Mộc','Khung tủ được thiết kế với nhiều ngăn đa dạng, bao gồm hộc tủ, kệ, sào treo và hộc tủ có khóa, cung cấp giải pháp lưu trữ tối ưu cho quần áo và phụ kiện.',1200000.00,25,'/upload/tu-ao-diep-moc.jpg','TU-AO-001','160cm x 55cm x 200cm','Gỗ MDF phủ Melamine',2,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(6,'Tủ Áo Diệp Nhiên','Kích thước rộng rãi, cung cấp không gian lưu trữ rộng lớn, phù hợp với nhiều nhu cầu sử dụng. Màu sắc dịu nhẹ tạo nên sự hài hòa trong chính căn phòng của bạn.',6500000.00,12,'/upload/tu-ao-diep-nhien.jpg','TU-AO-002','160cm x 55cm x 200cm','Gỗ MDF lõi xanh chống ẩm',2,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(7,'Tủ Áo Cửa Lùa','Kích thước rộng rãi, cung cấp không gian lưu trữ rộng lớn, phù hợp với nhiều nhu cầu sử dụng.',2100000.00,20,'/upload/tu-ao-mdf.jpg','TU-AO-003','220cm x 55cm x 240cm','Gỗ MDF phủ Melamine',2,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(8,'Tủ Áo Gỗ MDF Phủ Sơn','Kích thước rộng rãi, cung cấp không gian lưu trữ rộng lớn, phù hợp với nhiều nhu cầu sử dụng.',3800000.00,15,'/upload/tu-ao-son.jpg','TU-AO-004','160cm x 55cm x 200cm','Gỗ MDF phủ sơn',2,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(9,'Bàn Trang Điểm Q1','Được làm từ vật liệu MDF chất lượng cao, với bề mặt phủ lớp melamine, chống trầy, ước, chống thấm nước, giúp dễ dàng vệ sinh và đảm bảo độ bền trong thời gian sử dụng.',4500000.00,15,'/upload/ban-trang-diem-q1.jpg','BAN-TRANG-DIEM-001','140cm x 40cm x 160cm','Gỗ MDF',3,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(10,'Bàn Trang Điểm Q2','Được làm từ vật liệu MDF chất lượng cao, với bề mặt phủ lớp melamine, chống trầy, ước, chống thấm nước, giúp dễ dàng vệ sinh và đảm bảo độ bền trong thời gian sử dụng.',750000.00,40,'/upload/ban-trang-diem-q2.jpg','BAN-TRANG-DIEM-002','140cm x 40cm x 160cm','Gỗ MDF',3,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(11,'Bàn Trang Điểm Q3','Được làm từ vật liệu MDF chất lượng cao, với bề mặt phủ lớp melamine, chống trầy, ước, chống thấm nước, giúp dễ dàng vệ sinh và đảm bảo độ bền trong thời gian sử dụng.',3200000.00,18,'/upload/ban-trang-diem-q3.jpg','BAN-TRANG-DIEM-003','140cm x 40cm x 160cm','Gỗ MDF phủ sơn',3,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(12,'Bàn Trang Điểm Q4','Được làm từ vật liệu MDF chất lượng cao, với bề mặt phủ lớp melamine, chống trầy, ước, chống thấm nước, giúp dễ dàng vệ sinh và đảm bảo độ bền trong thời gian sử dụng.',2800000.00,15,'/upload/ban-trang-diem-q4.jpg','BAN-TRANG-DIEM-004','140cm x 40cm x 160cm','Gỗ MDF phủ Melamine',3,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(13,'Sofa Ngọc Ngà','Vải thiết kế hiện đại, các đường nét mềm mại và tỉ mỉ, Sofa Ngọc Ngà mang đến sự hài hòa giữa tính thẩm mỹ và sự thoải mái',7800000.00,10,'/upload/sofa-ngoc-nga.jpg','SOFA-NI-001','220cm x 85cm x 80cm','Vải nỉ, Gỗ dầu, Mút D40',4,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(14,'Sofa Kết Nối','Vải kiểu dáng mô-đun, sofa có thể được sắp xếp theo nhiều cách khác nhau, phù hợp với mọi không gian sống, từ phong cách rộng rãi đến những căn hộ nhỏ,',1850000.00,20,'/upload/sofa-ket-noi.jpg','SOFA-NI-002','240cm x 85cm x 70cm','Khung gỗ tần bì, Nệm mousse',4,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(15,'Sofa Ôm Dịu','Vải thiết kế hiện đại pha chút nét mềm mại, sản phẩm này được tạo ra để trở thành trung tâm của mọi không gian sống.',2500000.00,18,'/upload/sofa-om-diu.jpg','SOFA-OM-DIU-001','200cm x 60cm x 60cm','Khung gỗ tần bì, Lò xo dạng ống',4,'2026-01-01 18:33:20','2026-01-01 18:33:20'),(16,'Sofa Bed','Sở hữu thiết kế thời thượng với các đường nét tinh gọn và màu sắc trung tính, dễ dàng kết hợp với nhiều cách nội thất khác nhau.',12500000.00,7,'/upload/sofa-bed.jpg','SOFA-DA-001','220cm x 85cm x 80cm','Da công nghiệp, Khung gỗ',4,'2026-01-01 18:33:20','2026-01-01 18:33:20');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `role` enum('customer','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `googleId` (`googleId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Quản Trị Viên','admin@email.com','$2a$12$78cga50NK6qxk35cpjwlKetU9VJvTUpI0UhfinwAQdSUH/QyO3itO',NULL,NULL,'0987654321','123 Đường Admin, Quận 1, TP.HCM','admin','2026-01-01 18:33:20','2026-01-01 18:33:20'),(2,'Nguyễn Văn An','nguyen.an@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0912345678','111 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội','customer','2026-01-01 18:33:20','2026-01-01 18:33:20'),(3,'Trần Thị Bích','tran.bich@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0923456789','222 Lê Lợi, Quận Hải Châu, Đà Nẵng','customer','2026-01-01 18:33:20','2026-01-01 18:33:20'),(4,'Lê Minh Cường','le.cuong@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0934567890','333 Trần Hưng Đạo, Quận 5, TP.HCM','customer','2026-01-01 18:33:20','2026-01-01 18:33:20'),(5,'Phạm Thị Dung','pham.dung@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0945678901','444 Võ Văn Tần, Quận 3, TP.HCM','customer','2026-01-01 18:33:20','2026-01-01 18:33:20'),(6,'Hoàng Văn Em','hoang.em@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0956789012','555 Cầu Giấy, Quận Cầu Giấy, Hà Nội','customer','2026-01-01 18:33:20','2026-01-01 18:33:20'),(7,'Võ Thị Giang','vo.giang@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0967890123','666 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','customer','2026-01-01 18:33:20','2026-01-01 18:33:20'),(8,'Đỗ Minh Hải','do.hai@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0978901234','777 Lý Thường Kiệt, Quận Tân Bình, TP.HCM','customer','2026-01-01 18:33:20','2026-01-01 18:33:20'),(9,'Bùi Thị Hạnh','bui.hanh@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0989012345','888 Hùng Vương, Quận 6, TP.HCM','customer','2026-01-01 18:33:20','2026-01-01 18:33:20'),(10,'Phan Văn Kiên','phan.kien@email.com','$2a$12$9NpdokzqzT5hBOCKYsfUNeCraPB.qJAM/SnC1iUhNb5WU.1tyX2Aq',NULL,NULL,'0901234567','999 Quang Trung, Quận Gò Vấp, TP.HCM','customer','2026-01-01 18:33:20','2026-01-01 18:33:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-04 15:52:44
