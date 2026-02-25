//csomagok importálása, változóba mentése hogy elérjük a metódusait
const express = require('express');
const adatbazis = require('./adatbazis');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const movementRoutes = require('./routes/movementRoutes');

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

// routes
app.use("/api/termekek", productRoutes );
app.use("/api/kategoriak", categoryRoutes );
app.use("/api/partnerek", partnerRoutes );
app.use("/api/mozgasok", movementRoutes );

//szerver elindítása a megfelelő porton
app.listen(port, function () {
    console.log("Fut a szerver!", port);
})