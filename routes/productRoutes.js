const express = require('express');
const router = express.Router();
const { methodNotAllowed } = require('../utils/errors');
const productController = require('../controllers/productController');
const { productPutValidator } = require('../validators/productValidator');

router.get("/", productController.getAllProducts)

router.put('/:azonosito', productPutValidator, productController.putProduct)

router.all(["/", "/:azonosito"], methodNotAllowed)

module.exports = router;