/* felhasználók tábla létrehozása */
-- TODO futtatni a teszt és rendes adatbázison is

CREATE TABLE felhasznalok (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    jelszo VARCHAR(255) NOT NULL,
    szerepkor ENUM('user', 'admin') DEFAULT 'user',
    nev VARCHAR(100) NOT NULL,
    aktiv TINYINT(1) DEFAULT(1),
    leterehozva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    legutobbi_bejelentkezes TIMESTAMP NULL DEFAULT NULL
);