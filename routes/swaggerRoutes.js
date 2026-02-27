const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../lib/swagger');
const { methodNotAllowed } = require('../utils/errors');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.all(["/"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
});

module.exports = router; //láthatóvá tételek a server.js-ben, ahol meg kell hívni a route-ot, hogy elérhető legyen a dokumentáció a szerveren