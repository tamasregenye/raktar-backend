const { param, validationResult, body } = require("express-validator");
const { validateRequest } = require("../utils/validationHelper");

//TODO categoryPutValidator
const categoryPutValidator = [

];

//TODO categoryPostValidator
const categoryPostValidator = [
    body('kategoriaNev').isString().trim().notEmpty().withMessage("A kategórianév megadása kötelező!"),

    validateRequest
];

module.exports = {
    categoryPutValidator,
    categoryPostValidator
}