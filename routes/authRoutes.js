const express = require('express');
const authController = require('../controllers/authController');
const { methodNotAllowed } = require('../utils/errors');
const { authRegisterUserValidator } = require('../validators/authValidator');
const router = express.Router();

//végpontok definiálása

//TODO validálás
router.post('/regisztracio', authRegisterUserValidator, authController.registerUser);
router.post('/bejelentkezes', authController.loginUser);

//hibás HTTP metódus megadása esetén 405 státusz küldése
router.all('/regisztracio', methodNotAllowed)

module.exports = router