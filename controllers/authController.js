const authModel = require("../models/authModel");

const authController = {
    registerUser: (keres, valasz, next) =>{
        //kérés törzsében megadott adatok kinyerése, eltárolása
        const email = keres.body.email;
        const jelszo = keres.body.jelszo;
        const nev = keres.body.nev;
    
        //jelszó titkosítása
        //TODO
        const hashedjelszo = jelszo;
        
        
        //sql script futtatása a Model állományból
        authModel.insertUser(email, hashedjelszo, nev, (hiba, eredmeny) =>{
            
            if(hiba){
               //megadott email létezik már? 
               if(hiba.code === "ER_DUP_ENTRY"){
                return valasz.status(400).json ({"valasz": "A megadott email cím már regisztrálták"});
               }
               next(hiba);
            }

            //sikeres regisztráció
            valasz.status(201).json({"valasz": "Sikeres regisztráció!"});
        })
    
    }
}

module.exports = authController