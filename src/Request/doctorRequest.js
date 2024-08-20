const { body } = require("express-validator");
const Doctor = require('../models/Doctor');


const doctorRequest = 
[
    [
      body("name").notEmpty().trim(),
      body("nickname").notEmpty().trim(),
      body("number_id").isNumeric().trim(),
      body("governorate").notEmpty().trim(),
      body("city").notEmpty().trim(),
      body("street").isString(),
      body("building").notEmpty().trim(),
      body("floor").notEmpty().trim(),
      body("apartment").notEmpty().trim(),
      body("address").notEmpty().trim(),
      body("phone").isNumeric().trim(),
      body("whatsapp").isNumeric(),
      body("email").isEmail().trim().custom(async (email)=>{
        const doctor = await Doctor.findOne({ email: email });
        if (doctor) {
          throw new Error("Email already exists");
        }
      }),
    ],
];
module.exports = doctorRequest;