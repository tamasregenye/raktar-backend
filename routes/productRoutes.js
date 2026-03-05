const express = require('express');
const router = express.Router();
const { methodNotAllowed } = require('../utils/errors');
const productController = require('../controllers/productController');
const { productPutValidator } = require('../validators/productValidator');

//termékek lekérdezése
router.get("/", productController.getAllProducts)

//termék módosítása
router.put('/:azonosito', productPutValidator, productController.putProduct)

//termék létrehozása
//TODO


//termék törlése
//TODO



router.all(["/", "/:azonosito"], methodNotAllowed)

module.exports = router;