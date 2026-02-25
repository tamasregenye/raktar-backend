//csomagok importálása, változóba mentése hogy elérjük a metódusait
const express = require('express');

const termekekRouter = require("./routes/termekekRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const partnerRoutes = require("./routes/partnerRoutes")

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

//Router
app.use("/api/termekek", termekekRouter)
app.use("/api/kategoriak", categoryRoutes)
app.use("/api/partnerek", partnerRoutes)

//szerver elindítása a megfelelő porton
app.listen(port, function () {
    console.log("Fut a szerver!", port);
})