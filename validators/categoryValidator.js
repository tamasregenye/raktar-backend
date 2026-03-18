const { param, validationResult, body } = require("express-validator");
const { validateRequest } = require("../utils/validationHelper");

//TODO categoryPutValidator
const categoryPutValidator = [

];

//TODO categoryPostValidator
const categoryPostValidator = [
    body('kategoriaNev').isString().trim().notEmpty().withMessage('A kategórianévnek szövegnek kell lennie, és kötelezően megadandó!'),

    validateRequest
];

module.exports = {
    categoryPutValidator,
    categoryPostValidator
}