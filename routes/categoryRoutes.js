const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');

/**
 * @swagger
 * tags:
 *   name: Kategóriák
 *   description: Kategóriák kezelése
 */

//kategóriák lekérése

/**
 * @swagger
 * /api/kategoriak:
 *   get:
 *     summary: "Az összes kategóriák lekérése"
 *     description: "Ez a végpont lehetővé teszi az összes a rendszerben (adatbázisban) tárolt összes termékkategória lekérését egy listában. A kéréshez nem szükséges paraméter vagy törzs."
 *     tags: ["Kategóriák"]
 *     responses:
 *       200:
 *         description: "Sikeres lekérdezés. JSON tömböt ad vissza, amely a kategóriák objektumait tartalmazza (az adatbázis sémája alapján: id mint integer, és nev mint string)."
 *       500:
 *         description: "Szerver- vagy adatbázishiba történik. JSON válasz: {'valasz': 'hibaüzenet szövege'}."
 */ 
router.get("/", function (keres, valasz) {
    const sql = "SELECT * FROM kategoriak";
    adatbazis.query(sql, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        valasz.status(200).json(eredmeny);
    })
})

//kategória módosítása
//TODO


/**
 * @swagger
 * /api/kategoriak:
 *   post:
 *     summary: "Új kategória létrehozása."
 *     description: " Ez a végpont lehetővé teszi egy új kategória rögzítését az adatbázisban. A sikeres mentéshez kötelező megadni a kategória nevét a kérés törzsében."
 *     tags:
 *       - Kategóriák
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kategoriaNev:
 *                 type: string
 *                 description: "Az új termékkategória neve."
 *     responses:
 *       201:
 *         description: " A kategória sikeresen rögzítve lett"
 *       400:
 *         description: " Validációs hiba, ha a kategórianév nem lett elküldve a törzsben."
 *       500:
 *         description: " Szerver- vagy adatbázishiba"
 */


//kategória létrehozása
router.post('/', function (keres, valasz) {
    const kategoriaNev = keres.body.kategoriaNev;
    const sql = "INSERT INTO `kategoriak`(`nev`) VALUES (?)";

    if (!kategoriaNev) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg a kategórianevet!"
        })
    }

    adatbazis.query(sql, [kategoriaNev], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": hiba.message
            });
        }
        valasz.status(201).json({ "uzenet": "A kategória rögzítésre került!" });
    })
})

router.all(["/"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
})

//kategória törlése
//TODO
router.delete('/:azonosito', function (keres, valasz) {
    const azonosito = keres.params.azonosito;
    const sql = "DELETE FROM `kategoriak` WHERE `id`=?";

    if (!azonosito) {
        return valasz.status(400).json({ "valasz": "Nem adott meg azonosítót!" });
    }

    adatbazis.query(sql, [azonosito], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        if (eredmeny.affectedRows === 0) {
            return valasz.status(404).json({ "valasz": "Nincs ilyen kategoria a rendszerben!" });
        }
        //if () {
        //    return
        //}
        valasz.status(200).json(
            {"valasz": "Kategória sikeresen törölve", azonosito}
        );
    })
})

router.all(["/"], function(keres, valasz){ //külön fájlban levő hibakezelő meghívása
    methodNotAllowed(keres, valasz);
});

module.exports = router;