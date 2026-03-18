const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

//kategóriák lekérése

router.get("/", categoryController.getAllCategories)

//kategória módosítása
//TODO


//kategória létrehozása
router.post('/', authMiddleware.verifyToken, authMiddleware.requireRole(['admin']), categoryController.postCategory);

router.all(["/"], methodNotAllowed);

//kategória törlése
//TODO


router.all(["/"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
})


module.exports = router;