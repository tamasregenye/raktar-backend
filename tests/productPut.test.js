const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

//testelni kivánt végpont
app.put("/termekek/:azonosito")