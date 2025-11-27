const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Medical Records Service API',
      version: '1.0.0',
      description: 'API untuk mengelola rekam medis pasien di Klinik Sehat Selalu',
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
        url: 'http://localhost:3001',
        description: 'Development server'
      },
      {
        url: 'http://localhost:3001',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'Medical Records',
        description: 'Endpoint untuk mengelola rekam medis pasien'
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
