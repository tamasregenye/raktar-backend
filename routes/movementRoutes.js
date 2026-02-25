const express = require('express'); // csomag beinportálás
const router = express.Router(); //csomagból a Router meghívás
const adatbazis = require('../adatbazis'); //adatbazis.js elérése

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