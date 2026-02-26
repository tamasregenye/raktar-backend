const express = require('express');
const db = require('../adatbazis');
const router = express.Router();

/**
 * @swagger
 * tags: 
 *   name: Mozgások
 *   description: Raktár mozgások kezelése
 *   
 */

/**
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *   put:
 *     summary: "Raktár mozgás módosítása"
 *     description: "Ez a végpont teszi lehetővé egy meglévő raktár mozgás adatinak módosítását."
 *     tags: ["Mozgások"]
 *     parameters:
 *       - in: path
 *         name: mozgasId
 *         required: true
 *         type: number
 *     requestBody: 
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            properties:
 *              termekId:
 *                type: number
 *                description: "A mozgáshoz kapcsolódó termék azonosítója"
 *              partnerId:
 *                type: number
 *                description: "A mozgáshoz kapcsolódó partner azonosítója"
 *              mennyiseg:
 *                type: number
 *                description: "A mozgás mennyisége - negatív vagy pozitív érték is lehet"
 *              datum:
 *                type: string
 *                description: "A mozgás dátuma és időpontja"
 *                
 *     responses:
 *       200:
 *         description: "Sikeres módosítás!"
 *       400:
 *         description: "Hibás kérés, nem adta meg a szükséges adatokat!"
 *       404:
 *         description: "Hibás kérés, a megadott azonosítóval nem létezik rekord!"
 *       500:
 *         description: "Hiba történt a szerveren, nem sikerült módosítani a mozgást!"
 */
router.put("/:mozgasId", function (req, res) {
    const mozgasId = req.params.mozgasId;
    const termekId = req.body.termekId;
    const partnerId = req.body.partnerId;
    const mennyiseg = req.body.mennyiseg;
    const datum = req.body.datum;

    if (!mozgasId || !termekId || !partnerId || !mennyiseg || !datum) {
        return res.status(400).json(
            { "valasz": "Nem adta meg a szükséges adatokat!" }
        );
    }

    const sql = "UPDATE `raktar_mozgasok` SET `termek_id`=?,`partner_id`=?,`mennyiseg`=?,`datum`=? WHERE `id`=?";
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId];

    db.query(sql, variables, function (hiba, eredmeny) {
        if (hiba) {
            return res.status(500).json(
                { "valasz": "Hiba a szerveren." }
            );
        }

        if (eredmeny.affectedRows < 1) {
            return res.status(404).json(
                { "valasz": "Nincs ilyen mozgás!" }
            );
        }
        res.status(200).json(
            { "valasz": "Sikeres módosítás!" }

        )
    });

});

module.exports = router;