const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const doctorSchema = new schema({
    name: String,
    nickname: String,
    number_id: String,
    email: String,
    governorate: String,
    city: String,
    street: String,
    building: String,
    floor: String,
    apartment: String,
    address: String,
    phone: String,
    password: String,
    whatsapp: String
});

doctorSchema.pre("save", function (next)
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

const doctor = mongoose.model('doctors',doctorSchema);
module.exports = doctor;