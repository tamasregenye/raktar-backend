const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');

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

//kategória törlése
//TODO

module.exports = router;