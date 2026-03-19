const request = require('supertest');
const express = require('express');
const { authRegisterUserValidator } = require('../validators/authValidator');
const authController = require('../controllers/authController');

const app = express();
app.use(express.json());

app.post('/api/felhasznalok/regisztacio', authRegisterUserValidator, authController.registerUser);

describe('POST /api/felhasznalok/regisztacio tesztelése', () => {

    // 1. teszteset - Sikeres regisztráció
    it('201-es státuszkódot kell kapnunk sikeres felhasználó regisztráció esetén', async () => {
        const valasz = await request(app)
            .post('/api/felhasznalok/regisztacio')
            .send({
                "email": "teszt60@teszt.hu",
                "jelszo": "123456789",
                "nev": "Teszt Tíz"
            });

        expect(valasz.status).toBe(201);
        expect(valasz.body.valasz).toBe("Sikeres regisztráció!");
    });

    // 2. teszteset - Már létező email cím tesztelése
    it('409-es státuszkódot kell kapnunk már regisztrál email cím esetén', async () => {
        const valasz = await request(app)
            .post('/api/felhasznalok/regisztacio')
            .send({
                "email": "teszt10@teszt.hu",
                "jelszo": "123456789",
                "nev": "Teszt Tíz"
            });

        expect(valasz.status).toBe(409);
        expect(valasz.body.valasz).toBe('A megadott email címmel már regisztráltak.');
    });

    // 3. teszteset - Validációs hiba - Rövid jelszó
    it('400-as hibakódot kell kapnunk ha a megadott jelszó hossza kevesebb, mint 8 karakter', async () => {
        const valasz = await request(app)
            .post('/api/felhasznalok/regisztacio')
            .send({
                "email": "teszt70@teszt.hu",
                "jelszo": "123",
                "nev": "Teszt"
            });

            expect(valasz.status).toBe(400);
            expect(valasz.body.hibak.find(err => err.mezo === 'jelszo')).toBeTruthy();
    });
});