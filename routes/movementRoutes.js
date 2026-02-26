const express = require('express'); // csomag beinportálás
const router = express.Router(); //csomagból a Router meghívás
const adatbazis = require('../adatbazis'); //adatbazis.js elérése

/**
 * @swagger
 * tags:
 *   name: Mozgások
 *   description: Raktár mozgások kezelése
 */

// mozgások módisítása

/**
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *   put:
 *    summary: "Raktár mozgás módosítása"
 *    description: "Ez a végpont teszi lehetővé egy meglévő raktár mozgás adatainak módisítását az adatbázisban"
 *    tags: ["Mozgások"]
 *    parameters:
 *      - in: path
 *        name: mozgasId
 *        required: true
 *        type: number
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        properties:
 *         termekId:
 *           type: number
 *           description: "A mozgáshoz kapcsolódótermék azonosítója"
 *         partnerId:
 *           type: number
 *           description: "A mozgáshoz kapcsolódó partner azonosítója"
 *         mennyiseg:
 *           type: number
 *           description: "Mozgás mennyisége -negatív vagy pozitív érték is lehet"
 *         datum:
 *           type: string
 *           format: date
 *           description: "A mozgás dátuma és időpontja"
 *    responses:
 *     200:
 *      description: "Sikeres módosítás"
 *     400:
 *      description: "Hibás kérés, nem adta meg a szükséges adatokat"
 *     404:
 *      description: "Hibás kérés a megadott azonosítóval nem létezik rekord"
 *     500:
 *      description: "Hiba történ a szerveren, nem sikerült módosítani a mozgást"
 */
router.put("/:mozgasId", function(keres, valasz) { //a teljes útvonal a kívül kerül megadásra, itt a morgasId kell
    const mozgasId = keres.params.mozgasId; //:mozgasId-t kértük át egy változóba
    const termekId = keres.body.termekId;
    const partnerId = keres.body.partnerId;
    const mennyiseg = keres.body.mennyiseg;
    const datum = keres.body.datum;
    
    if(!mozgasId || !termekId || !partnerId || !mennyiseg || !datum){ //mezők vizsgálata !- üres vagy null értékű
        return valasz.status(400).json( 
            {"valasz": "Nem adta meg az adatokat!"}
        ); //válasz üzenet összeállítás
    }
    const sql = "UPDATE `raktar_mozgasok` SET `termek_id`=?,`partner_id`=?,`mennyiseg`=?,`datum`=? WHERE `id` = ?"; //SQL utasítás, ? máshol kerül az érték átadásra
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId]; //tömb feltöltés értékekkel a változókon keresztül

    adatbazis.query(sql,variables, function(hiba, eredmeny){
        if(hiba){
            return valasz.status(500).json(
                { "valasz": "Hiba a szerveren." }
            );
        }
        if(eredmeny.affectedRows < 1){
            return valasz.status(404).json(
                {"valasz": "Nincs ilyen mozgás!"}
            );
        }
        valasz.status(200).json(
            {"valasz": "Sikeres módosítás!"}
        );
    });
}); 
module.exports = router; //hivatkozás meghívhatóság => server.js-ben meg kell hívni