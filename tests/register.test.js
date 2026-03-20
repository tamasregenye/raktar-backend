const request = require('supertest');
const express = require('express');
const { authRegisterUserValidator } = require('../validators/authValidator');
const authController = require('../controllers/authController');

const app = express();
app.use(express.json());

app.post('/api/felhasznalok/regisztracio', authRegisterUserValidator, authController.registerUser)

describe('3. feladat', () => {
    it('Sikeres regisztráció, 201-es státuszkód', async() => {
        const valasz = await request(app)
            .post("/api/felhasznalok/regisztracio")
            .send({
                "email": "nincs_2@gmail.com",
                "jelszo": "123456789",
                "nev": "valami"
            });

        expect(valasz.status).toBe(201);
        expect(valasz.body.valasz).toBe("Sikeres regisztráció!");
    });

    it('Már létező e-mail cím, 409-es státuszkód', async() => {
        const valasz = await request(app)
            .post("/api/felhasznalok/regisztracio")
            .send({
                "email": "user345@example.com",
                "jelszo": "123456789",
                "nev": "valami"
            });

        expect(valasz.status).toBe(409);
        expect(valasz.body.valasz).toBe("A megadott email címmel már regisztráltak.");
    });

    it('Validációs hiba - Rövid jelszó, 400-as státuszkód', async() => {
        const valasz = await request(app)
            .post("/api/felhasznalok/regisztracio")
            .send({
                "email": "rovid@example.com",
                "jelszo": "1234",
                "nev": "valami3"
            });

        expect(valasz.status).toBe(400);
        expect(valasz.body.hibak.find(err => err.mezo === "jelszo")).toBeTruthy();
    });
});