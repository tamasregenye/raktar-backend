const authModel = require("../models/authModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
    /**
     * @swagger
     *  tags:
     *      name: Auth
     *      description: Felhasználói regisztráció és bejelentkezés kezelése
     */

    /**
     * @swagger
     * /api/felhasznalok/regisztracio:
     *  post:
     *      tags: [Auth]
     *      summary: Új felhasználó regisztrációja
     *      description: Ez a végpont lehetővé teszi új felhasználó létrehozását az adatbázisban.
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                              format: email
     *                              description: A felhasználó email címe. Kötelező mező.
     *                          jelszo:
     *                              type: string
     *                              format: password
     *                              description: A felhasználó jelszava. Kötelező mező
     *                          szerepkor:
     *                              type: string
     *                              enum: [user, admin]
     *                              description: A felhasználó szerepköre.
     *                          nev:
     *                              type: string
     *                              description: A felhasználó neve. Kötelező mező.
     *                      required:
     *                          -   email
     *                          -   jelszo
     *                          -   nev                 
     *      responses:
     *          200:
     *              description: Sikeres regisztráció
     *          400:
     *              description: A megadott email cimmel már létezik az adatbázisban.
     *          500:
     *              description: Szerverhiba
     */
    registerUser: async (keres, valasz, next) => {
        //kérés törzsében megadott adatok kinyerése, eltárolása
        const { email, jelszo, nev } = keres.body;

        //jelszó titkosítása
        const hashedPassword = await bcrypt.hash(jelszo, 10);

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

    /**
     * @swagger
     * /api/felhasznalok/bejelentkezes:
     *  post:
     *      tags: [Auth]
     *      summary: Felhasználó bejelentkezés
     *      description: Ez a végpont lehetővé teszi új felhasználó létrehozását az adatbázisban.
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                              format: email
     *                              description: A felhasználó email címe. Kötelező mező.
     *                          jelszo:
     *                              type: string
     *                              format: password
     *                              description: A felhasználó jelszava. Kötelező mező
     *                      required:
     *                          -   email
     *                          -   jelszo
     *      responses:
     *          200:
     *              description: Sikeres bejelentkezés
     *          400:
     *              description: A megadott email cimmel már létezik az adatbázisban.
     *          401:
     *              description: Hibás email cím vagy jelszó!
     *          403:
     *              description: A megadott felhasználói fiók nem aktív!
     *          500:
     *              description: Szerverhiba
     */
    loginUser: (keres, valasz, next) => {
        const { email, jelszo } = keres.body;

        //létezik felhasználó a megadott email cimmel
        authModel.getUser(email, async (hiba, eredmeny) => {
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
            //titkosított jelszó ellenőrzése
            //const jelszoHelyes = (jelszo === felhasznalo.jelszo)
            const jelszoHelyes = await bcrypt.compare(jelszo, felhasznalo.jelszo);

            if (!jelszoHelyes) {
                return valasz.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" })
            }

            //tokengenerálás
            const accessToken = jwt.sign(
                {
                    id: felhasznalo.id,
                    email: felhasznalo.email,
                    nev: felhasznalo.nev,
                    szerepkor: felhasznalo.szerepkor,

                },
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: 60
                }
            );

            const refreshToken = jwt.sign(
                {
                    id: felhasznalo.id,
                    email: felhasznalo.email,
                    nev: felhasznalo.nev,
                    szerepkor: felhasznalo.szerepkor,
                },
                process.env.REFRESH_TOKEN_KEY,
                {
                    expiresIn: '7d'
                }
            )

            valasz.cookie('refreshToken', refreshToken, {
                httpOnly: false,
                //https-ről elérés szabályozása:
                secure: false,
                //csak a létrehozott oldalról (domain) lehet elérni a sütit
                sameSite: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            valasz.status(200).json({
                "valasz": "Sikeres bejelentkezés",
                "accessToken": accessToken,
                "felhasznalo": {
                    "id": felhasznalo.id,
                    "email": felhasznalo.email,
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor
                }
            })
        })
    },

    logoutUser: (keres, valasz) => {
        //süti törlés
        //kijelentkezéskor töröltetjük a böngészővel a refreshTokent
        valasz.clearCookie('refreshToken', {
            httpOnly: false,
            secure: false,
            sameSite: true,
        });

        valasz.status(200).json({ valasz: "Sikeres kijelentkezés!" });
    },

    refreshToken: (keres, valasz) => {
        const { refreshToken } = keres.cookies;

        if (!refreshToken) return valasz.status(401).json({ valasz: "Nincs refresh token! Új Access token nem generálható!" });

        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)

            //tokengenerálás
            const accessToken = jwt.sign(
                {
                    id: decodedRefreshToken.id,
                    email: decodedRefreshToken.email,
                    nev: decodedRefreshToken.nev,
                    szerepkor: decodedRefreshToken.szerepkor,

                },
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: 15
                }
            );

            valasz.status(200).json({ accesToken: accessToken });
        } catch (error) {
            return valasz.status(403).json({ valasz: "Érvénytelen vagy lejárt refresh token!" });
        }

    }
}

module.exports = authController;