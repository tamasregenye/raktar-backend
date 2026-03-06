const { param, body, validationResult } = require("express-validator");
<<<<<<< HEAD
const { validateRequest } = require("../utils/validationHelp");
=======
const { validateRequest } = require("../utils/validationHelper");
>>>>>>> origin/main

const productPutValidator = [
    param('azonosito').isInt({ min: 1 }).withMessage("A termék ID-nak pozitív egész számnak kell lennie!"),

    body('kategoriaId').isInt({ min: 1 }).withMessage("A kategória ID-nak pozitív egész számnak kell lennie!"),

    body('termekNev').isString().trim().notEmpty().withMessage('A terméknévnek szövegnek kell lennie, és kötelezően megadandó!'),

    body('ar').isFloat({ min: 0 }).withMessage('Az árnak pozitív számnak kell lennie!'),

    body('darabSzam').isInt({ min: 0 }).withMessage('A darabszámnak pozitív egész számnak kell lennie!'),

    //segédfüggvény meghívása az adatok ellenőrzésére
    validateRequest
<<<<<<< HEAD

=======
>>>>>>> origin/main
];


//TODO productPostValidator
const productPostValidator = [

];

module.exports = {
    productPutValidator,
    productPostValidator
}