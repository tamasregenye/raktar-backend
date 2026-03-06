const request = require('supertest');
const express = require('express');
const { productPutValidator } = require('../validators/productValidator');
const productController = require('../controllers/productController');

const app = express();
app.use(express.json());

//teszteltni kívánt végpont
app.put("/api/termekek/:azonosito", productPutValidator, productController.putProduct);

//csoport a teszthez
describe('PUT /api/termekek/:azonosito tesztelése', () => {
    //1. teszteset 400
    it('400-as hibát kell dobnia, ha az azonosító nem szám', async () => {
        
        //kérés küldése a szervernek
        //szerver válasza eltárolva a 'válasz' változóban
        const valasz = await request(app)
        .put('/api/termekek/ipari')
        .send({
            "kategoriaId": 1,
            "termekNev": "Kalapács",
            "ar": 3000,
            "darabSzam": 10
        });

        expect(valasz.status).toBe(400); //if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'azonosito')).toBeTruthy();
    });
    //2. teszteset
    it('400-as hibát kell dobnia, ha a kategoriaId nem nagyobb 0-nál', async () => {
        
        //kérés küldése a szervernek
        //szerver válasza eltárolva a 'válasz' változóban
        const valasz = await request(app)
        .put('/api/termekek/11')
        .send({
            "kategoriaId": 0,
            "termekNev": "Kalapács",
            "ar": 3000,
            "darabSzam": 10
        });

        expect(valasz.status).toBe(400); //if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'kategoriaId')).toBeTruthy();
    });

    //3. teszteset
    it('400-as hibát kell dobnia, ha a termekNev nem string', async () => {
        
        //kérés küldése a szervernek
        //szerver válasza eltárolva a 'válasz' változóban
        const valasz = await request(app)
        .put('/api/termekek/11')
        .send({
            "kategoriaId": 1,
            "termekNev": 1,
            "ar": 3000,
            "darabSzam": 10
        });

        expect(valasz.status).toBe(400); //if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'termekNev')).toBeTruthy();
    });


    //4. teszteset OK 200
    it('200-as kódot kell dobnia, ha minden rendben volt és sikerült a változtatás', async () => {
        
        //kérés küldése a szervernek
        //szerver válasza eltárolva a 'válasz' változóban
        const valasz = await request(app)
        .put('/api/termekek/11')
        .send({
            "kategoriaId": 2,
            "termekNev": "Kütyük",
            "ar": 7777,
            "darabSzam": 77
        });

        expect(valasz.status).toBe(200); //if(valasz.status === 200)
    });
    //5. teszteset
    it('400-as hibát kell dobnia, ha az ar nem pozitív egész szám', async () => {
        
        //kérés küldése a szervernek
        //szerver válasza eltárolva a 'válasz' változóban
        const valasz = await request(app)
        .put('/api/termekek/11')
        .send({
            "kategoriaId": 1,
            "termekNev": "Kalapács",
            "ar": -10,
            "darabSzam": 10
        });

        expect(valasz.status).toBe(400); //if(valasz.status === 400)
        expect(valasz.body.hibak.find(err => err.mezo === 'ar')).toBeTruthy();
    });
        //6. teszteset
        it('400-as hibát kell dobnia, ha a darabSzam nem pozitív szám', async () => {
        
            //kérés küldése a szervernek
            //szerver válasza eltárolva a 'válasz' változóban
            const valasz = await request(app)
            .put('/api/termekek/11')
            .send({
                "kategoriaId": 1,
                "termekNev": "Kalapács",
                "ar": 10,
                "darabSzam": -10
        });

            expect(valasz.status).toBe(400); //if(valasz.status === 400)
            expect(valasz.body.hibak.find(err => err.mezo === 'darabSzam')).toBeTruthy();
        });

});


