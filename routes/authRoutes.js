const express = require('express');
const authController = require('../controllers/authController');
const { methodNotAllowed } = require('../utils/errors');
const { authRegisterUserValidator, authLoginValidator } = require('../validators/authValidator');
const router = express.Router();

//végpontok definiálása


router.post('/regisztracio', authRegisterUserValidator, authController.registerUser);
router.post('/bejelentkezes', authLoginValidator , authController.loginUser);

//hibás HTTP metódus megadása esetén 405 státusz küldése
router.all(['/regisztacio','/bejelentkezes'], methodNotAllowed);

module.exports = router

