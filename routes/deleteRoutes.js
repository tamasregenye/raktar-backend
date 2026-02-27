const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');

router.delete("/:azonosito", function (keres, valasz) {
    const azonosito = keres.params.azonosito;
    const sql = "DELETE FROM `raktar_mozgasok` WHERE `id`=?";

    adatbazis.query(sql, azonosito, function (hiba, eredmeny) {
        if (hiba) {
            console.error(hiba);
            return valasz.status(500).json(
                { "valasz": "A termék törlése sikertelen, szerver hiba történt" })
        }
        if (eredmeny.affectedRows===0) {
            return valasz.status(404).json(
                { "valasz": "Nincs ilyen termék a rendszerben!" }
            );
        }
        valasz.status(200).json({
            "valasz": "A termék sikeresen törölve!",
            toroltId: azonosito
        });
    });
});

module.exports = router;
