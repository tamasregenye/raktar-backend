const { param, body, validationResult } = require("express-validator")

const productPutValidator = [
    param('azonosito').isInt({ min: 1 }).withMessage('A termék ID-nak pozitív egész számnak kell lennie'),
    body('kategoriaId').isInt({ min: 1 }).withMessage('A kategória ID-nak pozitív egész számnak kell lennie'),
    body('termekNev').trim().notEmpty().withMessage('A termék nevét kötelező megadni'),
    body('ar').isFloat({ min: 0 }).withMessage('A termék ára nulla vagy pozitív szám kell legyen'),
    body('darabSzam').isInt({ min: 0 }).withMessage('A termék darabszáma nulla vagy pozitív egész szám kell legyen'),

    (keres, valasz, next) => {
        const errors = validationResult(keres)
        if (!errors.isEmpty()) {
            return valasz.status(400).json({
                "valasz": "Validációs hiba!",
                "hibak": errors.array().map(err => ({ "mezo": err.path, "uzenet": err.msg }))
            })
        }
        next()
    }
]

module.exports = {
    productPutValidator
}