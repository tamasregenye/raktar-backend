//csomagok importálása, változóba mentése hogy elérjük a metódusait
const express = require('express');
const adatbazis = require('./adatbazis');

//portszám 
const port = 3000;

//express szerver beállítása
const app = express();
app.use(express.json());


app.use( function(keres, valasz, next){
    valasz.header("Access-Control-Allow-Origin", "*");
    valasz.header("Access-Control-Allow-Headers", "Content-Type")
    valasz.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    next();
})

//végpontok létrehozása, definiálása
app.get("/api/termekek", function (keres, valasz) {
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

app.get("/api/kategoriak", function (keres, valasz) {
    const sql = "SELECT * FROM kategoriak";
    adatbazis.query(sql, function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({ "valasz": hiba.message });
        }
        valasz.status(200).json(eredmeny);
    })
})

app.post('/api/kategoriak', function (keres, valasz) {
    const kategoriaNev = keres.body.kategoriaNev;
    const sql = "INSERT INTO `kategoriak`(`nev`) VALUES (?)";

    if (!kategoriaNev) {
        return valasz.status(400).json({
            "valasz": "Nem adta meg a kategórianevet!"
        })
    }

    adatbazis.query(sql, [kategoriaNev], function (hiba, eredmeny) {
        if (hiba) {
            return valasz.status(500).json({
                "valasz": hiba.message
            });
        }
        valasz.status(201).json({ "uzenet": "A feladat rögzítésre került!" });
    })
})

app.put('/api/termekek/:azonosito', function (keres, valasz) {
    const azonosito = keres.params.azonosito;
    const termek = keres.body;
    const sql = "UPDATE `termekek` SET `kategoria_id`=?,`nev`=?,`egysegar`=?,`keszlet_db`=? WHERE `id`=?";

    if(termek.ar < 0 || termek.darabSzam < 0){
        return valasz.status(400).json({"valasz": "Az ár és a darabszám nem lehet negatív érték!"})
    }
    adatbazis.query(sql, [termek.kategoriaId, termek.termekNev, termek.ar, termek.darabSzam, azonosito], function(hiba, eredmeny){
        if(hiba){
            return valasz.status(500).json({"valasz": hiba.message})
        }
        if(eredmeny.affectedRows === 0){
            return valasz.status(400).json({"valasz": "Nincs ilyen termék a rendszerben!"});
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

app.delete('/api/partnerek/:azonosito', function(keres, valasz){
    const azonosito = keres.params.azonosito;
    const sql = "DELETE FROM `partnerek` WHERE `id`=?";

    if(!azonosito){
        return valasz.status(400).json({"valasz": "Nem adott meg azonosítót!"});
    }

    adatbazis.query(sql, [azonosito], function(hiba, eredmeny){
        if(hiba){
            return valasz.status(500).json({"valasz": hiba.message});
        }
        if(eredmeny.affectedRows === 0){
            return valasz.status(404).json({"valasz": "Nincs ilyen azonosítójú alkalmazott!"});
        }
        valasz.status(204).json();
    })
})

//szerver elindítása a megfelelő porton
app.listen(port, function () {
    console.log("Fut a szerver!", port);
})