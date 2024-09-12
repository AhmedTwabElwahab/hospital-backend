const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');
require('dotenv').config()
const {SECRET_ACCESS_TOKEN} = process.env;

const userSchema = new schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
})

userSchema.pre("save", function (next)
{
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => 
    {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

/**
 * @desc Get token
 * @access Public
 */
userSchema.methods.generateAccessJWT = function () {
    let payload = {
        id: this._id,
    };
    return JWT.sign(payload, SECRET_ACCESS_TOKEN, {
        expiresIn: '1h',
    });
};

//create collection name users
const user = mongoose.model('users',userSchema);
module.exports = user;