const jwt = require('jsonwebtoken');

const authMiddleware = {
    verifyToken: (keres, valasz, next)=>{
        const auth = keres.headers['authorization'];
        let token = auth;

        if(auth.startsWith('Bearer')){
            token = auth.split(' ')[1];
        }

        if(!token){
            return valasz.status(401).json({"valasz": "Hozzáférés megtagadva!"});
        }

        try{
            const dekodoltToken = jwt.verify(token, process.env.JWT_TOKEN_KEY)
            keres.felhasznalo = dekodoltToken;
            next();
        }
        catch(hiba){
            return valasz.status(403).json({"valasz": "Nincs jogosultságod ehhez a művelethez!"});
        }
    },

    /**
     * 
     * @param {string []} elvartSzerepkorok 
     */
    requireRole: (elvartSzerepkorok) => {
        return (keres, valasz, next) =>{
            const felhasznalo = keres.felhasznalo;
            if(!felhasznalo || !elvartSzerepkorok.includes(felhasznalo.szerepkor)){
                return valasz.status(403).json({"valasz": "Nincs jogosultságod ehhez a művelethez!"})
            }
            next();
        }
    }

}

module.exports = authMiddleware;