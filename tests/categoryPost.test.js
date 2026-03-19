//alapok
const request = require('supertest');
const express = require('express');
const categoryController = require('../controllers/categoryController');
const { categoryPostValidator } = require('../validators/categoryValidator');

const app = express();
app.use(express.json());

/**--------------------------------------------------------- */

//konkrét feladat:
//melyik végpontot kell tesztelni?

// metódus meg lesz adva: "post"
// url meg lesz adva: "/api/kategoriak"
// validator meg lesz adva, készen rendelkezésre fog állni
// controller metódus meg lesz adva: "categoryController.postCategory"
// a kérés során küldendő kulcsnevek nem lesznek megadva! (de a swagger UI vagy az előző metódus kódjának megtekintésével rá lehet jönni)

// swagger UI használata:
// npm run start-test script segítségével futtatják a szervert
// böngészőben megnyitják a http://localhost:3000/api/docs oldalt
app.post("/api/kategoriak", categoryPostValidator, categoryController.postCategory)

// tesztcsoport készítése -> desc kulcsszóval elérhető a sablon
describe('POST /api/kategoriak tesztelése', () => {
    // 1. teszteset -> sikeres létrehozás
    it('201-es státuszkódot kell kapnunk sikeres kategória létrehozás esetén', async () => {
        const valasz = await request(app)
            .post("/api/kategoriak")
            .send({
                "kategoriaNev": "Teszt kategória"
            });
        
        //ellenőrzés
        expect(valasz.status).toBe(201);
        expect(valasz.body.uzenet).toBe("A kategória rögzítésre került!");
    });

    // 2. teszteset -> hiányzó adat miatti hiba
    it('400-es státuszkódot kell kapnunk hiányzó kategóriaNév esetén', async () => {
        const valasz = await request(app)
            .post("/api/kategoriak")
            .send({
                //most üresen hagyjuk
            });
        
        //ellenőrzés
        expect(valasz.status).toBe(400);
    });

    // 3. teszteset 
    it('400-as státuszkódot kell kapnunk üres kategóriaNév esetén', async () => {
        const valasz = await request(app)
            .post("/api/kategoriak")
            .send({
                "kategoriaNev": "    "
            });
        
        //ellenőrzés
        expect(valasz.status).toBe(400);
        expect(valasz.body.hibak.find(err => err.mezo === 'kategoriaNev')).toBeTruthy();
    });
});