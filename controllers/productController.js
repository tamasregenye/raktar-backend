const productModel = require("../models/ProductModel")

const productController = {
    /**
     * @swagger
     * tags:
     *   name: Termékek
     *   description: Termékek kezelése
     */

    //GET logika
    //termekek lekérése
    /**
     * @swagger
     * /api/termekek:
     *   get:
     *     summary: Az összes termék lekérése
     *     description: Ez a végpont lehetővé teszi az összes termék lekérdezését az adatbázisból.
     *     tags: [Termékek]
     *     responses:
     *       200:
     *         description: Sikeres lekérdezés
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   kategoriaAzonosito:
     *                     type: integer
     *                   termekNev:
     *                     type: string
     *                   ar:
     *                     type: number
     *                   keszleten:
     *                     type: integer
     *       500:
     *         description: Szerver hiba
     */
    getAllProducts: (keres, valasz, next) => {
        productModel.selectProducts((hiba, eredmeny) => {
            if (hiba) {
                return next(valasz);
            }
            valasz.status(200).json(eredmeny);
        })
    },

    //PUT logika

    /**
     * @swagger
     * /api/termekek/{azonosito}:
     *   put:
     *     summary: "Meglévő termék adatainak frissítése."
     *     description: "Ez a végpont lehetővé teszi egy, az adatbázisban meglévő termék adatainak módosítását."
     *     tags: ["Termékek"]
     *     parameters:
     *       - in: path
     *         name: azonosito
     *         required: true
     *         type: number
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             properties:
     *               kategoriaId:
     *                 type: integer
     *                 description: "A kapcsolódó termék kategóriájának azonosítója"
     *               termekNev:
     *                 type: string
     *                 description: "A kapcsolódó termék neve"
     *               ar:
     *                 type: number
     *                 description: "A kapcsolódó termék ára"
     *               darabSzam:
     *                 type: integer
     *                 description: "A kapcsolódó termékek darabszáma"
     *     responses:
     *       200:
     *         description: "Sikeres módosítás"
     *       400:
     *         description: "Hibás kérés, validációs hiba!"
     *       404:
     *         description: "Hibás kérés, a megadott azonosítóval nem létezik rekord!"
     *       500:
     *         description: "Hiba történt a szerveren, nem sikerült módosítani a mozgást!"
     */
    putProduct: (keres, valasz, next) => {
        //szükséges adatok
        const azonosito = keres.params.azonosito;
        const termek = keres.body;

        //validáció
        if (termek.ar < 0 || termek.darabSzam < 0) {
            return valasz.status(400).json({ "valasz": "Az ár és a darabszám nem lehet negatív érték!" })
        }

        //adatbázisműveletre vonatkozó metódus meghívása
        productModel.updateProduct(azonosito, termek, (hiba, eredmeny) => {
            if (hiba) {
                return next(hiba);
            }
            if (eredmeny.affectedRows === 0) {
                return valasz.status(404).json({ "valasz": "Nincs ilyen termék a rendszerben!" });
            }
            valasz.status(200).json({
                "uzenet": "Sikeres frissítés",
                "id": azonosito,
                "kategoriaId": termek.kategoriaId,
                "termekNev": termek.termekNev,
                "ar": termek.ar,
                "darabSzam": termek.darabSzam
            })
        })
    }

    //POST logika
    //TODO


    //DELETE logika
    //TODO

}

module.exports = productController