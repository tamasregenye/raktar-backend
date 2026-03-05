const request = require('supertest');
const express = require('express');
const { productPutValidator } = require('../validators/productValidator');
const productController = require('../controllers/productController');

const app = express();
app.use(express.json());

// tesztelni kívánt végpont
app.put("/api/termekek/:azonosito", productPutValidator, productController.putProduct);

//csoport a tesztekhez
describe('PUT /api/termekek/:azonosito tesztelése', () => {

    //1. teszteset
    it('400-as hibát kell dobnia, ha az azonosító nem szám', async () => {

        //kérés küldése a szervernek
        //szerver válasza eltárolva a 'valasz' változóban
        const valasz = await request(app)
            .put('/api/termekek/ipari')
            .send({
                "kategoriaId": 1,
                "termekNev": "Kalapács",
                "ar": 1000,
                "darabSzam": 10
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "azonosito")).toBeTruthy();
    });

    //2. teszteset
    it('400-as hibát kell dobnia, ha az kategória azonosító nem szám, vagy nincs megadva', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": "asd",
                "termekNev": "Kalapács",
                "ar": 1000,
                "darabSzam": 10
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "kategoriaId")).toBeTruthy();
    });

    //3. teszteset
    it('400-as hibát kell dobnia, ha az kategória azonosító nincs megadva', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": "",
                "termekNev": "Kalapács",
                "ar": 1000,
                "darabSzam": 10
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "kategoriaId")).toBeTruthy();
    });

    //4. teszteset
    it('400-as hibát kell dobnia, ha a terméknév nincs megadva', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": "1",
                "termekNev": "",
                "ar": 1000,
                "darabSzam": 10
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "termekNev")).toBeTruthy();
    });

    //5. teszteset
    it('400-as hibát kell dobnia, ha a terméknév szám', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": "1",
                "termekNev": 1,
                "ar": 1000,
                "darabSzam": 10
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "termekNev")).toBeTruthy();
    });

    //6. teszteset
    it('400-as hibát kell dobnia, ha az ár nem szám', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": "1",
                "termekNev": "Kalapács",
                "ar": "asd",
                "darabSzam": 10
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "ar")).toBeTruthy();
    });

    //7. teszteset
    it('400-as hibát kell dobnia, ha az ár nincs megadva', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": "1",
                "termekNev": "Kalapács",
                "ar": "",
                "darabSzam": 10
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "ar")).toBeTruthy();
    });

    //8. teszteset
    it('400-as hibát kell dobnia, ha a darabszám nem szám', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": "1",
                "termekNev": "Kalapács",
                "ar": 1000,
                "darabSzam": "asd"
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "darabSzam")).toBeTruthy();
    });

    //9. teszteset
    it('400-as hibát kell dobnia, ha a darabszám nincs megadva', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": "1",
                "termekNev": "Kalapács",
                "ar": 1000,
                "darabSzam": ""
            });

        expect(valasz.status).toBe(400); // if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === "darabSzam")).toBeTruthy();
    });

    //10. teszteset OK
    it('200-as statusz ellenőrzése formailag helyes adatok esetében', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": 1,
                "termekNev": "Kalapács",
                "ar": 1000,
                "darabSzam": 10
            })
        expect(valasz.status).toBe(200);
    });
});