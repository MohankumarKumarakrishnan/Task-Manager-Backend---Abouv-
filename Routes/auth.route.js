const express = require('express');
const Users = require('../Models/users')
const router = express.Router();

router.post('/newuser',(req,res)=>{

    const {userName,userEmail,password} = req.body.formData;
    console.log (userName,userEmail,password)
    res.json({msg:[userName,userEmail,password]})

})

router.post('/login',(req,res)=>{

    const {userName,userEmail,password} = req.body;
    console.log (userName,userEmail,password)
    res.json({msg:'checking'})
    

})

module.exports = router