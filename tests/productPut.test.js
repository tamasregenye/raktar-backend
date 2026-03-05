const request = require('supertest');
const express = require('express');

const { productPutValidator } = require('../validators/productValidator');
const productController = require('../controllers/productController');

const app = express();
app.use(express.json())

//tesztelni kívánt végpont
app.put("/api/termekek/:azonosito", productPutValidator, productController.putProduct)

//csoport a tesztekhez
describe('PUT /api/termekek/:azonosito tesztelése', () => {

    //1. tesztelés
    it('400-as hibát kell dobnia, ha az azonosító nem szám', async () => {

        //kérés küldése a szervernek
        //szerver válasz eltárolva a "valasz" változóban
        const valasz = await request(app).put('/api/termekek/ipari').send({
            "kategoriaId": 99,
            "termekNev": "Kütyümütyü",
            "ar": 99,
            "darabSzam": 99
        })

        expect(valasz.status).toBe(400) //if(valasz.status===400)
        expect(valasz.body.hibak.find(err => err.mezo === 'azonosito')).toBeTruthy()

    });

    //2. tesztelés
    it('400-as hibát kell dobnia, ha a kategória id nem szám', async () => {
        const valasz = await request(app).put('/api/termekek/1').send({
            "kategoriaId": "ioari",
            "termekNev": "Kütyümütyü",
            "ar": 99,
            "darabSzam": 99
        })

        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'kategoriaId')).toBeTruthy()

    });


    //3. tesztelés
    it('400-as hibát kell dobnia, ha a termék név nincs megadva', async () => {
        const valasz = await request(app).put('/api/termekek/1').send({
            "kategoriaId": 1,
            "termekNev": "",
            "ar": 99,
            "darabSzam": 99
        })

        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'termekNev')).toBeTruthy()

    });

    //3.1 tezstelés
    it('400-as hibát kell dobnia, ha a termék szám', async () => {
        const valasz = await request(app).put('/api/termekek/1').send({
            "kategoriaId": 1,
            "termekNev": 1,
            "ar": 99,
            "darabSzam": 99
        })

        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'termekNev')).toBeTruthy()

    });

    //4.teszt
    it('400-as hibát kell dobnia, ha az ár nincs megadva', async () => {
        const valasz = await request(app).put('/api/termekek/1').send({
            "kategoriaId": 1,
            "termekNev": "Kütyümütyü",
            "ar": "",
            "darabSzam": 99
        })

        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'ar')).toBeTruthy()

    });

    //4.1 tezst
    it('400-as hibát kell dobnia, ha az ár nem szám', async () => {
        const valasz = await request(app).put('/api/termekek/1').send({
            "kategoriaId": 1,
            "termekNev": "Kütyümütyü",
            "ar": "asd",
            "darabSzam": 99
        })

        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'ar')).toBeTruthy()

    });

    //5.teszt
    it('400-as hibát kell dobnia, ha a darabszám nincs megadva vagy nem szám', async () => {
        const valasz = await request(app).put('/api/termekek/1').send({
            "kategoriaId": 1,
            "termekNev": "Kütyümütyü",
            "ar": 11,
            "darabSzam": ""
        })

        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'darabSzam')).toBeTruthy()

    });

    //5.1 teszt
    it('400-as hibát kell dobnia, ha a darabszám nem szám', async () => {
        const valasz = await request(app).put('/api/termekek/1').send({
            "kategoriaId": 1,
            "termekNev": "Kütyümütyü",
            "ar": 11,
            "darabSzam": "asd"
        })

        expect(valasz.status).toBe(400)
        expect(valasz.body.hibak.find(err => err.mezo === 'darabSzam')).toBeTruthy()

    });

    //6. tesztelés OK
    it('200-as ha helyes adatok, oké', async () => {
        const valasz = await request(app).put('/api/termekek/10').send({
            "kategoriaId": 1,
            "termekNev": "Akkus csavarozó2",
            "ar": 3500,
            "darabSzam": 25
        })
        expect(valasz.status).toBe(200)
    })
});
