const { body } = require("express-validator");
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patients');
const Review = require("../models/Review");

const Request = 
[
    [
      body("disc").isString().notEmpty(),
      body("rating").isNumeric().notEmpty(),
      body("doctor").notEmpty().custom(async (doctor_id)=>{
        const doctor = await Doctor.findOne({ _id: doctor_id });
        if (!doctor) {
          throw new Error("Doctor is not exists");
        }
      }),
      body("patient").notEmpty().custom(async (patient_id)=>{
        const patient = await Patient.findOne({ _id: patient_id });
        if (!patient) {
          throw new Error("patient is not exists");
        }
      }),
    ],
];


module.exports = Request;