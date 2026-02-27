const cors = require('cors');

const corsOptions = {
    origin: 'localhost:5173', //frontend helye a futtatáshoz pl 'localhost:5173', '*' - mindenhonnan engedve van
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //engedélyezett műveletek
    allowedHeaders: ['Content-Type', 'Accept'] //serverről érkező Json adatok típusa
}

module.exports = cors(corsOptions);