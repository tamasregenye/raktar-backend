const { body } = require("express-validator");
const { validateRequest } = require("../utils/validationHelper");

const authUserRegisterValidator = [

    body('email').isEmail().withMessage("Érvényes email cím megadása kötelező!"),

    body('jelszo').isLength({min: 8}).withMessage("A jelszónak legalább 8 karakter hosszúnak kell lennie!"),

    body('nev').isString().trim().notEmpty().withMessage("A név megadása kötelező!"),

    validateRequest
]

const authUserLoginValidator = [

    body('email').isEmail().withMessage("Érvényes email cím megadása kötelező!"),

    body('jelszo').isString().trim().notEmpty().withMessage("Nem adott meg jelszót!"),

    validateRequest
]

module.exports = { authUserRegisterValidator, authUserLoginValidator };