const adatbazis = require('../adatbazis')

const authModel = {
    insertUser: (email, jelszo, nev, callback) =>{
        const sql = "INSERT INTO `felhasznalok`(`email`, `jelszo`, `nev`) VALUES (?,?,?)"
        adatbazis.query(sql, [email, jelszo, nev], callback)

    },

    selectUserByEmail: (email, callback) => {
        const sql = "SELECT * FROM `felhasznalok` WHERE `email`=?;"
        adatbazis.query(sql,[email], callback)
    },

    updateLastCheckedIn: (id, legutobbi_bejelentkezes, callback) => {
        const sql=""
    }


}

module.exports = authModel