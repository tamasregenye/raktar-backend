
/* 1. Listázd ki az összes terméket a termékek táblából. */
SELECT * FROM termekek;

/* 2. Listázd ki az összes felhasználó nevét, szerepkörét és fiókja létrehozásának dátumát a felhasznalok táblából. */
SELECT nev, szerepkor, letrehozva FROM felhasznalok;

/* 3. Listázd ki az termekek táblából a termék nevét és hivatkozz erre a mezőre termekNev névvel (alias). */
SELECT nev AS termekNev FROM termekek;

/* 4. Listázd ki az összes Debreceni partnert a partnerek táblából. */
SELECT * FROM partnerek WHERE varos = 'Debrecen';

/* 5. Vegyél fel egy új kategóriát a kategoriak táblába "Kéziszerszámok" néven. */
INSERT INTO kategoriak (nev) VALUES ('Kéziszerszámok');

/* 6. Vegyél fel egy új felhasználót a felhasznalok táblába. Csak a kötelező mezőknek adj általad választott értéket: email, név, jelszó. */
INSERT INTO felhasznalok (email, nev, jelszo) VALUES ('teszt.elek@teszt.hu', 'Teszt Elek', 'tesztelek');

/* 7. Vegyél fel egy új felhasználót a felhasznalok táblába, akinek az email címe admin@company.com, jelszava: admin123, a neve "Super Admin", a szerepköre "admin" és a fiók létrehozásának dátuma a jelenlegi idő. */
INSERT INTO felhasznalok (email, nev, jelszo, szerepkor, letrehozva) VALUES ('admin@company.com', 'Super Admin', 'admin123', 'admin', CURDATE());

/* 8. Vegyél fel egy új terméket a termekek táblába, amely a "Kéziszerszámok" kategóriához tartozik. A termék neve legyen "Csavarhúzó", az egységára 1500 Ft, és a készletdb értéke 100. */
INSERT INTO termekek (kategoria_id, nev, egysegar, keszlet_db) VALUES (31, 'Csavarhúzó', 1500, 100);

/* 9. Módosítsd a "Akkus Csavarhúzó" nevű termék egységárát 2000 Ft-ra. Ha nincs ilyen termék, akkor előbb hozd létre. */
INSERT INTO  termekek (kategoria_id, nev, egysegar, keszlet_db) VALUES (31, 'Akkus Csavarhúzó', 1600, 3);
UPDATE termekek SET egysegar = 2000 WHERE nev = 'Akkus Csavarhúzó';

/* 10. Kérd le a felhasznalok táblából az összes admin szerepkörű felhasználó nevét és email címét. */
SELECT * FROM felhasznalok WHERE szerepkor = 'admin';

/* 11. Módosítsd az admin szerepkörű felhasználók utolsó bejelentkezésének dátumát a jelenlegi időre. */
UPDATE felhasznalok SET legutobbi_bejelentkezes = CURRENT_DATE WHERE szerepkor = 'admin';

/* 12. Listázd ki azon felhasználók nevét és email címét, akik még soha nem jelentkeztek be. */
SELECT nev, email FROM felhasznalok WHERE legutobbi_bejelentkezes IS NULL;

/* 13. Töröld a termékek közül az 1-es azonosítójú terméket. */
DELETE FROM termekek WHERE id = 1;

/* 14. A termékeket rendezze egységár szerint csökkenő sorrendbe. */
SELECT * FROM termekek ORDER BY egysegar DESC;

/* 15. Listázd ki a termékek nevét és egységárát, ahol az egységár nagyobb, mint 5000 Ft. */
SELECT nev, egysegar FROM termekek WHERE egysegar >= 5000;

/* 16. Listázd ki a legdrágább termék nevét és egységárát. */
SELECT nev, egysegar FROM termekek ORDER BY egysegar DESC LIMIT 1;

/* 17. Adja meg, hogy mennyi a termékek átlagos egységára. A mező neve legyen "atlagEgysegar". */
SELECT AVG(egysegar) AS "atlagEgysegar" FROM termekek;