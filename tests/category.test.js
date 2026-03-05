const request = require('supertest');
const express = require('express');

const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(express.json())

app.use('/api/kateigoriak', categoryRoutes)

describe('GET /kategoriak', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/kategoriak')
      .expect(200, done);
  });
});