const mongoose = require('mongoose');
require('dotenv').config()
const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;


/**
 * main fun to conect with database
 */
async function main() 
{
    const URL = `${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    // === CONNECT DATABASE ===   
    await mongoose.connect(URL).then(()=>{
        console.log('Connected to MongoDB');
    
    }).catch(err => console.log(err));
}

main();
