const express = require('express');
const db = require('../adatbazis');
const router = express.Router();

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
              {"valasz": "Sikeres módosítás!"} 

        )
    });

});

module.exports = router;