//csomagok importálása, változóba mentése hogy elérjük a metódusait
const express = require('express');

//route-ok importálása
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const movementRoutes = require('./routes/movementRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');
const { notFoundHandler, serverErrorHandler } = require('./middlewares/errorHandler');
const corsMiddleWare = require('./middlewares/cors');

//portszám 
const port = 3000;

//express szerver beállítása
const app = express();
app.use(express.json());

//cors köztes réteg használata
app.use(corsMiddleWare);

//route-ok használata
app.use('/api/termekek', productRoutes);
app.use('/api/kategoriak', categoryRoutes);
app.use('/api/partnerek', partnerRoutes);
app.use('/api/mozgasok', movementRoutes);
app.use('/api/docs', swaggerRoutes);

//hiba kezelő köztes rétegek használata
app.use(notFoundHandler);

//hiba kezelő adatbázis hibákra
app.use(serverErrorHandler);

//szerver elindítása a megfelelő porton
app.listen(port, function () {
    console.log("Fut a szerver!", port);
})