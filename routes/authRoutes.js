const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { methodNotAllowed } = require('../utils/errors');
const { authUserRegisterValidator, authUserLoginValidator } = require('../validators/authValidator');

//végpontok definiálása


router.post('/regisztracio', authUserRegisterValidator, authController.registerUser);
router.post('/bejelentkezes', authUserLoginValidator, authController.loginUser);
router.post('/kijelentkezes', authController.logoutUser);
router.post('/token-frissites', authController.refreshToken);

//hibás HTTP metódus megadása esetén 405 státusz küldése
router.all(['/regisztracio', '/bejelentkezes', '/kijelentkezes', '/token-frissites'], methodNotAllowed);

module.exports = router;