const authModel = require("../models/authModel");

const authController = {
    registerUser: (keres, valasz, next) => {
        //kérés törzsében megadott adatok kinyerése, eltárolása
        const email = keres.body.email;
        const password = keres.body.jelszo;
        const name = keres.body.nev;

        //jelszó titkosítása
        //TODO
        const hashedPassword = password;

        //sql script futtatása a Model állományból
        authModel.insertUser(email, hashedPassword, name, (hiba, eredmeny) => {
            
            if(hiba){
                //megadott email létezik már?
                if(hiba.code === "ER_DUP_ENTRY"){
                    return valasz.status(400).json({ "valasz": "A megadott email címmel már regisztráltak." });
                }
                next(hiba);
            }

            //sikeres regisztráció
            valasz.status(201).json({ "valasz": "Sikeres regisztráció!" });

        })

    }
}

module.exports = authController