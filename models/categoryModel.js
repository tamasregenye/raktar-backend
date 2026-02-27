const adatbazis = require('../adatbazis');

const categoryModel = {
    selectAllCategories: (callback) => {
        const sql = "SELECT * FROM kategoriak";
        adatbazis.query(sql, callback);
    },

    insertCategory: (kategoriaNev, callback) => {
        const sql = "INSERT INTO `kategoriak`(`nev`) VALUES (?)";
        adatbazis.query(sql, [kategoriaNev], callback);
    }
}

module.exports = categoryModel;