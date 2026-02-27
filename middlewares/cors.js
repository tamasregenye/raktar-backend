const cors = require('cors');

const corsOptions = {
    origin: 'localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    alloweHeaders: ['Content-type', 'Accept']
}

module.exports = cors(corsOptions);