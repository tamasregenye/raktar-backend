const { body } = require("express-validator");
const { validateRequest } = require("../utils/validationHelper");

const authRegisterUserValidator = [
    body('email').isEmail().withMessage("Érvényes email cím megadása kötelező!"),

    body('jelszo').isLength({min: 8}).withMessage("A jelszónak legalább 8 karakter hosszúnak kell lennie!"),

    body('nev').isString().trim().notEmpty().withMessage("A név megadása kötelező!"),

    validateRequest
];

module.exports = {
    authRegisterUserValidator
}