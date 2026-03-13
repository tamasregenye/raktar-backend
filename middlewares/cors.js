const cors = require('cors');

const corsOptions = {
    origin: 'localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true
}

module.exports = cors(corsOptions);