require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const PORT = 5500
const cors = require('cors');

app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );





if(process.env.ENVIRONMENT === 'Production'){
    app.use(express.static(path.join(__dirname, "../Task Manager/dist")))
    app.use("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../Task Manager", "dist", "index.html"));
      });
}

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))