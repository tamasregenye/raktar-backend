const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');

/**
 * @swagger
 * tags:
 *   name: Partnerek
 *   description: Partnerek kezelése
 */

//partnerek lekérése
//TODO


//partner módosítása
//TODO


//partner létrehozása
//TODO

/**
 * @swagger
 * /api/partnerek/{azonosito}:
 *   delete:
 *     tags: ["Partnerek"]
 *     summary: "Partner törlése azonosító alapján"
 *     description: "Ez a végpont lehetővé teszi egy partner végleges törlését az adatbázisból az azonositója ID alapján. A sikeres művelet nem ad vissza adatot (204 No Content)"
 *     parameters:
 *      - in: path
 *        name: azonosito
 *        required: true
 *        description: "A törölni kívánt partner egyedi azonosítója."
 *     responses:
 *        204:
 *          description: "Sikeres törlés!"
 *        400:
 *          description: "Nem adott meg azonosítót!"
 *        404:
 *          description: "Nincs ilyen azonosítójú alkalmazott!"
 *        500: 
 *          description: "Hiba üzenet!"
 */
//partner törlése
router.delete('/:azonosito', function (keres, valasz) {
    const azonosito = keres.params.azonosito;
    const sql = "DELETE FROM `partnerek` WHERE `id`=?";

    if (!azonosito) {
        return valasz.status(400).json({ "valasz": "Nem adott meg azonosítót!" });
    }

    adatbazis.query(sql, [azonosito], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        if (eredmeny.affectedRows === 0) {
            return valasz.status(404).json({ "valasz": "Nincs ilyen azonosítójú alkalmazott!" });
        }
        valasz.status(204).json();
    })
})

router.all(["/"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
})

module.exports = router;