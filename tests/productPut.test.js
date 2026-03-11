const request = require('supertest');
const express = require('express');
const { productPutValidator } = require('../validators/productValidator');
const productController = require('../controllers/productController');

const app = express();
app.use(express.json());

app.put("/api/termekek/:azonosito", productPutValidator, productController.putProduct);

describe('PUT /api/termekek/:azonosito tesztelése', () => {
    it('400-as hibát kell dobnia, ha az azonosító nem szám', async () => {
        const valasz = await request(app)
            .put('/api/termekek/ipari')
            .send({
                "kategoriaId": 1,
                "termekNev": "kecskebéka",
                "ar": 1000,
                "darabSzam": 100
            });

        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'azonosito')).toBeTruthy();
    });

    it('200as státuszkód, ha minden adat megfelel', async () => {
        const valasz = await request(app)
            .put('/api/termekek/10')
            .send({
                "kategoriaId": 2,
                "termekNev": "kecske-béka",
                "ar": 1000,
                "darabSzam": 100
            });

        expect(valasz.status).toBe(200)
    });

    it('400-as hibát kell dobnia, ha az azonosító nem létezik', async () => {
        const valasz = await request(app)
            .put('/api/termekek/10')
            .send({
                "termekNev": "kecske-béka",
                "ar": 1000,
                "darabSzam": 100
            });

        expect(valasz.status).toBe(400)
    });

    it('400-as hibát kell dobnia, ha a termeknev nem létezik', async () => {
        const valasz = await request(app)
            .put('/api/termekek/10')
            .send({
                "kategoriaId": 2,
                "ar": 1000,
                "darabSzam": 100
            });

        expect(valasz.status).toBe(400)
    });

    it('400-as hibát kell dobnia, ha az ar nem létezik', async () => {
        const valasz = await request(app)
            .put('/api/termekek/10')
            .send({
                "kategoriaId": 2,
                "termekNev": "kecske-béka",
                "darabSzam": 100
            });

        expect(valasz.status).toBe(400)
    });

    it('400-as hibát kell dobnia, ha a darabszam nem létezik', async () => {
        const valasz = await request(app)
            .put('/api/termekek/10')
            .send({
                "kategoriaId": 2,
                "termekNev": "kecske-béka",
                "ar": 1000,
            });

        expect(valasz.status).toBe(400)
    });

    it('400-as hibát kell dobnia, ha az kategoriaid nem szám', async () => {
        const valasz = await request(app)
            .put('/api/termekek/10')
            .send({
                "kategoriaId": "igenismegnemis",
                "termekNev": "kecske-béka",
                "ar": 1000,
                "darabSzam": 100
            });

        expect(valasz.status).toBe(400)
    });

        it('400-as hibát kell dobnia, ha az terméknév szám', async () => {
        const valasz = await request(app)
            .put('/api/termekek/10')
            .send({
                "kategoriaId": "1",
                "termekNev": "123",
                "ar": 1000,
                "darabSzam": 100
            });

        expect(valasz.status).toBe(400);
          expect(valasz.body.hibak.find(err => err.mezo === 'termekNev')).toBeTruthy();
    });

});


