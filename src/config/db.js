const mongoose = require('mongoose');
require('dotenv').config()

/**
 * main fun to conect with database
 */
async function main() 
{
    const URL = `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
    await mongoose.connect(URL).then(()=>{
        console.log('Connected to MongoDB');
    
    }).catch(err => console.log(err));
}

main();
