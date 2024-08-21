const { body } = require("express-validator");
const Patient = require('../models/Patients');


const patientRequest = 
[
    [
      body("name").notEmpty().trim(),
      body("number_id").isNumeric().trim(),
      body("address").notEmpty().trim(),
      body("address").notEmpty().trim(),
      body("whatsapp").isNumeric(),
      body("phone").isNumeric().trim(),
      body("weight").isNumeric().trim(),
      body("height").isNumeric(),
      body("bloodType").isString().trim(),
      body("allergies").isString().trim(),
      body("birthdate").isDate().trim(),
      body("email").isEmail().trim().custom(async (email)=>{
        const patient = await Patient.findOne({ email: email });
        if (patient) {
          throw new Error("Email already exists");
        }
      }),
    ],
];

const patientUpdateRequest = 
[
  [
    body("name").notEmpty().trim(),
    body("number_id").isNumeric().trim(),
    body("address").notEmpty().trim(),
    body("address").notEmpty().trim(),
    body("whatsapp").isNumeric(),
    body("phone").isNumeric().trim(),
    body("weight").isNumeric().trim(),
    body("height").isNumeric(),
    body("bloodType").isString().trim(),
    body("allergies").isString().trim(),
    body("birthdate").isDate().trim()
  ],
];

module.exports = [patientRequest, patientUpdateRequest];