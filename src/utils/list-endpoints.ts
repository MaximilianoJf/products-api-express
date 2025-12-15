// swagger-ui-express

import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

export const setupSwagger = (server: Express) => {
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'API Products',
                version: '1.0.0',
                description: 'Documentación de ejemplo',
            },
        },
        apis: ['./src/router.ts'], // ajusta la ruta a tu router
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};