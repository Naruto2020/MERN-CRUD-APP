// imports modules 
const {User} = require("../models/user");
const jwt = require("jsonwebtoken");
const {signUpErrors, signInErrors} = require("../utils/errorsUtils");
require("dotenv").config();

// initialisation de la durée du token 
const maxlife = 3 * 24 * 60 * 60 * 1000; // en milisecondeequivaut à 03 jours 
const createToken = (id)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn : maxlife,

    });
}

/**
 * *** CRUD ***
*/

// Sign Up 

module.exports.signUp = async (req, res)=>{
    const {username, password, email} = req.body;
    try{
        const newUser = await  User.create({username, password, email});
        res.status(201).json({newUser:newUser._id});
        /*newUser.save(err =>{
            if(!err)
               return res.status(200).json({newUser: newUser});
            return res.status(500).send({message : `erreur lors de la création du compte utilisateur`});   
        });*/
    }catch(err){
        const errors = signUpErrors(err);
        res.status(200).send({errors});
    }
};

// Sign Up 
module.exports.signIn = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly:true, sameSite:true, maxlife});
        res.status(200).json({userId: user._id, email : user.email});
    }catch(err){
        const errors = signUpErrors(err);
        res.status(200).send({errors});
    }
}

// Logout
module.exports.logout =  (req, res) =>{
    res.cookie('jwt', '', {maxlife:1});
    res.redirect("/");
}