const mongoose = require('mongoose');
const schema = mongoose.Schema;


const MedicalExaminationSchema = new schema({
    name: String,
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'doctors'},
    pation_id: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
    diagnosis: String,
    treatment: String,
    status: {type: String, enum: ['active', 'inactive']},
    createdAt: {type: Date, default: Date.now}
})

const MedicalExamination = mongoose.model('MedicalExamination',MedicalExaminationSchema);
module.exports = MedicalExamination;