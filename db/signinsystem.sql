/*
SQLyog Community v12.4.1 (64 bit)
MySQL - 5.7.17-log : Database - signinsystem
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`signinsystem` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `signinsystem`;

/*Table structure for table `signin` */

DROP TABLE IF EXISTS `signin`;

CREATE TABLE `signin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `signinid` varchar(100) DEFAULT NULL COMMENT '签到时用的业务id',
  `sno` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `signindate` datetime DEFAULT NULL COMMENT '签到时间',
  `signoutdate` datetime DEFAULT NULL COMMENT '签退时间',
  `onlinetime` varchar(50) DEFAULT NULL COMMENT '在线时长',
  `signintimes` int(11) DEFAULT NULL COMMENT '签到次数',
  `signstate` int(2) DEFAULT NULL COMMENT '签到状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*Data for the table `signin` */

insert  into `signin`(`id`,`signinid`,`sno`,`name`,`signindate`,`signoutdate`,`onlinetime`,`signintimes`,`signstate`) values 
(1,NULL,'2016115010120','田钦政','2018-03-29 21:43:18','2018-03-29 20:18:05','2',1,0),
(2,NULL,'2016115010119','周亮','2018-03-29 19:24:13','2018-03-14 19:24:15','2',1,0),
(3,NULL,'2016115010121','张三','2018-02-14 19:24:40','2018-03-08 19:24:44','2',1,0),
(8,'16f91f00-3485-11e8-8d8b-f77a22c4d3ba','2016115010120','田钦政','2018-03-31 09:44:48','2018-03-31 09:59:54','0天0小时15分6秒',1,0),
(9,'f004d270-3486-11e8-a189-7d3c8620f3e3','2016115010120','田钦政','2018-03-31 09:58:04','2018-03-31 09:58:09','0天0小时0分5秒',1,0),
(10,'ab1eefb0-348b-11e8-a0d5-edb09ad9d45f','2016115010120','田钦政','2018-03-31 10:34:12','2018-03-31 10:33:16','0天0小时0分6秒',1,1),
(11,'adec2e90-348d-11e8-8045-79591e495554','2016115010120','田钦政','2018-03-31 10:46:21','2018-03-31 10:48:00','0天0小时1分39秒',1,0),
(12,'f443d780-348d-11e8-8045-79591e495554','2016115010120','田钦政','2018-03-31 10:48:19','2018-03-31 10:51:16','0天0小时2分57秒',1,0),
(13,'760660d0-348e-11e8-8045-79591e495554','2016115010120','田钦政','2018-03-31 10:51:54','2018-03-31 10:51:58','0天0小时0分4秒',1,0),
(20,'b3a7bf80-34aa-11e8-888c-9da38b4f9398','2016115010120','田钦政','2018-03-31 14:14:09','2018-03-31 14:14:19','0天0小时0分10秒',1,0),
(30,'f26e6db0-34ad-11e8-9065-5f760b7ab48a','2016115010120','田钦政','2018-03-31 14:37:28','2018-03-31 14:37:37','0天0小时0分9秒',1,0),
(31,'705d32b0-34ae-11e8-9065-5f760b7ab48a','2016115010120','田钦政','2018-03-31 14:42:09','2018-03-31 14:42:14','0天0小时0分5秒',1,0),
(32,'cbf38c50-34ae-11e8-9065-5f760b7ab48a','2016115010119','周亮','2018-03-31 14:43:23','2018-03-31 14:43:45','0天0小时0分22秒',1,0),
(33,'c020db20-34af-11e8-9f1e-05701241cef2','2016115010119','周亮','2018-03-31 14:55:13','2018-03-31 14:56:45','0天0小时1分32秒',1,0),
(34,'d857c7c0-34b0-11e8-9f1e-05701241cef2','2016119060501','吴佩彦','2018-03-31 14:58:02','2018-03-31 14:58:08','0天0小时0分6秒',1,0);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sno` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `logindate` datetime DEFAULT '2018-01-01 00:00:00',
  `logintimes` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`sno`,`name`,`logindate`,`logintimes`) values 
(1,'2016115010120','田钦政','2018-03-31 14:40:45',73),
(2,'2016115010119','周亮','2018-03-31 14:50:08',4),
(3,'2016119060501','吴佩彦','2018-03-31 14:57:58',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
