const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../lib/swagger');
const { methodNotAllowed } = require('../utils/errors');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

<<<<<<< HEAD

=======
>>>>>>> origin/main
router.all(["/"], function(keres, valasz){
    methodNotAllowed(keres, valasz);
})

<<<<<<< HEAD

module.exports = router;

=======
module.exports = router
>>>>>>> origin/main
