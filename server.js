require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const PORT = 5500
const cors = require('cors');
const dbConnection= require('./utils/dbconnection')
const authRouter = require('./Routes/auth.route')
const crudRouter = require('./Routes/crud.route')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  app.use('/auth',authRouter)
  app.use('/crud',crudRouter)



if(process.env.ENVIRONMENT === 'Production'){
    app.use(express.static(path.join(__dirname, "../Task Manager/dist")))
    app.use("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../Task Manager", "dist", "index.html"));
      });
}

dbConnection()
  .then((resp) => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });