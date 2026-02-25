const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');


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

module.exports = router;