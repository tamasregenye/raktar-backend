const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');

/**
 * @swagger
 * tags: 
 *   name: Mozgások
 *   description: Raktár mozgások kezelése
 */

/**
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *   put:
 *     summary: "raktármozgás módosítása"
 *     description: "ez a végpont teszi lehetővé egy meglévő raktár mozgás adatainka a módosítását"
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
 *                 description: "A mozgáshoz mennyisége, lehet pozití és negatív is"
 *               datum: 
 *                 type: string
 *                 format: date-time
 *                 description: "A mozgás dátuma"
 *     responses: 
 *       200:
 *         description: "Sikeres módosítás"
 *       400:
 *         description: "Hibás kérés, nem adta meg a szükséges adatokat"
 *       404:
 *         description: "Hibás kérés, a megadott azonosítóval nem létezik rekord"  
 *       500:
 *         description: "Hiba történt a szereveren, nem sikerült módosítani a mozgást" 
 */
router.put("/:mozgasId", function (keres, valasz) {
    const mozgasId = keres.params.mozgasId;
    const termekId = keres.body.termekId;
    const partnerId = keres.body.partnerId;
    const mennyiseg = keres.body.mennyiseg;
    const datum = keres.body.datum;

    if (!mozgasId || !termekId || !partnerId || !mennyiseg || !datum) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg a szükséges adatokat!"
        });
    }

    const sql = "UPDATE `raktar_mozgasok` SET `termek_id`=?,`partner_id`=?,`mennyiseg`=?,`datum`=? WHERE `id`=?";
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId];

    adatbazis.query(sql, variables, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": "Hiba a szerveren."
            })
        }
        if (eredmeny.affectedRows < 1) {
            return valasz.status(404).json({
                "valasz": "Nincs ilyen mozgás!"
            });
        }
        valasz.status(200).json({
            "valasz": "Sikeres módosítás"
        })
    })
});


module.exports = router;