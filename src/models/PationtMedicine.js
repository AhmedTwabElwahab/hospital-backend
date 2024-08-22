const mongoose = require('mongoose');
const schema = mongoose.Schema;


const medicineSchema = new schema({
    name: String,
    period: String, // المدة
    dosage: String, // الجرعة
    frequency: String, // التكرار
    side_effects: String, //الاعراض الجانبية 
    // pation: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
    // doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'doctors'},
    examination:{type: mongoose.Schema.Types.ObjectId, ref: 'MedicalExamination'}, // فحص او كشف
})

const medicine = mongoose.model('patient_medicines',medicineSchema);
module.exports = medicine;