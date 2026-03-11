const express = require('express');
const authController = require('../controllers/authController');
const { methodNotAllowed } = require('../utils/errors');
const { authRegisterUserValidator } = require('../validators/authValidator');
const router = express.Router();

router.post('/regisztracio', authRegisterUserValidator, authController.registerUser);
router.post('/bejelentkezes', authController.loginUser);

router.all('/regisztracio',methodNotAllowed);

module.exports = router