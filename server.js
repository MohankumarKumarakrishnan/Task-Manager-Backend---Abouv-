const express = require('express');
const app = express();
const PORT = 5500


app.use('/',(req,res)=>{
    res.send("<h1>Hello world</h1>")
})

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))