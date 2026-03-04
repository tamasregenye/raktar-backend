const adatbazis = require("../adatbazis");

const productModel = {
<<<<<<< HEAD
    selectlProducts: (callback) => {
=======
    selectProducts: (callback) => {
>>>>>>> origin/main
        const sql = "SELECT id, kategoria_id AS 'kategoriaAzonosito', nev AS 'termekNev', egysegar AS 'ar', keszlet_db AS 'keszleten' FROM `termekek`";
        adatbazis.query(sql, callback);
    },

<<<<<<< HEAD
    updateProduct: (azonosito, termek, callback) => {
=======
    updateProduct: (azonosito, termek, callback) =>{
>>>>>>> origin/main
        const sql = "UPDATE `termekek` SET `kategoria_id`=?,`nev`=?,`egysegar`=?,`keszlet_db`=? WHERE `id`=?";
        adatbazis.query(sql, [termek.kategoriaId, termek.termekNev, termek.ar, termek.darabSzam, azonosito], callback)
    }
}

<<<<<<< HEAD
module.exports = productModel
=======
module.exports = productModel
>>>>>>> origin/main
