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


//mozgás módosítása

/**
 * Swagger dokumentáció
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *  put:
 *    summary: "Raktár mozgás módosítása"
 *    description: "Ez a végpont teszi lehetővé egy meglévő raktár mozgás adatainak módosítását az adatbázisban"
 *    tags: ["Mozgások"]
 *    parameters:
 *      - in: path
 *        name: mozgasId
 *        required: true
 *        type: number
 *    requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                properties:
 *                  termekId:
 *                    type: number
 *                    description: "A mozgáshoz kapcsolódó termék azonosítója"  
 *                  partnerId:
 *                      type: number
 *                      description: "A mozgáshoz kapcsolódó partner azonosítója"
 *                  mennyiseg:
 *                      type: number
 *                      description: "A mozgáshoz kapcsolódó mennyiség"
 *                  datum:
 *                      type: string
 *                      format: date-time
 *                      description: "A mozgás dátuma"
 *    responses:
 *      200:
 *        description: "Sikeres módosítás"
 *      400:
 *        description: "Nem adta meg a szükséges adatokat!"
 *      404:
 *        description: "Nincs ilyen mozgás!"
 *      500:
 *        description: "Hiba a szerveren."
 */

router.put("/:mozgasId", (keres, valasz) => {
    const mozgasId = keres.params.mozgasId

    const termekId = keres.body.termekId
    const partnerId = keres.body.partnerId
    const mennyiseg = keres.body.mennyiseg
    const datum = keres.body.datum

    if(!mozgasId || !termekId || !partnerId || !mennyiseg || !datum)
    {
        return valasz.status(400).json({"valasz":"Nem adta meg a szükséges adatokat!"})
    }

    const sql = "UPDATE `raktar_mozgasok` SET `termek_id`=?,`partner_id`=?,`mennyiseg`=?,`datum`=? WHERE `id`=?"
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId]

    adatbazis.query(sql,variables, (hiba, eredmeny)=>{
        if(hiba)
        {
            return valasz.status(500).json({"valasz": "Hiba a szerveren."})
        }
        if(eredmeny.affectedRows===0)
        {
            return valasz.status(404).json({"valasz": "Nincs ilyen mozgás!"})
        }

        valasz.status(200).json({
            "valasz" : "Sikeres módosítás",
            "termekId" : termekId,
            "partnerId" : partnerId,
            "mennyiseg": mennyiseg,
            "datum": datum
        })
    })
    

})

module.exports = router;