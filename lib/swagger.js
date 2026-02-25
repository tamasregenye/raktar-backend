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
  apis: [path.join(__dirname, '../routes/*.js')], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);