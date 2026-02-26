const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');

/**
 * @swagger
 * tags:
 *   name: Mozgások
 *   description: Raktrármozgások kezelése
 */

//mozgások módosítása
/**
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *   put:
 *     summary: "Raktármozgás módosítása"
 *     description: "Ez a végpont teszi lehetővé egy meglévő raktármozgás adatainak módosítását"
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
 *                 description: "A mozgás mennyisége - negatív és pozitív is lehet"
 *               datum:
 *                 type: string
 *                 format: date-time
 *                 description: "A mozgás dátuma és időpontja"
 *     responses:
 *       200:
 *         description: "Sikeres módosítás"
 *       400:
 *         description: "Hibás kérés: hiányzó adatok!"
 *       404:
 *         description: "Hibás kérés: Megadott azonosítóval nem található rekord"
 *       500:
 *         description: "Szerverhiba"
 */
router.put('/:mozgasId', (keres, valasz) => {
    const mozgasId = keres.params.mozgasId;
    const termekId = keres.body.termekId;
    const partnerId = keres.body.partnerId;
    const mennyiseg = keres.body.mennyiseg;
    const datum = keres.body.datum;

    if (!mozgasId || !partnerId || !termekId || !mennyiseg || !datum) {
        return valasz.status(400).json({ "valasz": "Nem adta meg a szükséges adatokat!" });
    }

    const sql = "UPDATE `raktar_mozgasok` SET `termek_id`= ?,`partner_id`=?,`mennyiseg`=?,`datum`=? WHERE id = ?";
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId];

    adatbazis.query(sql, variables, (hiba, eredmeny) => {
        if (hiba) {
            return valasz.status(500).json({ "valasz": "Hiba a szerveren.", "hiba": hiba.message });
        }

        if (eredmeny.affectedRows < 1) {
            return valasz.status(404).json({ "valasz": "Nincs ilyen mozgás!" });
        }

        valasz.status(200).json({
            "valasz": "Sikeres módosítás!",
        })
    })
})

router.all(["/", "/:mozgasId"], (keres, valasz) => {
    methodNotAllowed(keres, valasz);
});

module.exports = router;