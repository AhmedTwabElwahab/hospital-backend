const bcrypt = require("bcrypt");
const User = require("../../models/Users");

/**
 * @route POST auth/login
 * @desc logs in a user
 * @access Public
 */
async function Login(req, res) {
    // Get variables for the login process
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email:email }).select("+password");
        if (!user)
            return global.error(res,
                        401,
                        "failed",
                        "Invalid email or password. Please try again with the correct credentials.");
        // if user exists
        // validate password
        const isPasswordValid = await bcrypt.compare(
            `${req.body.password}`,
            user.password
        );

        // if not valid, return unathorized response
        if (!isPasswordValid)
            return error(res,401,"failed","Invalid email or password.");

        // return user info except password
        const { password, ...user_data } = user._doc;

        // generate session token for user
        const token =  user.generateAccessJWT();
        
        // send back success response with user data and session token
        return success(res,200,user_data,"You have successfully logged in.",token);        
    } catch (err){
        return global.error(res,500,err,"Internal Server Error");
    }
}

module.exports = {Login};