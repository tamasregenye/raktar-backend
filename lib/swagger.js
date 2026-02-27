const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
<<<<<<< HEAD
  apis: [ path.join(__dirname, '../routes/*.js')], // files containing annotations as above
=======
  apis: [ path.join(__dirname, '../routes/*.js') ], // files containing annotations as above
>>>>>>> origin/main
};

const openapiSpecification = swaggerJsdoc(options);
console.log("Talált útvonalak száma, amely leírást tartalmaz: ", Object.keys(openapiSpecification.paths).length)
<<<<<<< HEAD
module.exports = openapiSpecification;
=======
module.exports = openapiSpecification;
>>>>>>> origin/main
