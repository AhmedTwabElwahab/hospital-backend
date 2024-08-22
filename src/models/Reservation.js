const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ReservationSchema = new schema({
    code: Number,
    reservationtime: Date,
    status: {
        type: String,
        enum: ['paid','unpaid'],
        default: 'unpaid'
    },
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'doctors'},
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
    createdAt: {type: Date, default: Date.now}
})
//ReservationSchema.plugin(AutoIncrementSimple, [{ field: 'code' }]);

const Reservations = mongoose.model('Reservations',ReservationSchema);
module.exports = Reservations;