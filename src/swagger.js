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
            { url: 'https://manajemen-buku-production.up.railway.app', description: 'Production Server (Railway)' },
            { url: 'http://localhost:8080', description: 'Local Server' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
            }
        },
        // KITA TULIS RUTE-RUTENYA DI SINI BIAR GA SENSITIF SPASI LAGI
        paths: {
            '/health': {
                get: {
                    summary: 'Mengecek status kesehatan server backend',
                    responses: {
                        200: { description: 'Server berjalan dengan baik' }
                    }
                }
            },
            '/api/auth/register': {
                post: {
                    summary: 'Registrasi user baru',
                    tags: ['Authentication'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        email: { type: 'string' },
                                        password: { type: 'string' },
                                        role: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Registrasi berhasil' }
                    }
                }
            },
            '/api/auth/login': {
                post: {
                    summary: 'Login user',
                    tags: ['Authentication'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string' },
                                        password: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Login berhasil' }
                    }
                }
            }
        }
    },
    apis: [], // Dikosongkan saja karena semua rute sudah dipindah ke atas!
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;