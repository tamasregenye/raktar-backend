const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');

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
//TODO

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
router.delete('/:azonosito', function (keres, valasz) {
    const azonosito = keres.params.azonosito;
    const sql = "DELETE FROM `kategoriak` WHERE `id`=?";

    if (!azonosito) {
        return valasz.status(400).json({ "valasz": "Nem adott meg azonosítót!" });
    }

    adatbazis.query(sql, [azonosito], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        if (eredmeny.affectedRows === 0) {
            return valasz.status(404).json({ "valasz": "Nincs ilyen kategoria a rendszerben!" });
        }
        //if () {
        //    return
        //}
        valasz.status(200).json(
            {"valasz": "Kategória sikeresen törölve", azonosito}
        );
    })
})

router.all(["/"], function(keres, valasz){ //külön fájlban levő hibakezelő meghívása
    methodNotAllowed(keres, valasz);
});

module.exports = router;