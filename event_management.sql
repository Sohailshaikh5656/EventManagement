-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jul 29, 2025 at 06:30 PM
-- Server version: 10.6.19-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_event`
--

CREATE TABLE `tbl_event` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `location` varchar(128) NOT NULL,
  `capacity` bigint(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_event`
--

INSERT INTO `tbl_event` (`id`, `title`, `date_time`, `location`, `capacity`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'LJ University Event 1', '2025-08-01 23:34:00', 'Ahmedabad', 2, 1, 0, '2025-07-29 08:18:56', '2025-07-29 08:18:56'),
(2, 'LJ University Event 2', '2025-08-07 23:34:00', 'Ahmedabad', 20, 1, 0, '2025-07-29 10:27:56', '2025-07-29 10:27:56'),
(3, 'LJ University Event 3', '2025-08-07 23:34:00', 'Ahmedabad', 20, 1, 0, '2025-07-29 10:59:51', '2025-07-29 10:59:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_event_registration`
--

CREATE TABLE `tbl_event_registration` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `event_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_event_registration`
--

INSERT INTO `tbl_event_registration` (`id`, `user_id`, `event_id`, `created_at`, `is_active`, `is_deleted`, `updated_at`) VALUES
(1, 1, 1, '2025-07-29 08:19:07', 1, 0, '2025-07-29 08:19:07'),
(4, 3, 1, '2025-07-29 08:21:39', 1, 0, '2025-07-29 08:21:39'),
(5, 1, 2, '2025-07-29 10:28:14', 1, 0, '2025-07-29 10:28:14'),
(6, 3, 2, '2025-07-29 10:28:21', 1, 0, '2025-07-29 10:28:21'),
(7, 2, 2, '2025-07-29 10:28:25', 1, 0, '2025-07-29 10:28:25');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `name`, `email`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Sohail', 'shaikhsohail1131@gmail.com', 1, 0, '2025-07-29 07:25:26', '2025-07-29 07:25:26'),
(2, 'Anas', 'anas@gmail.com', 1, 0, '2025-07-29 08:11:51', '2025-07-29 08:11:51'),
(3, 'XYZ', 'xyz@gmail.com', 1, 0, '2025-07-29 08:12:10', '2025-07-29 08:12:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_event`
--
ALTER TABLE `tbl_event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_event_registration`
--
ALTER TABLE `tbl_event_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_event`
--
ALTER TABLE `tbl_event`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_event_registration`
--
ALTER TABLE `tbl_event_registration`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
