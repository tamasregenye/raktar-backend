const adatbazis = require("../adatbazis");

const authModel = {
    insertUser: (email, jelszo, nev, callback) => {
        const sql = "INSERT INTO `felhasznalok`(`email`, `jelszo`, `nev`) VALUES (?, ?, ?)";
        adatbazis.query(sql, [email, jelszo, nev], callback);
    },

    getUser: (email, callback) => {
        const sql = "SELECT * FROM `felhasznalok` WHERE email = ?;";
        adatbazis.query(sql, [email], callback);
    },

    updateUserLastLogin: (id, callback) => {
        const sql = "UPDATE `felhasznalok` SET `legutobbi_bejelentkezes`=CURRENT_TIMESTAMP WHERE id = ?;";
        adatbazis.query(sql, [id], callback);
    }

}

module.exports = authModel;