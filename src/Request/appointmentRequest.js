const { body } = require("express-validator");
const Doctor = require('../models/Doctor');


const appointmentRequest = 
[
    [
      body("day").notEmpty().isString(),
      body("work").isBoolean(),
      body("start_from").isString().notEmpty(),
      body("end_to").isString().notEmpty(),
      body("doctor").custom(async (doctor_id)=>{
        const doctor = await Doctor.findOne({ _id: doctor_id });
        if (!doctor) {
          throw new Error("Doctor is not exists");
        }
      }),
      
    ],
];


module.exports = appointmentRequest;