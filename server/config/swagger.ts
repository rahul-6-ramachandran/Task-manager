import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager Api",
            version: "1.0.0",
            description: "API documentation for Task Manager",
        },
        servers: [
            {
                url: "http://localhost:7070",
                description: "Local server",
            },
            {
                url: "http://backend:7070", 
                description: "Docker container server",
            },
        ],
    },
    apis: ["./routes/**/*.ts", "./routes/**/*.js"], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log("Swagger Docs available at: http://localhost:7070/api-docs");
};
