const mongoose = require('mongoose');
const schema = mongoose.Schema;


const patientSchema = new schema({
    name: String,
    number_id: String,
    address: String,
    phone: String,
    whatsapp: String,
    weight:Number,
    height: Number,
    bloodType: String, // فصيلة الدم
    allergies: String, //الحساسية
    birthdate: Date,
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'doctors' }],
})

const Patient = mongoose.model('patients',patientSchema);
module.exports = Patient;