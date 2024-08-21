const mongoose = require('mongoose');
const schema = mongoose.Schema;


const MedicalExaminationSchema = new schema({
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'doctors'},
    pation: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
    diagnosis: String,
    notes: String,
    status: {type: String, enum: ['active', 'inactive']},
    createdAt: {type: Date, default: Date.now}
});

const MedicalExamination = mongoose.model('MedicalExamination',MedicalExaminationSchema);
module.exports = MedicalExamination;