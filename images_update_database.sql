-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2019 at 04:07 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `images`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `deleteuser`
--

CREATE TABLE `deleteuser` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `deltime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `images_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `title`, `id_user`, `images_url`) VALUES
(1, 'Title 1', 1, 'c5c6b02ef1804c0c59dc1e1efc687ae2.jpg'),
(2, 'Title 2', 1, 'e684c6d13b8ca2b04d9e11e4e8e5e28a.jpg'),
(3, 'Title 3', 1, 'e09b7c8b21a15346f6e430ec44496b08.jpg'),
(4, 'Title 4', 1, '3e7f182d236277717a7353a84f7d4e48.jpg'),
(5, 'Title 5', 1, 'ee8b1fc9a5cf88323b3270830bf183cb.jpg'),
(6, 'Title 6', 1, '43df439fb1357240821ebb6d47b8990b.jpg'),
(7, 'Title 7', 1, '411db8349026ff7eef680e462c533def.jpg'),
(8, 'Title 8', 1, '599ef9394f94353eaa99841050a9d6e8.jpg'),
(9, 'Title 7', 1, 'a1fc9e240335ca7cfc35b3ad82b6f6aa.jpg'),
(10, 'Title 9', 1, '22c835920358a9f17839fc7a53355b4b.jpg'),
(11, 'Title 10', 1, 'f89aa17df7ca6562d0e5aac5a5c49a62.jpg'),
(12, 'Title 11', 1, 'a19d81e2aa7e7786c2701438688fb8ab.jpg'),
(13, 'Title 12', 1, 'bdfa843d6facc1628cf9e314eb549bc7.jpg'),
(14, 'Title 13', 1, '5940df8eb793c25823b384746a32f6d5.jpg'),
(15, 'Title 14', 1, 'bd370838122c6bb0f855616a84ada409.jpg'),
(16, 'Title 15', 1, '4d3f0f4fd7faf90db23567a3bd50938d.jpg'),
(17, 'Title 15', 2, '1bf670218fd8784f1f9d3913b53bc9d7.jpg'),
(18, 'Title 16', 2, '035674ffe7aba8e6b04b64bd2f6ee446.jpg'),
(19, 'Title 16', 2, 'cbbee864d242cd0887de2f714a4f3f09.jpg'),
(20, 'Title 17', 2, '42ada5b2df3616ddcaef804fcc73ab2d.jpg'),
(21, 'Title 18', 2, '85501ce0df8af016da2e20312c46b230.jpg'),
(22, 'Title 19', 2, '2a98d17c41d91924543960c928d35f88.jpg'),
(23, 'Title 20', 2, '069d0f6d8bbebd3065a0ec1e9fa364e3.jpg'),
(24, 'Title 25', 2, '1952159c6e6b1fd37d329d4ed72fcedf.jpg'),
(25, 'Title 2133', 2, '3dd49361a6fc92f004125c50a70bca2f.jpg'),
(26, 'Title 46465465', 2, 'ca41b4ea60edd838883b32fcd67d133a.jpg'),
(27, 'Title 6546464649', 2, '665aa97f55871cef99661b7528c7ba82.jpg'),
(28, 'Title 1161', 2, 'cbedd1869d01e2dc514052360a251e32.jpg'),
(29, 'Title 216516161611', 2, '5bf1fc87ec9cf71fea8a4d979a7cadf2.jpg'),
(30, 'Title 46546111', 2, '51e2a72d6329ad8e9191ebb5735ba5bc.jpg'),
(31, 'Title 2+62+2+2', 2, '50efb773f5ae4580be685c34a68e1600.jpg'),
(32, 'Title 61616161', 2, 'd3895690c1932a1c68c50ac449570278.jpg'),
(33, 'Title 64661616165', 2, 'b3906bdd78d7d4194cc51c6ac6507089.jpg'),
(34, 'Title 65496494419', 2, '1744a85d61f9f1bfeec3ff6f4b8915b9.jpg'),
(35, 'Title 646464', 2, 'bcac9241d42e531d33660f0e7ceffa4c.jpg'),
(36, 'Title 516165161', 2, 'f55adf7f7efc027e4d361efb3e655794.jpg'),
(37, 'Title 874949494984', 2, '90e0721bf043ae04e6b2717f8de5397f.jpg'),
(38, 'Title 6554656565665', 2, '5284811a65cbd4f3c0b5577fa500487c.jpg'),
(39, 'Title 4949499449', 2, 'f69f7cb836347abd6bb265df07c97e34.jpg'),
(40, '1665616', 2, '5e0375421d87f415487cf0884fe7f87d.jpg'),
(41, 'Title 216161616165', 2, 'fc47a800cd83057a86318df41bd97d1f.jpg'),
(42, 'Title 1654651619494', 2, 'e3d86da290fb676231ebd6ca1fb50338.jpg'),
(43, 'SELECT id FROM tablename ORDER BY id DESC LIMIT 1', 1, '4caa31918f478be6a9a3265dead12e63.jpg'),
(44, '1', 2, '363d1d994aa3af6cb7a4ce4badc2d8b0.jpg'),
(45, '1', 2, 'bd2bf4fe35ebee68a45879a6695af694.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `photos_any`
--

CREATE TABLE `photos_any` (
  `id` int(11) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `images_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos_any`
--

INSERT INTO `photos_any` (`id`, `title`, `images_url`) VALUES
(1, '555555', '2cb97f40ebeff5119ab916047db33b14.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `status_photos`
--

CREATE TABLE `status_photos` (
  `id` int(11) NOT NULL,
  `id_photo` int(11) DEFAULT NULL,
  `cmt` varchar(500) DEFAULT NULL,
  `likes` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `images_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `pass`, `images_url`) VALUES
(1, '16520479', 'onepiece.hung@outlook.com', '1', ''),
(2, 'admin', 'hungnguyenhuu@yandex.com', '1', ''),
(3, 'a2', 'a@a.com', '1', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deleteuser`
--
ALTER TABLE `deleteuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `photos_any`
--
ALTER TABLE `photos_any`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_photos`
--
ALTER TABLE `status_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_photo` (`id_photo`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `photos_any`
--
ALTER TABLE `photos_any`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `status_photos`
--
ALTER TABLE `status_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `status_photos`
--
ALTER TABLE `status_photos`
  ADD CONSTRAINT `status_photos_ibfk_1` FOREIGN KEY (`id_photo`) REFERENCES `photos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
