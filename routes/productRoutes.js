const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
<<<<<<< HEAD
=======

/**
 * @swagger
 * tags:
 *   name: Termékek
 *   description: Termékek kezelése
 */
>>>>>>> origin/main

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
router.get("/", function (keres, valasz) {
    valasz.header("Access-Control-Allow-Origin", "*");
    //1. sql szkript megírása
    const sql = "SELECT id, kategoria_id AS 'kategoriaAzonosito', nev AS 'termekNev', egysegar AS 'ar', keszlet_db AS 'keszleten' FROM `termekek`";

    //2. szkript futtatása, válasz összeállítása
    adatbazis.query(sql, [], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": hiba.message
            })
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
router.put('/:azonosito', function (keres, valasz) {
    const azonosito = keres.params.azonosito;
    const termek = keres.body;
    const sql = "UPDATE `termekek` SET `kategoria_id`=?,`nev`=?,`egysegar`=?,`keszlet_db`=? WHERE `id`=?";

    if (termek.ar < 0 || termek.darabSzam < 0) {
        return valasz.status(400).json({ "valasz": "Az ár és a darabszám nem lehet negatív érték!" })
    }
    adatbazis.query(sql, [termek.kategoriaId, termek.termekNev, termek.ar, termek.darabSzam, azonosito], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message })
        }
        if (eredmeny.affectedRows === 0) {
            return valasz.status(400).json({ "valasz": "Nincs ilyen termék a rendszerben!" });
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
})

//termék létrehozása
//TODO


//termék törlése
//TODO

<<<<<<< HEAD

=======
>>>>>>> origin/main
router.all(["/"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
})

module.exports = router;