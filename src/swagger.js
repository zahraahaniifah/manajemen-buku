const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Manajemen Buku API',
            version: '1.0.0',
            description: 'Dokumentasi API manajemen buku',
        },
        servers: [
    {
        url: 'https://manajemen-buku-production.up.railway.app', 
        description: 'Production Server (Railway)'
    },
    {
        url: 'http://localhost:8080',
        description: 'Local Server'
    }
],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;