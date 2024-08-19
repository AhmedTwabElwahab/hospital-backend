const bcrypt = require("bcrypt");
const User = require("../../models/Users");
const {validationResult } = require("express-validator");

/**
 * @route POST auth/register
 * @desc register a new user
 * @access Public
 */
async function Register(req, res) {
    const { name, phone, email,birthdate } = req.body;
    try {
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }

        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: req.body.password,
            birthdate: new Date(birthdate)
        });
        // Check if user already exists
        // const existingUser = await User.findOne({ email });
        // if (existingUser)
        //     return res.status(400).json({
        //         status: "failed",
        //         data: [],
        //         message: "It seems you already have an account, please log in instead.",
        //     });
        // save new user into the database
        const savedUser = await newUser.save(); 
        const { password, ...user_data } = savedUser._doc;
        //token
        const token = savedUser.generateAccessJWT();
        res.status(200).json({
            status: "success",
            data: [user_data],
            token: token,
            message:
                "Thank you for registering with us. Your account has been successfully created.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [err],
            message:"Internal Server Error",
        });
    }
}

module.exports = {Register};