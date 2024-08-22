const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const usersRouter = require('./src/Router/usersRouter');
const auth = require('./src/Router/authRouter');
const patient = require('./src/Router/patientRouter');
const doctorRouter = require('./src/Router/doctorRouter');
const MedicalExaminationRouter = require('./src/Router/medicalExaminationRouter');
const ReservationRouter = require('./src/Router/reservationRouter');
const medicineRequest = require('./src/Router/medicineRouter');
const productRequest = require('./src/Router/productRouter');
const reviewRequest = require('./src/Router/reviewRouter');

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
app.use('/patients',patient);
app.use('/doctors',doctorRouter);
app.use('/examinations',MedicalExaminationRouter);
app.use('/reservations',ReservationRouter);
app.use('/medicines',medicineRequest);
app.use('/products',productRequest);
app.use('/reviews',reviewRequest);

app.listen(port, () => console.log(`App listening on port ${port}!`));