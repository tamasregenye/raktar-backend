const express = require('express');
const adatbazis = require("../adatbazis")
const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Mozgások
 *  descriptiopn: Raktár mozgások kezelése
 */


/**
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *  put:
 *      summary: "Raktár mozgás módosítása"
 *      description: "Ez a végpont teszi lehetővé egy meglévő raktár mozgás adatainak módosítását"
 *      tags: ["Mozgások"]
 *      parameters:
 *          - in: path
 *            name: mozgasId
 *            required: true
 *            type: number
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          termekId:
 *                              type: number
 *                              description: "A mozgáshoz kapcsolódó termék azonosítója"
 *                          partnerId:
 *                              type: number
 *                              description: "A mozgáshoz kapcsolódó partner azonosítója"
 *                          mennyiseg:
 *                              type: number
 *                              description: "A mozgáshoz mennyisége"
 *                          datum:
 *                              type: string
 *                              format: date-time
 *                              description: "A mozgás dátuma"
 *      responses:
 *          200:
 *              description: "Sikeres módosítás!"
 *          400:
 *              description: "Nem adata meg a szükséges adatokat!"
 *          404:
 *              description: "Nincs ilyen mozgás!"
 *          500:
 *              description: "Szerver hiba!"      
 */
router.put("/:mozgasId", function (keres, valasz) {
    const mozgasId = keres.params.mozgasId
    const { termekId, partnerId, mennyiseg, datum } = keres.body
    if (!mozgasId || !termekId || !partnerId || !mennyiseg || !datum) {
        return valasz.status(400).json({
            "valasz": "Nem adata meg a szükséges adatokat!"
        })
    }

    const sql = "UPDATE `raktar_mozgasok` SET `termek_id`= ? ,`partner_id`= ? ,`mennyiseg`= ? ,`datum`= ? WHERE id = ?"
    adatbazis.query(sql, [termekId, partnerId, mennyiseg, datum, mozgasId], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": "Hiba a szerveren."
            })
        }

        if (eredmeny.affectedRows < 1) {
            return valasz.status(404).json({
                "valasz": "Nincs ilyen mozgás!"
            })
        }

        return valasz.status(200).json({
            "valasz": "Sikeres módosítás!"
        })
    })
})



module.exports = router

