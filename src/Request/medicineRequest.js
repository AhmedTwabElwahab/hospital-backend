const { body } = require("express-validator");
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patients');
const MedicalExamination = require("../models/MedicalExamination");

const Request = 
[
    [
      body("name").isString().notEmpty(),
      body("period").isString(),
      body("dosage").isString(),
      body("frequency").isString(),
      body("side_effects").isString(),
      // body("doctor").custom(async (doctor_id)=>{
      //   const doctor = await Doctor.findOne({ _id: doctor_id });
      //   if (!doctor) {
      //     throw new Error("Doctor is not exists");
      //   }
      // }),
      // body("patient").custom(async (patient_id)=>{
      //   const patient = await Patient.findOne({ _id: patient_id });
      //   if (!patient) {
      //     throw new Error("patient is not exists");
      //   }
      // }),
      body("examination").custom(async (examination_id)=>{
        const patient = await MedicalExamination.findOne({ _id: examination_id });
        if (!patient) {
          throw new Error("MedicalExamination is not exists");
        }
      }),
    ],
];


module.exports = Request;