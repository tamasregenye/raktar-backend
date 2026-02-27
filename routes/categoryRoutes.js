const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
const categoryController = require('../controllers/categoryController');

router.get("/", categoryController.getAllCategories)

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
router.post('/', categoryController.postCategory)

router.all(["/"], methodNotAllowed)

//kategória törlése
//TODO

module.exports = router;
