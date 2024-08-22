const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ReviewSchema = new schema({
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'doctors', required : true },
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'patients',required : true },
    disc: String,
    rating: Number
})

const Review = mongoose.model('reviews',ReviewSchema);
module.exports = Review;