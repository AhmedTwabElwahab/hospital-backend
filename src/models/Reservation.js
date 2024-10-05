const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const Doctor = require('./Doctor');


const ReservationSchema = new schema({
    code: Number,
    reservationDate: Date,
    time: String,
    status: {
        type: String,
        enum: ['paid','unpaid'],
        default: 'unpaid'
    },
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: Doctor.modelName},
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
    createdAt: {type: Date, default: Date.now}
})
// ReservationSchema.plugin(autoIncrement.plugin, [{ field: 'code' }]);
// var Book = connection.model('Reservation', ReservationSchema);

const Reservations = mongoose.model('Reservations',ReservationSchema);
module.exports = Reservations;