const mongoose = require("mongoose");
require("dotenv").config({path:"./config/.env"});
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER_PASS}@cluster0.grhuq.mongodb.net/Appartoo?retryWrites=true&w=majority`;

// connexion à mongo atlas 
mongoose.connect(MONGODB_URI, 
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
   },
    function(err){
        if(!err){
            console.log("connecter avec succes à mongodb! ...")
        }else{
            console.log("erreur de connexion avec la bd:" + JSON.stringify(err, undefined, 2));
        }
    }
);

module.exports = mongoose;