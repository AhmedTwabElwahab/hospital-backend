const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ReservationSchema = new schema({
    code: Number,
    date: Date,
    time: String,
    status: {
        type: String,
        enum: ['paid','unpaid'],
        default: 'unpaid'
    },
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'doctors'},
    pation_id: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'}
})

const Reservations = mongoose.model('Reservations',ReservationSchema);
module.exports = Reservations;