const request = require('supertest');
const express = require('express');

const categoryRoutes = require('../routes/categoryRoutes');

const app = express();
app.use(express.json());

app.use('/api/kategoriak', categoryRoutes);

// tesztek

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')      
      .expect(200, done);
  });
});