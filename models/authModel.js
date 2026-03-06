const adatbazis = require("../adatbazis");

const authModel = {
    insertUser: (email, password, name, callback) =>{
        const sql = "INSERT INTO felhasznalok (`email`, `jelszo`, `nev`) VALUES (?, ?, ?);";
        adatbazis.query(sql, [email, password, name], callback);
    }
}

module.exports = authModel