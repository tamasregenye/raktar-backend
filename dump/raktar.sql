-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 15. 22:21
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
-- Adatbázis: `raktar_rendszer`
--
DROP DATABASE IF EXISTS raktar_rendszer_teszt;
CREATE DATABASE raktar_rendszer_teszt CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE raktar_rendszer_teszt;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoriak`
--

CREATE TABLE `kategoriak` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoriak`
--

INSERT INTO `kategoriak` (`id`, `nev`) VALUES
(1, 'Kéziszerszám'),
(2, 'Elektromos gép'),
(3, 'Munkavédelem'),
(4, 'Kertészet');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `partnerek`
--

CREATE TABLE `partnerek` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `varos` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `partnerek`
--

INSERT INTO `partnerek` (`id`, `nev`, `varos`) VALUES
(1, 'Barkács Nagyker', 'Budapest'),
(2, 'Építő Kft.', 'Szeged'),
(3, 'Profi Szerszám Kft.', 'Debrecen'),
(4, 'Lakossági Vevő', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `raktar_mozgasok`
--

CREATE TABLE `raktar_mozgasok` (
  `id` int(11) NOT NULL,
  `termek_id` int(11) DEFAULT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `mennyiseg` int(11) NOT NULL,
  `datum` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `raktar_mozgasok`
--

INSERT INTO `raktar_mozgasok` (`id`, `termek_id`, `partner_id`, `mennyiseg`, `datum`) VALUES
(1, 1, 1, 1, '2024-01-20 16:45:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `id` int(11) NOT NULL,
  `kategoria_id` int(11) DEFAULT NULL,
  `nev` varchar(100) NOT NULL,
  `egysegar` decimal(10,2) NOT NULL,
  `keszlet_db` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`id`, `kategoria_id`, `nev`, `egysegar`, `keszlet_db`) VALUES
(1, 1, 'Kalapács 500g', 3500.00, 25),
(2, 1, 'Csavarhúzó készlet', 5200.00, 15),
(3, 2, 'Fúrógép X100', 24990.00, 8),
(4, 2, 'Sarokcsiszoló', 18500.00, 4),
(5, 3, 'Védőszemüveg', 1200.00, 60),
(6, 3, 'Munkavédelmi kesztyű', 850.00, 120),
(7, 4, 'Metszőolló', 4200.00, 12),
(8, 4, 'Locsolótömlő 20m', 8900.00, 7),
(9, 1, 'Francia kulcs', 4800.00, 10),
(10, 2, 'Akkus csavarozó', 32000.00, 3);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `partnerek`
--
ALTER TABLE `partnerek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `raktar_mozgasok`
--
ALTER TABLE `raktar_mozgasok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `termek_id` (`termek_id`),
  ADD KEY `partner_id` (`partner_id`);

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoria_id` (`kategoria_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `partnerek`
--
ALTER TABLE `partnerek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `raktar_mozgasok`
--
ALTER TABLE `raktar_mozgasok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `raktar_mozgasok`
--
ALTER TABLE `raktar_mozgasok`
  ADD CONSTRAINT `raktar_mozgasok_ibfk_1` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`),
  ADD CONSTRAINT `raktar_mozgasok_ibfk_2` FOREIGN KEY (`partner_id`) REFERENCES `partnerek` (`id`);

--
-- Megkötések a táblához `termekek`
--
ALTER TABLE `termekek`
  ADD CONSTRAINT `termekek_ibfk_1` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
