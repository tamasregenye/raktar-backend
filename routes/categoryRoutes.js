const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');

//kategóriák lekérése
router.get("/", function (keres, valasz) {
    const sql = "SELECT * FROM kategoriak";
    adatbazis.query(sql, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        valasz.status(200).json(eredmeny);
    })
})

//kategória módosítása
router.put("/:id", function (keres, valasz) {
    const kategoria_id = keres.params.id
    const kategoriaNev = keres.body.kategoriaNev

    if (!kategoriaNev) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg a kategórianevet!"
        })
    }

    const sql = "UPDATE kategoriak SET nev = ? WHERE id = ?"

    adatbazis.query(sql, [kategoriaNev, kategoria_id], function (hiba, eredmeny) {
        if (eredmeny.affectedRows < 1) {
            return valasz.status(404).json({
                "valasz": "Nincs ilyen kategória a rendszerben!"
            })
        }
        valasz.status(200).json({
            "uzenet": "Sikeres frissítés",
            "id": valasz.body.id,
            "kategoriaNev": valasz.body.nev
        })
    })
})

//kategória létrehozása
router.post('/', function (keres, valasz) {
    const kategoriaNev = keres.body.kategoriaNev;
    const sql = "INSERT INTO `kategoriak`(`nev`) VALUES (?)";

    if (!kategoriaNev) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg a kategórianevet!"
        })
    }

    adatbazis.query(sql, [kategoriaNev], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": hiba.message
            });
        }
        valasz.status(201).json({ "uzenet": "A kategória rögzítésre került!" });
    })
})

//kategória törlése
//TODO

module.exports = router;
