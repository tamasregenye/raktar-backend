const { param, body } = require("express-validator");
const { validateRequest } = require("../utils/validationHelper");

const movementPutValidator = [
    //ellenőrzés, hibaüzenetek összeállítása
    param('mozgasId').isInt({ min: 1 }).withMessage('A mozgás ID-nak pozitív egész számnak kell lennie!'),

    body('termekId').isInt({ min: 1 }).withMessage('A termék ID-nak pozitív egész számnak kell lennie!'),

    body('partnerId').isInt({ min: 1 }).withMessage('A partner ID-nak pozitív egész számnak kell lennie!'),

    body('mennyiseg').isInt().withMessage('A mennyiségnek egész számnak kell lennie!'),

    body('datum').isISO8601().withMessage("A dátumnak a következő formátumban kell lennie: ÉÉÉÉ-HH-NN!"),

    //segédfüggvény meghívása az adatok ellenőrzésére
    validateRequest
];

//TODO movementPostValidator
const movementPostValidator = [

];

module.exports = {
    movementPutValidator,
    movementPostValidator
}