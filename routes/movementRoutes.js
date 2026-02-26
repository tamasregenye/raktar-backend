const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');

/**
 * @swagger
 * tags:
 *    name: Mozgások 
 *    description: Raktármozgások kezelése
 */


//mozgások módosítása

/**
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *   put:
 *     summary: "Raktármozgás módosítása"
 *     description: "Ez a végpont teszi lehetővé egy meglévő raktármozgás adatainak módosítását."
 *     tags: ["Mozgások"]
 *     parameters: 
 *       - in: path
 *         name: mozgasId
 *         required: true
 *         type: number
 *     requestBody:
 *       reqired: true
 *       content: 
 *         application/json:
 *           schema:
 *             properties:
 *               termekId:
 *                 type: number
 *                 description: "A mozgáshoz kapcsolodó termék azonosítója"
 *               partnerId:
 *                 type: number
 *                 description: "A mozgáshoz kapcsolodó partner azonosítója"
 *               mennyiseg:
 *                 type: number
 *                 description: "A mozgás mennyisége"
 *               datum:
 *                 type: string
 *                 format: date-time
 *                 description: "A mozgás dátuma és időpontja"
 *     responses: 
 *        200:
 *          description: "Sikeres módosítás"
 *        400:
 *          description: "Nem adta meg a szükséges adatot"
 *        404:
 *          description: "Nincs ilyen mozgás"
 *        500:
 *          description: "Hiba a szerveren"
 *      
 * 
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
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId]

    adatbazis.query(sql, variables, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json(
                { "valasz": "Hiba a szerveren." }
            );
        }

        if (eredmeny.affectedRows < 1) {
            return valasz.status(404).json(
                {"valasz": "Nincs ilyen mozgás!"}
            );     
        }

        valasz.status(200).json(
            { "valasz": "Sikeres módosítás!" }
        );

    });

});



router.all(["", "/:mozgasId"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
})

module.exports = router;