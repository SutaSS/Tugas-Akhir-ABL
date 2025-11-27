const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pharmacy Service API',
      version: '1.0.0',
      description: 'API untuk mengelola data obat dan farmasi di Klinik Sehat Selalu',
      contact: {
        name: 'Klinik Sehat Selalu',
        email: 'info@kliniksehatselalu.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server'
      },
      {
        url: 'http://localhost:3002',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'Medicines',
        description: 'Endpoint untuk mengelola data obat dan farmasi'
      },
      {
        name: 'Health',
        description: 'Health check endpoint'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/app.js'] // Path ke file routes dan app
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
