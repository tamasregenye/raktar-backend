const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../lib/swagger');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router; //láthatóvá tételek a server.js-ben, ahol meg kell hívni a route-ot, hogy elérhető legyen a dokumentáció a szerveren