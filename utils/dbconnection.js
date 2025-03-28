const mongoose = require('mongoose');
require('dotenv').config();


async function connectToDB(){
   
    try{
       return await mongoose.connect(process.env.MONGODB)
    }catch(err){
        console.log(err)
         process.exit(1)
    }
}

module.exports = connectToDB;