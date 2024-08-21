const { body } = require("express-validator");
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patients')

const registerRequest = 
[
    [
      body("notes").isString(),
      body("diagnosis").isString(),
      body("status").isString().trim(),
      body("doctor").custom(async (doctor_id)=>{
        const doctor = await Doctor.findOne({ _id: doctor_id });
        if (!doctor) {
          throw new Error("Doctor is not exists");
        }
      }),
      body("pation").custom(async (pation_id)=>{
        const patient = await Patient.findOne({ _id: pation_id });
        if (!patient) {
          throw new Error("patient is not exists");
        }
      }),
    ],
];


module.exports = registerRequest;