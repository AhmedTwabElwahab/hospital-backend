const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');


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
// ReservationSchema.plugin(autoIncrement.plugin, [{ field: 'code' }]);
// var Book = connection.model('Reservation', ReservationSchema);

const Reservations = mongoose.model('Reservations',ReservationSchema);
module.exports = Reservations;