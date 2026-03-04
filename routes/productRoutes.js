const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
const productController = require('../controllers/productController');

//termékek lekérdezése
router.get("/", productController.getAllProducts)

//termék módosítása
router.put('/:azonosito', productController.putProduct)

//termék létrehozása
//TODO


//termék törlése
//TODO



router.all(["/", "/:azonosito"], methodNotAllowed)

module.exports = router;