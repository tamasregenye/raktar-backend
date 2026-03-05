const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
const productController = require('../controllers/productController');
const { productPutValidator } = require('../validators/productValidator');

//termékek lekérdezése
router.get("/", productController.getAllProducts)

//termék módosítása
router.put('/:azonosito', productPutValidator, productController.putProduct)

//termék létrehozása
//TODO

router.post('/', function (keres, valasz) {
    
    const kategoriaId = keres.body.kategoriaId;
    const termekNev = keres.body.termekNev;
    const ar = keres.body.ar;
    const darabSzam = keres.body.darabSzam;


    const sql = "INSERT INTO `termekek`(`kategoria_id`, `nev`, `egysegar`, `keszlet_db`) VALUES(?,?,?,?)";
    const variables = [kategoriaId, termekNev, ar, darabSzam];


    adatbazis.query(sql, variables, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(400).json({
                "valasz": "Az ár és a darabszám nem lehet negatív érték!"
            });
        }
        valasz.status(201).json({ "uzenet": "A termék rögzítésre került!" });
    })
})


//termék törlése
//TODO



router.all(["/", "/:azonosito"], methodNotAllowed)

module.exports = router;