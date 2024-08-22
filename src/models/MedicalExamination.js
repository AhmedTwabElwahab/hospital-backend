const mongoose = require('mongoose');
const schema = mongoose.Schema;


const MedicalExaminationSchema = new schema({
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'doctors'},
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
    diagnosis: String,
    notes: String,
    status: {type: String, enum: ['active', 'inactive']},
    medicines:[{type: mongoose.Schema.Types.ObjectId, ref: 'patient_medicines'}],
    createdAt: {type: Date, default: Date.now}
});

const MedicalExamination = mongoose.model('MedicalExamination',MedicalExaminationSchema);
module.exports = MedicalExamination;