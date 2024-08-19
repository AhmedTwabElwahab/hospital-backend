const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const usersRouter = require('./src/Router/users');
const auth = require('./src/Router/auth');
app = express();
const port = 3000;
require('./src/helper/functions')
require('./src/config/db');


// CONFIGURE HEADER INFORMATION
app.use(cors());
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(bodyParser.json());
app.use('/users',usersRouter);
app.use('/auth',auth);
app.listen(port, () => console.log(`App listening on port ${port}!`));