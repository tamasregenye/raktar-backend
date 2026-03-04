const adatbazis = require('../adatbazis')

const productModel = {
    selectAllProducts: (callback) => {
        const sql = "SELECT id, kategoria_id AS 'kategoriaAzonosito', nev AS 'termekNev', egysegar AS 'ar', keszlet_db AS 'keszleten' FROM `termekek`";

        adatbazis.query(sql, callback)
    },

    updateProduct: (termek, azonosito, callback) => {
        const sql = "UPDATE `termekek` SET `kategoria_id`=?,`nev`=?,`egysegar`=?,`keszlet_db`=? WHERE `id`=?";

        adatbazis.query(sql, [termek.kategoriaId, termek.termekNev, termek.ar, termek.darabSzam, azonosito], callback)
    }
}

module.exports = productModel