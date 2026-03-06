const { param, body, validationResult } = require("express-validator");

const productPutValidator = [
    param('azonosito').isInt({ min: 1 }).withMessage("A termék ID-nak pozitív egész számnak kell lennie!"),

    body('kategoriaId').isInt({ min: 1 }).withMessage("A kategóriaId-nak pozitív egész számnak kell lennie!"),

    body('termékNev').notEmpty().withMessage("A terméknévnek szövegnek kell lennie, és kötelezően megadandó!"),

    body('ar').isFloat({ min: 0 }).withMessage("Az ár árnak pozitív számnak kell lennie!"),

    body('darabszam').isInt({ min: 0 }).withMessage("A darabszám pozitív egész számnak kell lennie!"),

    (keres, valasz, next) => {
        const error = validationResult(keres)

        //hiba esetén válasz összeállítása
        if (!error.isEmpty()) {
            return valasz.status(400).json(
                {
                    "valasz": "Validációs hiba!",
                    "hibák": error.array().map(err => ({
                     "mezo": error.path, "uzenet": err.msg }))
            })
        }
        next()
    },
]




module.exports = {
    productPutValidator
}