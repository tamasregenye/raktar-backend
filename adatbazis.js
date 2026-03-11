const mysql2 = require('mysql2');
const path = require('path');
const envFile = process.env.NODE_ENV ==='test' ? './.env.test' : './.env';

require('dotenv').config({ path: path.join(__dirname, envFile) });
console.log(process.env.DB_USERNAME)

//adatbázishoz kapcsolódás
const adatbazis = mysql2.createConnection(
    {
        "host": process.env.HOST, //
        "user": process.env.DB_USERNAME,      //mysql fiók neve, amivel van hozzáférésünk az adatbázishoz
        "password": process.env.PASSWORD,      //mysql fiókhoz tartozó jelszó
        "database": process.env.DATABASE_NAME       //helyi adatbázis neve
    }
)

//nem kötelező, de érdemes
//adatbázis kapcsolat ellenőrzése a megadott adatokkal
adatbazis.connect(function (hiba) {
    if (hiba) {
        console.error("Hiba a MYSQL kapcsolódás során " + hiba);
        return;
    }
    console.log("Sikeres MYSQL kapcsolat");
})

module.exports = adatbazis;