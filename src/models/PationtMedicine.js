const mongoose = require('mongoose');
const schema = mongoose.Schema;


const medicineSchema = new schema({
    name: String,
    period: String, // المدة
    dosage: String, // الجرعة
    frequency: String, // التكرار
    side_effects: String, //الاعراض الجانبية 
    pation_id: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
    doctor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'doctors'},
    examination_id:{type: mongoose.Schema.Types.ObjectId, ref: 'doctors'}, // فحص او كشف
})

const medicine = mongoose.model('patient_medicines',medicineSchema);
module.exports = medicine;