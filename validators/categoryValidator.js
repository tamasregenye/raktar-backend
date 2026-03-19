const { param, validationResult, body } = require("express-validator");
const {validateRequest} = require('../utils/validationHelper')

//TODO categoryPutValidator
const categoryPutValidator = [

];

//TODO categoryPostValidator
const categoryPostValidator = [
    body('kategoriNev').isString().trim().notEmpty().withMessage('A kategória névnek szövegnek kell lennie és nem lehet üres!'),

    validateRequest

];

module.exports = {
    categoryPutValidator,
    categoryPostValidator
}