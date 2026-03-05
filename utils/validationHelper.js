const { validationResult } = require("express-validator");

const validateRequest = (keres, valasz, next) => {
        const errors = validationResult(keres);

        //ha van validációs hiba
        if (!errors.isEmpty()) {
            return valasz.status(400).json({
                "valasz": "Validációs hiba!",
                "hibak": errors.array().map(err => (
                    { "mezo": err.path, "uzenet": err.msg }
                ))
            })
        }
        // ha nincs validációs hiba, akkor továbbmegyünk
        next();
}

module.exports = { validateRequest };