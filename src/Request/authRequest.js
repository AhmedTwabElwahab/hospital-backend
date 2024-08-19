const { body } = require("express-validator");
const User = require('../models/Users');


const registerRequest = 
[
    [
      body("name").notEmpty().trim(),
      body("email").isEmail().trim().custom(async (email)=>{
        const user = await User.findOne({ email: email });
        if (user) {
          throw new Error("Email already exists");
        }
      }),
      body("date").toDate(),
    ],
];


module.exports = registerRequest;