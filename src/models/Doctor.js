const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const MedicalExamination = require('./MedicalExamination');
const appointment = require('./Appointment');
const patients = require('./Patients')
const Review = require('./Review')

const doctorSchema = new schema({
    name: String,
    nickname: String,
    image:String,
    number_id: String,
    rate:Number,
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
    whatsapp: String,
    specialty: String,
    duration_medical:String, // مدة الكشف
    appointment : [{ type: mongoose.Schema.Types.ObjectId, ref: appointment.modelName }],
    patient : [{ type: mongoose.Schema.Types.ObjectId, ref: patients.modelName }],
    reviews : [{ type: mongoose.Schema.Types.ObjectId, ref: Review.modelName }]
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

//creat MODEL
const doctor = mongoose.model('doctors',doctorSchema);
module.exports = doctor;
