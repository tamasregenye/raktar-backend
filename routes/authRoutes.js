const express = require ('express');
const authController =require('../controllers/authController');
const { methodNotAllowed } = require('../utils/errors');
const { authRegisterUserValidator } = require('../validators/authValidator');
const router = express.Router();

//útvonalak definiálása 

//TODO validálása
router.post('/regisztracio', authRegisterUserValidator, authController.registerUser)
//hibás HTTP metódus megadása esetén 405 státusz küldése
router.all('/regisztracio', methodNotAllowed)

module.exports = router