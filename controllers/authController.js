const authModel = require('../models/authModel')

const authController = {
    registerUser: (keres, valasz, next) => {
        //kérés törzsében megadott adatok kinyerése, eltárolása
        const { email, jelszo, nev } = keres.body

        //jelszo titkosítása
        //TODO
        const hashedPassword = jelszo

        //sql script futtatésa a Model állományból
        authModel.insertUser(email, hashedPassword, nev, (hiba, eredmeny) => {
            //megadott email létezik
            if (hiba) {
                if (hiba.code === "ERR_DUP_ENTRY") {
                    return valasz.status(400).json({
                        "valasz": "Ez az email már létezik itt"
                    })
                }
                next(hiba)
            }
            valasz.status(201).json({
                "uzenet": "Sikeres regisztráció",
                //"": eredmeny.insertUser

            })
        })

    }
}

module.exports = authController