const { param, body, validationResult } = require("express-validator");

const productPutValidator = [
    param('azonosito').isInt({ min: 1 }).withMessage('A termék ID-nak pozitív egész számnak kell lennie'),

    body('kategoriaId').isInt({ min: 1 }).withMessage('A kategória ID-nak pozitív egész számnak kell lennie'),

    body('termekNev').trim().notEmpty().withMessage('A kategória ID-nak pozitív egész számnak kell lennie'),

    body('ar').isFloat({ min: 0 }).withMessage('Az árnak pozitív számnak kell lennie'),

    body('darabSzam').isInt({ min: 0 }).withMessage('A darabszámnak 0 vagy pozitív egész számnak kell lennie'),

    // TODO: segédgüggvényt készíteni!
    (keres, valasz, next) => {
        const error = validationResult(keres);

        // hiba esetén válasz összeállítása
        if (!error.isEmpty()) {
            return valasz.status(400).json({
                "valasz": "Validációs hiba!",
                "hibak": error.array().map(err => ({"mezo": error.path, "uzenet": err.msg}))
            })
        }
        next();
    }
];

module.exports = {
    productPutValidator
}