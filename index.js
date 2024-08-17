const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./src/Router/users')
app = express();
const port = 3000;
require('./src/config/db');



app.use(bodyParser.json());
app.use('/users',usersRouter);
app.listen(port, () => console.log(`App listening on port ${port}!`))