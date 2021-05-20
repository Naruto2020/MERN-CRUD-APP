// initialisation du server 
const express = require("express");
const path = require("path");

// import fichiers et modules 
const mongoose = require("./config/db");
const userRoute = require("./routes/userRoute");
const bodyParser = require('body-parser')
const cors = require('cors')
require("dotenv").config({path:"./config/.env"});


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const corsOptions = {
    origins: 'http://localhost:4200',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
};
app.use(cors(corsOptions));


app.use("/api/users", userRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`app listening on port ${process.env.PORT}`);
});