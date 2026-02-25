const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');

//partnerek lekérése
router.get("/", function (keres, valasz) {
    const sql = "SELECT * FROM partnerek";
    adatbazis.query(sql, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        valasz.status(200).json(eredmeny);
    })
})


//partner módosítása
router.put("/:id", function (keres, valasz) {
    const partner_id = keres.params.id
    const { nev, varos } = keres.body

    const sql = "UPDATE partnerek SET nev = ?, varos = ? WHERE id = ?"

    adatbazis.query(sql, [nev, varos, partner_id], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": hiba.message
            })
        }
        valasz.status(200).json({ "uzenet": "A partner módosítása megtörtént!" })
    })
})


//partner létrehozása
router.post('/', function (keres, valasz) {
    const { nev, varos } = keres.body;
    const sql = "INSERT INTO `partnerek`(`nev`, 'varos') VALUES (?, ?)";

    if (!nev) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg a partner nevét!"
        })
    }
    if (!varos) {
        return valasz.status(400).json({
            "valasz": "Nem adott meg a pertnernek várost!"
        })
    }

    adatbazis.query(sql, [nev, varos], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": hiba.message
            });
        }
        valasz.status(201).json({ "uzenet": "A partner rögzítésre került!" });
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
