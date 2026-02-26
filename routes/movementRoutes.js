const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');


/**
 * @swagger
 * tags:
 *   name: Mozgások
 *   description: Raktár mozgások kezelése
 */

//mozgások lekérése
//TODO


//mozgások módosítása

/**
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *   put:
 *     summary: "Raktár mozgás módosítása"
 *     description: "Ez a végpont teszi lehetővé egy meglévő raktár mozgás adatainak módosítását az adatbázisban."
 *     tags: ["Mozgások"]
 *     parameters:
 *       - in: path
 *         name: mozgasId
 *         required: true
 *         type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               termekId:
 *                 type: number
 *                 description: "A mozgáshoz kapcsolódó termék azonosítója"
 *               partnerId:
 *                 type: number
 *                 description: "A mozgáshoz kapcsolódó partner azonosítója"
 *               mennyiseg:
 *                 type: number
 *                 description: "Mozgás mennyisége - negatív vagy pozitív érték is lehet"
 *               datum:
 *                 type: string
 *                 format: date-time
 *                 description: "A mozgás dátuma és időpontja"
 *     responses:
 *       200:
 *         description: "Sikeres módosítás"
 *       400:
 *         description: "Hibás kérés, nem adta meg a szükséges adatokat!"
 *       404:
 *         description: "Hibás kérés, a megadott azonosítóval nem létezik rekord!"
 *       500:
 *         description: "Hiba történt a szerveren, nem sikerült módosítani a mozgást!"
 */
router.put("/:mozgasId", function (keres, valasz) {
    const mozgasId = keres.params.mozgasId;
    const termekId = keres.body.termekId;
    const partnerId = keres.body.partnerId;
    const mennyiseg = keres.body.mennyiseg;
    const datum = keres.body.datum;

    if (!mozgasId || !termekId || !partnerId || !mennyiseg || !datum) {
        return valasz.status(400).json(
            { "valasz": "Nem adta meg a szükséges adatokat!" }
        );
    }

    const sql = "UPDATE `raktar_mozgasok` SET `termek_id`=?,`partner_id`=?,`mennyiseg`=?,`datum`=? WHERE `id`=?";
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId];

    adatbazis.query(sql, variables, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json(
                { "valasz": "Hiba a szerveren." }
            );
        }

        if (eredmeny.affectedRows < 1) {
            return valasz.status(404).json(
                { "valasz": "Nincs ilyen mozgás!" }
            );
        }

        valasz.status(200).json(
            { "valasz": "Sikeres módosítás!" }
        );

    });
});

//mozgások létrehozása
//TODO
router.post("/", function (keres, valasz) {
    const termekId = keres.body.termekId;
    const partnerId = keres.body.partnerId;
    const mennyiseg = keres.body.mennyiseg;
    const datum = keres.body.datum;

    if (!termekId || !partnerId || !mennyiseg || !datum) {
        return valasz.status(400).json(
            {
                "valasz": "Hiányzó adatok!"
            }
        )
    }

    const sql = "INSERT INTO raktar_mozgasok (termek_id, partner_id, mennyiseg, datum) VALUES (?,?,?,?)";

    adatbazis.query(sql, [termekId, partnerId, mennyiseg, datum], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json(
                { "valasz": "Hiba a szerveren." }
            );
        }
        valasz.status(201).json(
            {
                "uzenet": "Mozgássikeresen rögzítve",
                "id": eredmeny.insertId,
                "termekId": termekId,
                "partnerId": partnerId,
                "mennyiseg": mennyiseg,
                "datum": datum
            }
        )
    })

})

//mozgások törlése
//TODO

module.exports = router;