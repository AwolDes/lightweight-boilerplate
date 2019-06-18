const express = require('express');
const swaggerUi = require('swagger-ui-express');

require('swagger-ui-dist').absolutePath

const options = {
    swaggerUrl: 'http://localhost:5000/api/swagger.json'
}

const app = express();
app.use('/', swaggerUi.serve, swaggerUi.setup(null, options));

app.listen(3000)