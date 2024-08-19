const User = require("../../models/Users");
//const {success,error} = require('../../helper/functions')
/**
 * @route POST auth/register
 * @desc register a new user
 * @access Public
 */
async function Register(req, res) {
    const { name, phone, email,birthdate } = req.body;
    try {
        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: req.body.password,
            birthdate: new Date(birthdate)
        });
        // save new user into the database
        const savedUser = await newUser.save(); 
        const { password, ...user_data } = savedUser._doc;
        //token
        const token = savedUser.generateAccessJWT();
        success(res,200,user_data,"Thank you",token);
    } catch (err) {
        error(res,500,err,"Internal Server Error");
    }
}

module.exports = {Register};