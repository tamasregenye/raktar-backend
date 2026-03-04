const categoryModel = require('../models/categoryModel');

/**
 * @swagger
 * tags:
 *   name: Kategóriák
 *   description: Kategóriák kezelése
 */

const categoryController = {
    //GET logika
    /**
     * @swagger
     * /api/kategoriak:
     *   get:
     *     summary: "Az összes kategóriák lekérése"
     *     description: "Ez a végpont lehetővé teszi az összes a rendszerben (adatbázisban) tárolt összes termékkategória lekérését egy listában. A kéréshez nem szükséges paraméter vagy törzs."
     *     tags: ["Kategóriák"]
     *     responses:
     *       200:
     *         description: "Sikeres lekérdezés. JSON tömböt ad vissza, amely a kategóriák objektumait tartalmazza (az adatbázis sémája alapján: id mint integer, és nev mint string)."
     *       500:
     *         description: "Szerver- vagy adatbázishiba történik. JSON válasz: {'valasz': 'hibaüzenet szövege'}."
     */
    getAllCategories: (keres, valasz, next) => {
        categoryModel.selectAllCategories((hiba, eredmeny) => {
            if (hiba) {
                return next(hiba);
            }
            valasz.status(200).json(eredmeny);
        })
    },

    //POST logika
    /**
     * @swagger
     * /api/kategoriak:
     *   post:
     *     summary: "Új kategória létrehozása."
     *     description: " Ez a végpont lehetővé teszi egy új kategória rögzítését az adatbázisban. A sikeres mentéshez kötelező megadni a kategória nevét a kérés törzsében."
     *     tags:
     *       - Kategóriák
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               kategoriaNev:
     *                 type: string
     *                 description: "Az új termékkategória neve."
     *     responses:
     *       201:
     *         description: " A kategória sikeresen rögzítve lett"
     *       400:
     *         description: " Validációs hiba, ha a kategórianév nem lett elküldve a törzsben."
     *       500:
     *         description: " Szerver- vagy adatbázishiba"
     */
    postCategory: (keres, valasz, next) => {
        //adatok kinyerése a kérés törzséből
        const kategoriaNev = keres.body.kategoriaNev;

        //adatok validálása
        if (!kategoriaNev) {
            return valasz.status(400).json({
                "valasz": "Nem adta meg a kategórianevet!"
            })
        }

        categoryModel.insertCategory(kategoriaNev, (hiba, eredmeny) => {
            if (hiba) {
                return next(hiba);
            }
            valasz.status(201).json({ "uzenet": "A kategória rögzítésre került!" });
        })
    }

    //PUT logika
    //TODO

    //DELETE logika
    //TODO
}

module.exports = categoryController