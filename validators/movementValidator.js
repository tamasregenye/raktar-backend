const { param, body, validationResult } = require("express-validator")

const movementPutValidator = [
    param('mozgasId').isInt({ min: 1 }).withMessage('A mozgás ID-nak pozitív egész számnak kell lennie'),
    body('termekId').isInt({ min: 1 }).withMessage('A termék ID-nak pozitív egész számnak kell lennie'),
    body('partnerId').isInt({ min: 1 }).withMessage('A partner ID-nak pozitív egész számnak kell lennie'),
    body('mennyiseg').isInt().withMessage('A mennyiségnek egész számnak kell lennie'),
    body('datum').isISO8601().withMessage('A dátumnak a következő formátumban kell lennie: ÉÉÉÉ-HH-NN'),

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
    movementPutValidator
}