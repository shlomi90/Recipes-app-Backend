import initApp from "./app";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

initApp().then((app) => {
   
    const options = {
        definition: {
        openapi: "3.0.0",
        info: {
        title: "Web Dev 2024 REST API",
        version: "1.0.0",
        description: "REST server including authentication using JWT",
        },
        servers: [{url: "http://localhost:3000",},],
        },
        apis: ["./src/Routing/*.ts"],
        };
        const specs = swaggerJsDoc(options);
        app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });   
});


