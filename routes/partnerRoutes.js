const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');

//partnerek lekérése
//TODO


//partner módosítása
//TODO


//partner létrehozása
//TODO
router.post('/', function (keres, valasz) {
    const nev = keres.body.nev;
    const varos = keres.body.varos;
    const sql = "INSERT INTO partnerek (nev, varos) VALUES (?,?)";

    if (!nev) {
        return valasz.status(400).json(
            {
                "valasz": "Nem adta meg a partner nevét!"
            }
        )
    }

    adatbazis.query(sql, [nev, varos], function(hiba, eredmeny){
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        return valasz.status(201).json(
            {
                "uzenet": "Partner sikeresen rögzítve"
            }
        )
    })


})


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