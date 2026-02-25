const express = require("express")
const router = express.Router()
const adatbazis = require("../adatbazis")

router.get("/api/kategoriak", function (keres, valasz) {
    const sql = "SELECT * FROM kategoriak";
    adatbazis.query(sql, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        valasz.status(200).json(eredmeny);
    })
})

router.post('/api/kategoriak', function (keres, valasz) {
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
        valasz.status(201).json({ "uzenet": "A feladat rögzítésre került!" });
    })
})

module.exports = router