const { validationResult, body } = require("express-validator");
const { validateRequest } = require("../utils/validationHelper");


const authRegisterUserValidator = [
    body('email').isEmail().withMessage('érvénytelen email'),

    body('jelszo').isStrongPassword().withMessage('nem elég erős jelszó'),

    body('nev').isString().trim().notEmpty().withMessage("Név megadása kötelező"),

    validateRequest
]


const authLoginUserValidator = [
    body('email').isEmail().withMessage('érvénytelen email'),

    body('jelszo').isStrongPassword().withMessage('he'),

    validateRequest
]
module.exports = {
    authRegisterUserValidator,
    authLoginUserValidator
}