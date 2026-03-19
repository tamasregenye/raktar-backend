const authModel = require("../models/authModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
    /**
     * @swagger
     * tags:
     *   name: Auth
     *   description: Felhasználói regisztráció és bejelentkezés kezelése
     */

    /**
     * @swagger
     * /api/felhasznalok/regisztracio:
     *   post:
     *     tags: [Auth]
     *     summary: Felhasználói regisztráció
     *     description: Felhasználói regisztráció
     *     requestBody:
     *       requried: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: A felhasználó email címe. Kötelező mező.
     *               jelszo:
     *                 type: string
     *                 description: A felhasználó jelszava. Legalább 8 karakter.
     *               nev:
     *                 type: string
     *                 description: A felhasználó neve. Kötelező mező
     *             required:
     *               - email
     *               - jelszo
     *               - nev           
     *     responses:
     *       201:
     *         description: Sikeres regisztráció!
     *       400:
     *         description: Validációs hiba.
     *       409:
     *         description: A megadott email címmel már regisztráltak.
     *       500:
     *         description: Szerver hiba.
     */
    registerUser: async (keres, valasz, next) => {
        //kérés törzsében megadott adatok kinyerése, eltárolása
        const email = keres.body.email;
        const password = keres.body.jelszo;
        const name = keres.body.nev;

        //jelszó titkosítása
        const hashedPassword = await bcrypt.hash(password, 10);

        //sql script futtatása a Model állományból
        authModel.insertUser(email, hashedPassword, name, (hiba, eredmeny) => {

            if (hiba) {
                //megadott email létezik már?
                if (hiba.code === "ER_DUP_ENTRY") {
                    return valasz.status(409).json({ "valasz": "A megadott email címmel már regisztráltak." });
                }
                next(hiba);
            }

            //sikeres regisztráció
            valasz.status(201).json({ "valasz": "Sikeres regisztráció!" });

        })

    },

    /**
     * @swagger
     * /api/felhasznalok/bejelentkezes:
     *   post:
     *     tags: [Auth]
     *     summary: Felhasználói bejelentkezés
     *     description: Felhasználói bejelentkezés
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: A felhasználó email címe. Kötelező mező.
     *               jelszo:
     *                 type: string
     *                 description: A felhasználó jelszava. Legalább 8 karakter.
     *     responses:
     *       200:
     *         description: Sikeres bejelentkezés
     *       400:
     *         description: A megadott email címmel már regisztráltak.
     *       401:
     *         description: Hibás email cím vagy jelszó!
     *       403: 
     *         description: A fiók deaktiválva van!
     *       500:
     *         description: Szerver hiba.
     *             
     *     
     */
    loginUser: (keres, valasz, next) => {
        const email = keres.body.email;
        const password = keres.body.jelszo;

        //létezik felhasználó a megadott email címmel?
        authModel.selectUserByEmail(email, async (hiba, eredmeny) => {
            if (hiba) {
                return next(hiba);
            }

            if (eredmeny.length === 0) {
                return valasz.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" });
            }

            const felhasznalo = eredmeny[0];

            //inaktív-e a felhasználói fiók?
            if (felhasznalo.aktiv === 0) {
                return valasz.status(403).json({ "valasz": "A fiók deaktiválva van!" });
            }

            //helyes jelszó?
            const jelszoHelyes = await bcrypt.compare(password, felhasznalo.jelszo);

            if (!jelszoHelyes) {
                return valasz.status(401).json({ "valasz": "Hibás email cím vagy jelszó!" })
            }

            //token generálás
            const accessToken = jwt.sign(
                {
                    "id": felhasznalo.id,
                    "email": felhasznalo.email,
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor,
                },
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: '1h'
                }
            );

            const refreshToken = jwt.sign(
                {
                    "id": felhasznalo.id,
                    "email": felhasznalo.email,
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor,
                },
                process.env.REFRESH_TOKEN_KEY,
                {
                    expiresIn: '7d'
                }
            );
            
            valasz.cookie('refreshToken', refreshToken, {
                httpOnly: false,
                secure: false,
                sameSite: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            valasz.status(200).json({
                "valasz": "Sikeres bejelentkezés",
                "accessToken": accessToken,
                //"refreshToken": refreshToken,
                "felhasznalo": {
                    "id": felhasznalo.id,
                    "email": felhasznalo.email,
                    "nev": felhasznalo.nev,
                    "szerepkor": felhasznalo.szerepkor,
                }
            })

        })
    },

    logoutUser: (keres, valasz) => {
        // süti törlése
        // kijelentkezéskor töröltetjük a böngészővel a refreshTokent

        valasz.clearCookie('refreshToken', {
            httpOnly: false,
            secure: false,
            sameSite: true,
        });

        valasz.status(200).json({ "valasz": "Sikeres kijelentkezés!" });
    },

    refreshToken: (keres, valasz) => {
        const { refreshToken } = keres.cookies;

        if (!refreshToken) {
            return valasz.status(401).json({ "valasz": "Nincs refresh token! Új Access token nem generálható!" });
        }

        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

            //token generálás
            const accessToken = jwt.sign(
                {
                    "id": decodedRefreshToken.id,
                    "email": decodedRefreshToken.email,
                    "nev": decodedRefreshToken.nev,
                    "szerepkor": decodedRefreshToken.szerepkor,
                },
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: 15
                }
            );

            valasz.status(200).json({ "accessToken": accessToken });

        }
        catch (error) {
            return valasz.status(403).json({ "valasz": "Érvénytelen vagy lejárt refresh token!" });
        }
    }
}

module.exports = authController