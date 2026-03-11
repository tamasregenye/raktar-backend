const jwt = require('jsonwebtoken')

const authMiddleware = {
    verifyToken: (keres, valasz, next) => {
        const auth = keres.headers['authorization']
        //const token= auth.split(" ")[1]
        let token = auth

        if(auth.startsWith('Bearer')){
            token=auth.split(' ')[1]
        }

        if(!token) {
            return valasz.status(401).json({
                "uzenet" : "Hozzáférés megtagadva"
            })
        }

        try {
            const dekodoltToken = jwt.verify(token, process.env.JWT_TOKEN_KEY)
            
            keres.felhasznalo = dekodoltToken
            next()
            
        } catch (hiba) {
            return valasz.status(403).json({
                "ueznet" : "Érvénytelen vagy lejárt hitelesítési adatok"
            })
            
        }

        


    }
}

module.exports = authMiddleware