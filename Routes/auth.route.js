const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../Models/users')
const router = express.Router();
const {generateToken} = require("../utils/jwtauth") 
router.post('/newuser',async (req,res)=>{
    try {
        
        const {userName,userEmail,password} = req.body.formData;
        console.log (userName,userEmail,password)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
        return res.status(400).json({ error: "Invalid email format" });
     
        }
        
        const existEmail = await User.findOne({ userEmail });
        const existName = await User.findOne({ userName });
        if (existEmail || existName) {
        return res.status(400).json({ error: "User already exist" });
        }
            if (password.length < 6) {
            return res
            .status(400)
            .json({ error: "Password length should be more than or equal to 6" });
    }

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);

        const newUser = new User({
        userName,
        userEmail,
        userPassword: passwordHashed,
    });

    if (newUser) {
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
      } else {
        return res.status(500).json({ error: "error while creating new user internally" });
    }
    
    }
        catch(err){
                    console.log("Error in signup controller", err);
                    res.status(500).json({ error: "Internal server error" });

                }

    })

router.post('/login', async (req,res)=>{

    
    try {
        const { email, password } = req.body.formData;
        const user = await User.findOne({ userEmail:email });
        const passwordValidation = await bcrypt.compare(
        password,
        user?.userPassword || ""
        );
        console.log( user,passwordValidation) 
        if (!user || !passwordValidation) {
          return res.status(400).json({ error: "Invalid username or password" });
        }
        
        const jwtToken = generateToken(user._id, email);
        res.status(200).json({ message: "Login success",jwtToken });
      } catch (err) {
        console.log("Error in login controller", err);
        res.status(500).json({ error: "Internal server error" });
    }

})

module.exports = router