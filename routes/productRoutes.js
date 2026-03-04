const express = require('express');
const router = express.Router();
const { methodNotAllowed } = require('../utils/errors');
const productController = require('../controllers/productController');

router.get("/", productController.getAllProducts)

router.put('/:azonosito', productController.putProduct)

router.all(["/", "/:azonosito"], methodNotAllowed)

module.exports = router;