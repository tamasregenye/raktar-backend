const request = require('supertest');
const express = require('express');
const { productPutValidator } = require('../validators/productValidator');
const productController = require('../controllers/productController');

const app = express();

app.use(express.json())

app.put("/api/termekek/:azonosíto", productPutValidator, productController.putProduct)

describe('PUT /api/termekek/:azonosito tesztelése', () => {
    it('400-as hibát kell dobnia, ha az azonosító nem szám', async () => {
        const valasz = await request(app)
            .put('/api/termekek/szoveg')
            .send({
                "kategoriaId": 1,
                "termekNev": "Terméknév",
                "ar": 1000,
                "darabSzam": 10
            })
        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'azonosito')).toBeTruthy()
    });

    it('200-as státuszkódot kell dobnia, ha az azonosító szám és létezik', async () => {
        const valasz = await request(app)
            .put('/api/termekek/1')
            .send({
                "kategoriaId": 1,
                "termekNev": "Terméknév",
                "ar": 1000,
                "darabSzam": 10
            })
        expect(valasz.status).toBe(200)
    });

    it('404-es hibát kell dobnia, ha az azonosító szám viszont nem létezik', async () => {
        const valasz = await request(app)
            .put('/api/termekek/100')
            .send({
                "kategoriaId": 1,
                "termekNev": "Terméknév",
                "ar": 1000,
                "darabSzam": 10
            })
        expect(valasz.status).toBe(404)
    });
});
