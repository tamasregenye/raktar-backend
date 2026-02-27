const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');

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
//TODO


//termék törlése
//TODO

router.all(["/"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
});

module.exports = router;