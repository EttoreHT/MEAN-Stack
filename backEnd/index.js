const app = require('express')();
const ApiRoutes = require('./routes/ApiRoutes')
const bodyParser = require("body-parser");
const config = require('./config/config');
const cors = require("cors");


app.use(bodyParser.json());

app.use(cors());

app.use('/api', ApiRoutes)

app.listen(config.port, () => console.log(`Server iniciado na porta ${config.port}`))