const express = require('express');
const router = express.Router();
const adatbazis = require('../adatbazis');
const { methodNotAllowed } = require('../utils/errors');
const productController = require('../controllers/productController');
const { productPutValidator } = require('../validators/productValidator');

//termekek lekérése
router.get("/", productController.getAllProduct)

//termék módosítása
router.put('/:azonosito', productPutValidator, productController.putProduct)

//termék létrehozása
//TODO


//termék törlése
//TODO
router.delete('/:azonosito', function(keres, valasz, next){
    const azonosito = keres.params.azonosito
    const sql ="DELETE FROM `termekek` WHERE `id`=?"

    adatbazis.query(sql,[azonosito],(hiba,eredmeny)=>{
        if(hiba){
            return next(hiba)
        }
        if(eredmeny.affectedRows===0){
            return valasz.status(404).json({"valasz": "Nincs ilyen termék a rendszerben!"})
        }
        valasz.status(200).json()
    })
})

router.all(["/", "/:azonosito"], methodNotAllowed)


module.exports = router;