const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');

//termekek lekérése
router.get("/", function (keres, valasz) {
    valasz.header("Access-Control-Allow-Origin", "*");
    //1. sql szkript megírása
    const sql = "SELECT id, kategoria_id AS 'kategoriaAzonosito', nev AS 'termekNev', egysegar AS 'ar', keszlet_db AS 'keszleten' FROM `termekek`";

    //2. szkript futtatása, válasz összeállítása
    adatbazis.query(sql, [], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": hiba.message
            })
        }
        valasz.status(200).json(eredmeny);
    })

})

//termék módosítása
router.put('/:azonosito', function (keres, valasz) {
    const azonosito = keres.params.azonosito;
    const termek = keres.body;
    const sql = "UPDATE `termekek` SET `kategoria_id`=?,`nev`=?,`egysegar`=?,`keszlet_db`=? WHERE `id`=?";

    if (termek.ar < 0 || termek.darabSzam < 0) {
        return valasz.status(400).json({ "valasz": "Az ár és a darabszám nem lehet negatív érték!" })
    }
    adatbazis.query(sql, [termek.kategoriaId, termek.termekNev, termek.ar, termek.darabSzam, azonosito], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message })
        }
        if (eredmeny.affectedRows === 0) {
            return valasz.status(400).json({ "valasz": "Nincs ilyen termék a rendszerben!" });
        }
        valasz.status(200).json({
            "uzenet": "Sikeres frissítés",
            "id": azonosito,
            "kategoriaId": termek.kategoriaId,
            "termekNev": termek.termekNev,
            "ar": termek.ar,
            "darabSzam": termek.darabSzam
        })
    })
})

//termék létrehozása
router.post('/', function (keres, valasz) {
    const { kategoria_id, nev, egysegar, keszlet_db } = keres.body;
    const sql = "INSERT INTO `termekek`('kategoria_id', `nev`, 'egysegar', 'keszlet_db') VALUES (?, ?, ?, ?)";

    if (!nev) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg a termék nevét!"
        })
    }
    if (!kategoria_id) {
        return valasz.status(400).json({
            "valasz": "Nem adott meg kategóriát!"
        })
    }
    if (!egysegar) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg az egységárát!"
        })
    }
    if (!keszlet_db) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg a termék készletének mennyiségét!"
        })
    }

    adatbazis.query(sql, [kategoria_id, nev, egysegar, keszlet_db], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": hiba.message
            });
        }
        valasz.status(201).json({ "uzenet": "A termék rögzítésre került!" });
    })
})


//termék törlése
router.delete('/:azonosito', function (keres, valasz) {
    const azonosito = keres.params.azonosito;
    const sql = "DELETE FROM `termekek` WHERE `id`=?";

    if (!azonosito) {
        return valasz.status(400).json({ "valasz": "Nem adott meg azonosítót!" });
    }

    adatbazis.query(sql, [azonosito], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        if (eredmeny.affectedRows === 0) {
            return valasz.status(404).json({ "valasz": "Nincs ilyen azonosítójú termék!" });
        }
        valasz.status(204).json();
    })
})

module.exports = router;