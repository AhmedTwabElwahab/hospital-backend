const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    phone: 
    {
        type: String,
        minlength: 10,
        maxlength: 50,
    },
    birthdate:{
        type: Date,
        required: true,
    }
})
//create collection name users
const user = mongoose.model('users',userSchema);
module.exports = user;