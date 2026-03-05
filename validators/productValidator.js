const { param, body, validationResult } = require("express-validator");
const { validateRequest } = require("../utils/validationHelper");

const productPutValidator = [
    param('azonosito').isInt({ min: 1 }).withMessage("A termék ID-nak pozitív egész számnak kell lennie!"),

    body('kategoriaId').isInt({ min: 1 }).withMessage("A kategória ID-nak pozitív egész számnak kell lennie!"),

    body('termekNev').trim().notEmpty().withMessage('A terméknévnek szövegnek kell lennie, és kötelezően megadandó!'),

    body('ar').isFloat({ min: 0 }).withMessage('Az árnak pozitív számnak kell lennie!'),

    body('darabSzam').isInt({ min: 0 }).withMessage('A darabszámnak pozitív egész számnak kell lennie!'),

    //segédfüggvény meghívása az adatok ellenőrzésére
    validateRequest
];


//TODO productPostValidator
const productPostValidator = [

];

module.exports = {
    productPutValidator,
    productPostValidator
}