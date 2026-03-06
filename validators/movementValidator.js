const { param, validationResult, body } = require("express-validator");

const movementPutValidator = [
    //ellenőrzés, hibaüzenetek összeállítása
    param('mozgasId').isInt({ min: 1 }).withMessage("A mozgás ID-nak pozitív egész számnak kell lennie"),
    body('termekId').isInt({min: 1}).withMessage("A termék IDn-nak pozitív egész számnak kell lennie"),
    body('partnerId').isInt({min: 1}).withMessage("A partner IDn-nak pozitív egész számnak kell lennie"),
    body('datum').isISO8601().withMessage("A dátum a következő formátumba kell lennie: ÉÉÉÉ-HH_NN"),
    body ('mennyiség').isInt().withMessage("A mennyiségnek egész számnak kell lennie!"),
    (keres, valasz, next) => {
        const errors = validationResult(keres);
        //ha van validációs hiba
        if (!errors.isEmpty()) {
            return valasz.status(400).json({
                "valasz": "validációs hiba!",
                "hibak": errors.array().map(err => (
                    { "mezo": err.path, "üzenet": err.msg }

                ))
            })

        }
        next();
    }
];

module.exports = {
    movementPutValidator: movementPutValidator
}