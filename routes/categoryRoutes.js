const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
const categoryController = require('../controllers/categoryController');


router.get("/", categoryController.getAllCategories);

//kategória módosítása
//TODO





//kategória létrehozása
router.post('/', categoryController.postCategory);

router.all(["/"], methodNotAllowed);


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
            return next(hiba);
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