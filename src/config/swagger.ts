import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"
        },
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
         /* Imagen personalizada en la barra superior */
        .topbar-wrapper .link::before {
            content: url('');
            display: block;
            height: 120px;
            width: auto;
        }

        /* Cambiar color de fondo de la barra superior */
        .swagger-ui .topbar {
                background-color: #7df6ffff;
                height: 100px;
        }
    `
}

export default swaggerSpec

export {
    swaggerUiOptions
}