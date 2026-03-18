const express = require('express');
const router = express.Router();
const { methodNotAllowed } = require('../utils/errors');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

//kategóriák lekérése

router.get("/", authMiddleware.verifyToken, authMiddleware.requireRole(["user"]), categoryController.getAllCategories)

//kategória módosítása
//TODO


//kategória létrehozása
router.post('/', authMiddleware.verifyToken, authMiddleware.requireRole(["user"]), categoryController.postCategory);

router.all(["/"], methodNotAllowed);

//kategória törlése
//TODO

module.exports = router;