CREATE TABLE `felhasznalok` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `jelszo` VARCHAR(255) NOT NULL,
    `szerepkor` ENUM('user', 'admin') DEFAULT 'user',
    `nev` VARCHAR(100) NOT NULL,
    `aktiv` TINYINT(1) DEFAULT 1,
    `letrehozva` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `legutóbbi bejelentkezés` TIMESTAMP NULL DEFAULT NULL
);