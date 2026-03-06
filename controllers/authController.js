const authModel = require("../models/authModel");
const jwt = require('jsonwebtoken');

const authController = {
    registerUser : (keres, valasz, next) => {
        //kérés törzsében megadott adatok kinyerése, eltárolása
        const email = keres.body.email;
        const password = keres.body.jelszo;
        const name = keres.body.nev;
       
        //jelszó titkosítása

        //TODO
        const hasedPassword = password;

        //sql script futtatása a Model állományból
        authModel.insertUser(email, hasedPassword, name, (hiba, eredmeny) => {
            
            if(hiba){
                //megadott email létezik már?
                if(hiba.code === "ER_DUP_ENTRY"){
                    return valasz.status(400).json({"valasz": "A megadott email címmel már regisztráltak."});
                }
                next(hiba);
            }

            //sikeres regisztráció
            valasz.status(201).json({ "valasz": "Sikeres regisztráció."});
        })
    },

    loginUser: (keres, valasz, next) => {
        const email = keres.body.email;
        const password = keres.body.jelszo;

        //létezik felhasználó a megadott email címmel?
        authModel.selectUserByEmail(email, (hiba, eredmeny) => {
            if(hiba){
                return next(hiba);
            } 
            if(eredmeny.length === 0){
                return valasz.status(401).json( {"valasz": "Hibás email címet vagy jelszót adott meg."} );
            }
            const felhasznalo = eredmeny[0]; //első elem lesz a konkrét felhasználó
            //inaktív-e a felhasználói fiók?
            if(felhasznalo.aktiv === 0){
                return valasz.status(403).json( {"valasz": "A fiók deaktiválva van."} );
            }
            //helyes jelszó?
            //TODO titkosított jelszó ellenőrzése
            const jelszoHelyes = (password === felhasznalo.jelszo); 

            if(!jelszoHelyes){
                return valasz.status(401).json( {"valasz": "Hibás email címet vagy jelszót adott meg."} );
            }

            //token generálás
            const token = jwt.sign(
                {
                    "id": felhasznalo.id,
                    "szerepkor": felhasznalo.szerepkor,
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

module.exports = authController