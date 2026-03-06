const authModel = require("../models/authModel");
const jwt = require('jsonwebtoken');

const authController = {
    registerUser: (keres, valasz, next) => {
        //kérés törzsében megadott adatok kinyerése, eltárolása
        const { email, jelszo, nev } = keres.body;

        //jelszó titkosítása
        //TODO
        const hashedPassword = jelszo;

        //sql script futtatása a Model állományból
        authModel.insertUser(email, hashedPassword, nev, (hiba, eredmeny) => {

            if (hiba) {
                //megadott email regisztrált már?
                if (hiba.code === "ER_DUP_ENTRY") {
                    return valasz.status(400).json({ "valasz": "A megadott email cimmel már regisztráltak." });
                }
                next(hiba)
            }

            //sikeres regisztráció
            valasz.status(201).json({ "valasz": "Sikeres regisztráció" });
        })

    },

    loginUser: (keres, valasz, next) => {
        const { email, jelszo } = keres.body;

        //létezik felhasználó a megadott email cimmel
        authModel.getUser(email, (hiba, eredmeny) => {
            if (hiba) {
                return next(hiba);
            }

            if (eredmeny.length === 0) {
                return valasz.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" });
            }

            const felhasznalo = eredmeny[0];
            if (felhasznalo.aktiv === 0) {
                return valasz.status(403).json({ "valasz": "A megadott felhasználói fiók nem aktív!" })
            }

            //helyes jelszó?
            //TODO titkosított jelszó ellenőrzése
            const jelszoHelyes = (jelszo === felhasznalo.jelszo)

            if (!jelszoHelyes) {
                return valasz.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" })
            }

            //tokengenerálás
            const token = jwt.sign(
                {
                    id: felhasznalo.id,
                    szerepkor: felhasznalo.szerepkor,

                }, 
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: '1h'
                }
            );

            valasz.status(200).json({
                "valasz": "Sikeres bejelentkezés",
                "token": token,
                "felhasznalo": {
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor
                }
            })
        })


    }
}

module.exports = authController;