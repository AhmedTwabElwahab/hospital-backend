const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ProductSchema = new schema({
    name: String,
    name_ar:String,
    price: Number,
    disc: String,
    disc_ar: String,
    image:String,
    type: {
        type: String,
        enum: ['product','service'],
        default: 'product'
    }
})

const Product = mongoose.model('Products',ProductSchema);
module.exports = Product;