const request = require('supertest');
const express = require('express');
const { productPutValidator } = require('../validators/productValidator');
const productController = require('../controllers/productController');

const app = express();
app.use(express.json());

//tesztelni kívánt végpont
app.put("/api/termekek/:azonosito", productPutValidator, productController.putProduct);

describe('PUT /api/termekek/:azonosito tesztelése', () => {
    
    //1. teszteset
    it('400-as hibát kell dobnia, ha az azonosító nem szám', async () => {
        
        //kérés küldése a szervernek
        //szerver válasza eltárolva egy 'valasz' változóban
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

    //4. teszteset OK 200
    it('200-as hibát kell dobnia és ténylegesen módosítást kell végrehajtania az adatbázisban', async () => {
        
        //kérés küldése a szervernek
        //szerver válasza eltárolva egy 'valasz' változóban
        const valasz = await request(app)
        .put('/api/termekek/6')
        .send({
            "kategoriaId": 2,
            "termekNev": "Széf tele 24 karátos arany rögökkel",
            "ar": 59000000,
            "darabSzam": 2
        });

        expect(valasz.status).toBe(200); // if(valasz.status === 200)
        //expect(valasz.body.hibak).toBeUndefined();
    });

    //2. teszt
    //a kategória id nem nagyobb nullánál akkor 400-as hibakód.
    it('400-as hibát kell dobnia ha a kategória Id nem nagyobb nullánál', async () => {
     
    const valasz = await request(app)
        .put('/api/termekek/1')
        .send({
            "kategoriaId": 0,
            "termekNev": "Kalapács",
            "ar": 3000,
            "darabSzam": 10
        });

        expect(valasz.status).toBe(400); // if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'kategoriaId')).toBeTruthy();
    });

    //3. teszteset ha a terméknév nem szöveg vagy nincs megadva
    it('400-as hibát kell dobnia ha a terméknév nem szöveg vagy nincs megadva', async () => {
     
    const valasz = await request(app)
        .put('/api/termekek/1')
        .send({
            "kategoriaId": 1,
            "termekNev": 2,
            "ar": 3000,
            "darabSzam": 10
        });

        expect(valasz.status).toBe(400); // if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'termekNev')).toBeTruthy();
    });

    it('400-as hibát kell dobnia ha a terméknév nincs megadva', async () => {
     
    const valasz = await request(app)
        .put('/api/termekek/1')
        .send({
            "kategoriaId": 1,
            "ar": 3000,
            "darabSzam": 10
        });

        expect(valasz.status).toBe(400); // if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'termekNev')).toBeTruthy();
    });
    
    //5. teszteset: az ár nem pozitív szám

    it('400-as hibát kell dobnia ha az ár negatív szám', async () => {
     
    const valasz = await request(app)
        .put('/api/termekek/1')
        .send({
            "kategoriaId": 1,
            "termekNev": 2,
            "ar": -3000,
            "darabSzam": 10
        });

        expect(valasz.status).toBe(400); // if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'ar')).toBeTruthy();
    });
    
    //6. teszteset: ha a darabszám negatív
    it('400-as hibát kell dobnia ha az ár negatív szám', async () => {
     
    const valasz = await request(app)
        .put('/api/termekek/1')
        .send({
            "kategoriaId": 1,
            "termekNev": 2,
            "ar": 3000,
            "darabSzam": -10
        });

        expect(valasz.status).toBe(400); // if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'darabSzam')).toBeTruthy();
    });
});


