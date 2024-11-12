-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 12. 19:35
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webbolt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablets`
--

CREATE TABLE `tablets` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `os` varchar(255) NOT NULL,
  `cpuSpeed` decimal(4,2) NOT NULL,
  `cores` int(11) NOT NULL,
  `screenSize` varchar(10) NOT NULL,
  `resolution` varchar(20) NOT NULL,
  `ram` varchar(10) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `popularity` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tablets`
--

INSERT INTO `tablets` (`id`, `name`, `os`, `cpuSpeed`, `cores`, `screenSize`, `resolution`, `ram`, `price`, `popularity`) VALUES
(13, 'Apple iPad 10.9 2022 64GB', 'Apple iPadOS', 3.00, 6, '10.9\"', '2360 x 1640', '4 GB', 152990.00, 0),
(14, 'Lenovo Yoga Tab 11 128GB', 'Android', 2.05, 8, '11\"', '2000 x 1200', '4 GB', 129990.00, 3),
(15, 'Samsung Galaxy Tab S6', 'Android', 2.84, 8, '10.5\"', '2560 x 1600', '6 GB', 219990.00, 2),
(16, 'Microsoft Surface Go 2', 'Windows', 1.70, 4, '10.5\"', '1920 x 1280', '4 GB', 179990.00, 4),
(17, 'Huawei MatePad 10.4', 'Android', 2.36, 8, '10.4\"', '2000 x 1200', '3 GB', 99990.00, 1),
(18, 'Xiaomi Pad 5', 'Android', 2.96, 8, '11\"', '2560 x 1600', '6 GB', 139990.00, 2);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tablets`
--
ALTER TABLE `tablets`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tablets`
--
ALTER TABLE `tablets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
