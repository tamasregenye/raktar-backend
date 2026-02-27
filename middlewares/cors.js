const cors = require('cors');

const corsOptions = {
    origin: 'localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DEELET', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Accept']

}

 module.exports = cors(corsOptions)