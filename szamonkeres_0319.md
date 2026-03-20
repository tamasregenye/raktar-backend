# Tesztelés - számonkérés 2026.03.19

## 1. feladat: Szorzás metódus tesztelése

### Cél: Egy meglévő, jól működő függvény lefedése tesztesetekkel.

A vizsgált függvény, ameny 2 számot vár paraméterben, és a szorzatuk eredményével tér vissza

```js
function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return null;
    }
    return a * b;
}
```

### Kért tesztesetek
Szorzás vizsgálata
* 2-es és 3-as szorzata 6 kell legyen
* Sztringek esetén null-t kell kapni
* 2 és 3 szorzata legyen nagyobb mint 5
* 2 és 3 szorzata legyen kisebb mint 7

## 2. Feladat: Hibás függvény tesztelése és javítása

### Cél: Egyszerű logikai hiba feltárása és javítása

Adott egy függvény, amelynek meg kellene dupláznia a paraméterben kapott számot:
```js
function double(n) {
    return n * n; 
}
```

### Kért tesztesetek
 Duplázás vizsgálata
* 2 megadása esetén 4-et kell kapni
* 3 megadása esetén 6-ot kell kapni

Javítsd ki a függvényt, hogy valóban a megadott szám kétszeresével térjen vissza

## 3. feladat: API végpont tesztelése (Supertest)

### Cél: Regisztrációs folyamat ellenőrzése és státuszkódok vizsgálata.

### Környzet:
* Metódus: POST
* URL: /api/felhasznalok/regisztacio
* Validátor: ```authRegisterUserValidator```
* Controller: ```authController.registerUser```
* Szükséges mezők a kérés törzsében: keresd meg a Swagger UI segítségével
* Dokumentáció: Indítsd el a szervert (```npm run start-test```), és keresd meg a végpont leírását a Swagger UI-on: http://localhost:3000/api/docs

### Kért tesztesetek

POST /api/felhasznalok/regisztacio tesztelése
* Sikeres regisztráció
    * Elvárás: A státuszkód legyen 201, és a válasz törzsének "valasz" mezője tartalmazza a ```"Sikeres regisztráció!"``` üzenetet.
    * Tipp: Használj minden futtatáskor egyedi e-mail címet, hogy elkerüld a duplikációt!
* Már létező e-mail cím
    * Küldj el egy olyan e-mail címet, amely már szerepel a tesztadatbázisodban.
    * Elvárás: A státuszkód legyen 409, és a válasz törzsének "valasz" mezője tartalmazza a hibaüzenetet: ```"A megadott email címmel már regisztráltak."```.
* Validációs hiba - Rövid jelszó
    * Küldj egy kérést, ahol a jelszó hossza kevesebb, mint 8 karakter.
    * Elvárás: A státuszkód legyen 400 és a válasz törzsében legyen megtalálható a ```hibak``` között a jelszó.


## Megoldás beadása

Az elkészült teszteseteket tartalmazó állományokat, és a generált teszt riportot tömörítse a **vezeteknev_keresztnev** állományba. A saját nevét adja meg!

