const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');

//partnerek lekérése
//TODO


//partner módosítása
//TODO
router.put("/:azonosito", function (req, res) {
    const azonosito = req.params.azonosito;
    const nev = req.body.nev;
    const varos = req.body.varos;

    if (!nev || !varos) {
        return res.status(400).json(
            { "valasz": "Nincs ilyen partner a rendszerben!" }
        )
    }

    const sql = "UPDATE `partnerek` SET `nev`=?,`varos`=? WHERE `id`=?";
    const variables = [nev, varos, azonosito];

    adatbazis.query(sql, variables, function (hiba, eredmeny) {
        if (hiba) {
            return res.status(500).json(
                { "valasz": "Hiba a szerveren." }
            );
        }

        if (eredmeny.affectedRows < 1) {
            return res.status(404).json(
                { "valasz": "Nincs ilyen partner a rendszerben!" }
            );
        }
        res.status(200).json(
            {
                "uzenet": "Sikeres frissítés",
                "id": azonosito,
                "nev": nev,
                "varos": varos
            }
        )
    })
})

//partner létrehozása
//TODO


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



module.exports = router;