const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
const categoryController = require('../controllers/categoryController');

//kategóriák lekérése

router.get("/", categoryController.getAllCategories)

//kategória módosítása
//TODO


//kategória létrehozása
router.post('/', categoryController.postCategory);

router.all(["/"], methodNotAllowed);

//kategória törlése
//TODO

module.exports = router;