const { param, body, validationResult } = require("express-validator")

const productPutValidator = [
    param('azonosito').isNumeric({ min: 1 }).withMessage('Az termék ID-nak pozitív egész számnak kell lennie'),

    body('kategoriaId').isInt({ min: 1 }).withMessage('A kategória ID-nak pozitív egész számnak kell lennie'),

    body('termekNev').trim().notEmpty().withMessage("Terméknév nem lehet üres"),

    body('ar').isFloat({ min: 0 }).withMessage('Az árnak egész számnak kell lennie'),

    body('darabSzam').isInt().withMessage("Készletnek egész számnak kell lennie"),

    (keres, valasz, next) => {
        const error = validationResult(keres)

        //hiba esetén válasz összeállítása
        if (!error.isEmpty) {

            return valasz.status(400).json({
                "valasz": "Validációs hiba!",
                "hibak" : error.array().map(err => ({
                    "mezo" : err.path,
                    "uzenet" : err.msg
                }))
            })
        }
        next()
    },


]

module.exports = {
    productPutValidator
}