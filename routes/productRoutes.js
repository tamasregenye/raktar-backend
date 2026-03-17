const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
const {productPutValidator} = require('../validators/productValidator')
const productController = require('../controllers/productController')

/**
 * @swagger
 * tags:
 *   name: Termékek
 *   description: Termékek kezelése
 */

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
router.get("/", function (keres, valasz, next) {
    valasz.header("Access-Control-Allow-Origin", "*");
    //1. sql szkript megírása
    const sql = "SELECT id, kategoria_id AS 'kategoriaAzonosito', nev AS 'termekNev', egysegar AS 'ar', keszlet_db AS 'keszleten' FROM `termekek`";

    //2. szkript futtatása, válasz összeállítása
    adatbazis.query(sql, [], function (hiba, eredmeny) {
        if (hiba) {
            return next(valasz);
        }
        valasz.status(200).json(eredmeny);
    })

})


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
 *         description: "Hibás kérés, a megadott azonosítóval nem létezik rekord vagy validációs hiba(negatív ár vagy darabszám)!"
 *       500:
 *         description: "Hiba történt a szerveren, nem sikerült módosítani a mozgást!"
 */

//termék módosítása
router.put('/:azonosito', productPutValidator, productController.putProduct)

//termék létrehozása
//TODO


//termék törlése
//TODO



router.all(["/", "/:azonosito"], methodNotAllowed)

module.exports = router;