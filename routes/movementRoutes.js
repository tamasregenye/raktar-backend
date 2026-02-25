const express = require('express');
const adatbazis = require("../adatbazis")
const router = express.Router();

router.put("/:mozgasId", function (keres, valasz) {
    const mozgasId = keres.params.mozgasId
    const { termekId, partnerId, mennyiseg, datum } = keres.body
    if (!mozgasId || !termekId || !partnerId || !mennyiseg || !datum) {
        return valasz.status(500).json({
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

