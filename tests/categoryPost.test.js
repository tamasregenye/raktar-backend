//alapok
const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json())

//tesztek

//konkrét feladat:
//melyik végponton kell tesztelni
//url, validator, controller meg lesz adva
//kérés során kulcsnevek lesznek megadva (swaggerui-ból rá lehet jönni)

const categoryController = require('../controllers/categoryController');
const {categoryPostValidator} = require('../validators/categoryValidator')

app.post("/api/kategoriak", categoryPostValidator , categoryController.postCategory)

describe('POST /kategoriak', function() {
  it('200-as státuszkódot kell kapnunk sikeres kategória lekérdezése során',  async function() {
    const valasz = await request(app)
    .post('/api/kategoriak')
    .send({"kategoriaNev" : "string"})
    
    //ellenőrzés
    expect(valasz.status).toBe(201);
    expect(valasz.body.uzenet).toBe("A kategória rögzítésre került!")
  });

  //2. tesztesek -> hiányzó adat miatti hiba
  it('400-as státuszkódot kell kapnunk sikertelen kategória lekérdezése során',  async function() {
    const valasz = await request(app)
    .post('/api/kategoriak')
    .send({"kategoriaNev" : ""})
    
    //ellenőrzés
    expect(valasz.status).toBe(400);
    expect(valasz.body.uzenet).toBe("Validációs hiba, ha a kategórianév nem lett elküldve a törzsbe")
  });
});

