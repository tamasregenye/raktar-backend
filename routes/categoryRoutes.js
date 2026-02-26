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

//kategória törlése
//TODO

module.exports = router;