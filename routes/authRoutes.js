const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()
const {methodNotAllowed} = require('../utils/errors')
const { authUserRegisterValidator } = require('../validators/authValidator')

//útvonalak definiálása

//TODO validálás
router.post('/regisztracio', authUserRegisterValidator, authController.registerUser)

//hibás metódus megadása esetén 405 statusz 
router.all('/regisztracio', methodNotAllowed)

module.exports = router

