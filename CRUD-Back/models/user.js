// imports modules et initialisation du  modele Schéma 
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema(
    {
        photo : {
            type : String,
            default: "./uploads/profil/random-user.png"
        },   
        username : {
            type:String,
            required: true,
            minlength : 3,
            maxlength : 55,
            unique: true,
            trim : true
        },
        password : {
            type: String,
            required: true,
            minlength : 6,
            maxlength : 1024
            
        },
        
        email : {
            type: String,
            required: true,
            lowercase:true,
            unique:true,
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            trim:true
        },
        
        race : {
            type: String,
        },
        famille : {
            type: String,
        },
        nourriture : {
            type: String,
        },
        
        age:
        {
            type : Number,
        },
        followers: 
        {
            type : [String],
        },
        followings:
        {
            type:[String],
        },
    
        reset: String,
    
        resetExpires: Date,
    },
    {timestamps : true}
);

// hash password 
 UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(saltRounds); 
    this.password = await bcrypt.hash(this.password, salt);
    next();
 });

 /* *** Authentification du password *** */
 // utilisation de la méthode statics pour appeler les méthode directement sur le modele 
 UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth)
           return user;
        throw Error('incorrect password');   
    }
    throw Error("email incorrect!");
 };


const User = mongoose.model("User", UserSchema);
module.exports = {User};