const request = require('supertest');
const express = require('express');
const { productPutValidator } = require('../validators/productValidator');
const productController = require('../controllers/productController');

const app = express();
app.use(express.json());

//tesztelni kívánt végpont
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
                "ar": 3000,
                "darabSzam": 10
            });
        
        expect(valasz.status).toBe(400); // if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'azonosito')).toBeTruthy();
    });
});


