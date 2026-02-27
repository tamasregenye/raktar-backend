const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');

<<<<<<< HEAD
/**
 * @swagger
 * tags:
 *    name: Mozgások 
 *    description: Raktármozgások kezelése
 */

=======

/**
 * @swagger
 * tags:
 *   name: Mozgások
 *   description: Raktár mozgások kezelése
 */

//mozgások lekérése
//TODO
router.get("/", (keres,valasz)=> {
    const sql = "SELECT * FROM raktar_mozgasok"
    adatbazis.query(sql, function (hiba, eredmeny){
        if (hiba) {
            return valasz.status(500).json({"valasz": hiba.message})
        }
        valasz.status(200).json(eredmeny)
    })
})
>>>>>>> origin/main

//mozgások módosítása

/**
 * @swagger
 * /api/mozgasok/{mozgasId}:
 *   put:
<<<<<<< HEAD
 *     summary: "Raktármozgás módosítása"
 *     description: "Ez a végpont teszi lehetővé egy meglévő raktármozgás adatainak módosítását."
 *     tags: ["Mozgások"]
 *     parameters: 
=======
 *     summary: "Raktár mozgás módosítása"
 *     description: "Ez a végpont teszi lehetővé egy meglévő raktár mozgás adatainak módosítását az adatbázisban."
 *     tags: ["Mozgások"]
 *     parameters:
>>>>>>> origin/main
 *       - in: path
 *         name: mozgasId
 *         required: true
 *         type: number
 *     requestBody:
<<<<<<< HEAD
 *       reqired: true
 *       content: 
=======
 *       required: true
 *       content:
>>>>>>> origin/main
 *         application/json:
 *           schema:
 *             properties:
 *               termekId:
 *                 type: number
<<<<<<< HEAD
 *                 description: "A mozgáshoz kapcsolodó termék azonosítója"
 *               partnerId:
 *                 type: number
 *                 description: "A mozgáshoz kapcsolodó partner azonosítója"
 *               mennyiseg:
 *                 type: number
 *                 description: "A mozgás mennyisége"
=======
 *                 description: "A mozgáshoz kapcsolódó termék azonosítója"
 *               partnerId:
 *                 type: number
 *                 description: "A mozgáshoz kapcsolódó partner azonosítója"
 *               mennyiseg:
 *                 type: number
 *                 description: "Mozgás mennyisége - negatív vagy pozitív érték is lehet"
>>>>>>> origin/main
 *               datum:
 *                 type: string
 *                 format: date-time
 *                 description: "A mozgás dátuma és időpontja"
<<<<<<< HEAD
 *     responses: 
 *        200:
 *          description: "Sikeres módosítás"
 *        400:
 *          description: "Nem adta meg a szükséges adatot"
 *        404:
 *          description: "Nincs ilyen mozgás"
 *        500:
 *          description: "Hiba a szerveren"
 *      
 * 
 */    



=======
 *     responses:
 *       200:
 *         description: "Sikeres módosítás"
 *       400:
 *         description: "Hibás kérés, nem adta meg a szükséges adatokat!"
 *       404:
 *         description: "Hibás kérés, a megadott azonosítóval nem létezik rekord!"
 *       500:
 *         description: "Hiba történt a szerveren, nem sikerült módosítani a mozgást!"
 */
>>>>>>> origin/main
router.put("/:mozgasId", function (keres, valasz) {
    const mozgasId = keres.params.mozgasId;
    const termekId = keres.body.termekId;
    const partnerId = keres.body.partnerId;
    const mennyiseg = keres.body.mennyiseg;
    const datum = keres.body.datum;

    if (!mozgasId || !termekId || !partnerId || !mennyiseg || !datum) {
        return valasz.status(400).json(
            { "valasz": "Nem adta meg a szükséges adatokat!" }
        );
    }

    const sql = "UPDATE `raktar_mozgasok` SET `termek_id`=?,`partner_id`=?,`mennyiseg`=?,`datum`=? WHERE `id`=?";
<<<<<<< HEAD
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId]
=======
    const variables = [termekId, partnerId, mennyiseg, datum, mozgasId];
>>>>>>> origin/main

    adatbazis.query(sql, variables, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json(
                { "valasz": "Hiba a szerveren." }
            );
        }

        if (eredmeny.affectedRows < 1) {
            return valasz.status(404).json(
<<<<<<< HEAD
                {"valasz": "Nincs ilyen mozgás!"}
            );     
=======
                { "valasz": "Nincs ilyen mozgás!" }
            );
>>>>>>> origin/main
        }

        valasz.status(200).json(
            { "valasz": "Sikeres módosítás!" }
        );

    });
<<<<<<< HEAD

});


=======
});

//mozgások létrehozása
//TODO
router.post("/", function (keres, valasz) {
    const termekId = keres.body.termekId;
    const partnerId = keres.body.partnerId;
    const mennyiseg = keres.body.mennyiseg;
    const datum = keres.body.datum;

    if (!termekId || !partnerId || !mennyiseg || !datum) {
        return valasz.status(400).json(
            {
                "valasz": "Hiányzó adatok!"
            }
        )
    }

    const sql = "INSERT INTO raktar_mozgasok (termek_id, partner_id, mennyiseg, datum) VALUES (?,?,?,?)";

    adatbazis.query(sql, [termekId, partnerId, mennyiseg, datum], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json(
                { "valasz": "Hiba a szerveren." }
            );
        }
        valasz.status(201).json(
            {
                "uzenet": "Mozgás sikeresen rögzítve",
                "id": eredmeny.insertId,
                "termekId": termekId,
                "partnerId": partnerId,
                "mennyiseg": mennyiseg,
                "datum": datum
            }
        )
    })

})

//mozgások törlése
//TODO
router.delete('/:azonosito', (keres, valasz) => {
    const mozgasId = keres.params.azonosito;
    const sql = "DELETE FROM `raktar_mozgasok` WHERE id = ?";

    adatbazis.query(sql, mozgasId, (hiba, eredmeny) => {
        if (hiba) {
            return valasz.status(500).json({ "valasz": "A mozgás törlése sikertelen, szerverhiba történt." });
        }

        if (eredmeny.affectedRows < 1) {
            return valasz.status(404).json({ "valasz": "Nincs ilyen mozgás a rendszerben!" });
        }

        valasz.status(200).json(
            { "valasz": "Sikeres törlés!" }
        );
    })
})
>>>>>>> origin/main

router.all(["", "/:mozgasId"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
})

module.exports = router;