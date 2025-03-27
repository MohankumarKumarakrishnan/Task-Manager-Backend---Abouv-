const mongoose = require('mongoose');



async function connectToDB(){
   
    try{
       return await mongoose.connect(`mongodb+srv://mkmohankumar261998:yLw6kwhwoaDLZY5V@cluster0.e8z7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    }catch(err){
        console.log(err)
         process.exit(1)
    }
}

module.exports = connectToDB;