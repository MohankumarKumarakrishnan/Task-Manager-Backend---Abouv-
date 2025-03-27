const jwt = require('jsonwebtoken')

module.exports.generateToken = (id,email) =>{
   
    return jwt.sign({userId: id, userEmail : email},process.env.JWT_SECRET);

}