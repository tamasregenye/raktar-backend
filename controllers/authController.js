const authModel = require("../models/authModel");
const jwt = require('jsonwebtoken');

const authController = {
    registerUser: (keres, valasz, next) => {
        const email = keres.body.email;
        const password = keres.body.jelszo;
        const name = keres.body.nev;

        const hashedPassword = password;

        authModel.insertUser(email, hashedPassword, name, (hiba, eredmeny) => {
            if (hiba) {
                if (hiba.code === "ER_DUP_ENTRY") {
                    return valasz.status(400).json({ "valasz": "A megadott email címmel már regisztráltak" });
                }
                return next(hiba);
            }

            valasz.status(201).json({ "valasz": "Sikeres regisztráció" });
        });
    },

    loginUser: (keres, valasz, next) => {
        const email = keres.body.email;
        const password = keres.body.jelszo;

        authModel.selectUserByEmail(email, (hiba, eredmeny) => {
            if (hiba) {
                return next(hiba);
            }
            
            if (eredmeny.length === 0){
            valasz.status(401).json({"valasz": "Sikertelen bejelentkezés"});
            }
            
            const felhasznalo = eredmeny[0];
            
            console.log(felhasznalo);
            if (felhasznalo.aktiv === 0){
                return valasz.status(403).json({"valasz": "A fiók deaktiválva van"})
            }

            const jelszoHelyes = (password === felhasznalo.jelszo)

            if(!jelszoHelyes){
                valasz.status(401).json({"valasz": "Hibás email vagy jelszó"});
            }
            
            const token = jwt.sign(
                {
                    "id": felhasznalo.id,
                    "szerepkor": felhasznalo.szerepkor
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
            });
        })
    }


};

module.exports = authController;