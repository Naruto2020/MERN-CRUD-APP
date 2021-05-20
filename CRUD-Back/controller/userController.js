// imports modules 
const {User} = require("../models/user");

const objetId = require("mongoose").Types.ObjectId;


/***  Read and display users  ***/
module.exports.getAllusers = async (req, res)=>{
    try{
        await User.find(
            (err, docs)=>{
                if(!err)
                   return res.send(docs);
                return res.status(500).send({message: `erreur lors de l'affichage de la liste des utilisateurs `})   
            }
        ).select("-password");
    }catch(err){
        return res.status(400).send(err);
    }
};

/***  Read and display current user  ***/
module.exports.getUser =  (req, res)=>{
    if(!objetId.isValid(req.params.id)){
        return res.status(400).send(`Id Invalid ${req.params.id}`);
    }
    try{
        User.findById(
            req.params.id,
            (err, docs)=>{
                if(!err)
                   return res.send(docs);
                return res.status(500).send({message : `utilisateur introuvable`})   
            }
        ).select("-password");
    }catch(err){
        return res.status(400).send(err);
    }
};

/***  Update current user  ***/

module.exports.editUser = async (req, res)=>{
    if(!objetId.isValid(req.params.id)){
        return res.status(400).send(`Id invalide ${req.params.id}`);
    }
    let newUser = {
        age : req.body.age, 
        race : req.body.race,
        famille : req.body.famille,
        nourriture : req.body.nourriture,
    }
    try{
        await User.findByIdAndUpdate(
            req.params.id,
            {$set: newUser},
            {new:true, upsert: true, setDefaultsOnInsert: true},
            (err, docs)=>{
                if(!err)
                   return res.send(docs);
                return res.status(500).send({message : `erreur l'ors de la mise à jour du compte utilisateur`});   
            }
        ).select("-password");
    }catch(err){
        return res.status(400).send(err);
    }
};

/***  Delete user  ***/
module.exports.cancelUser = (req, res)=>{
    if(!objetId.isValid(req.params.id)){
        return res.status(400).send(`Id invalide ${req.params.id}`);
    }
    try{
        User.findByIdAndDelete(
            req.params.id,
            (err, docs)=>{
                if(!err)
                   return res.send(docs);
                return res.status(500).send({message: `erreur lors de la suppression du compte utilisateur`});   
            }
        ).select("-password");
    }catch(err){
        return res.status(400).send(err);
    }
};

/***  follow user  ***/
module.exports.followUser = async (req, res)=>{
    if(!objetId.isValid(req.params.id) || !objetId.isValid(req.body.idTofollow)){
        return res.status(400).send(`Id invalide ${req.params.id} ou ${req.body.idTofollow}`);
    }
    try{
        // ajout à la liste followings
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet : {followers: req.body.idTofollow}
            },
            {new : true, upsert:true},
            (err, docs)=>{
                if(!err)
                   return res.status(200).json(docs);
                return res.status(400).json({message : "erreur l'ors de l'enregistrement dans la liste d'amis "}); 
            }
        );
        // ajout à la liste followers
        await User.findByIdAndUpdate(
            req.body.idTofollow,
            {
                $addToSet:{followings:req.params.id}
            },
            {new : true, upsert:true},
            (err, docs)=>{
                if(err)
                   return res.status(500).json({message : "erreur l'ors de l'enregistrement dans la liste d'amis "});
            }
        );
    }catch(err){
        return res.status(400).send(err);
    }
};

/***  unfollow user  ***/

module.exports.unfollowUser = async(req, res) =>{
    if (!objetId.isValid(req.params.id) || !objetId.isValid(req.body.idToUnfollow) )
        return res.status(400).send(`id incorrecte ${req.params.id} ou ${req.body.idToUnfollow} `);

    try{
        // retrait de la liste followings
        await User.findByIdAndUpdate(
            req.params.id,
            {$pull : {followers : req.body.idToUnfollow}},
            {new: true, upsert: true},
            (err, docs) =>{
                if(!err){
                    res.status(200).json(docs);
                }else{
                    return res.status(400).json({message : "erreur l'ors de l'enregistrement dans la liste d'amis "});
                }
            }
        );
        // retrait de la liste followers
        await User.findByIdAndUpdate(
            req.body.idToUnfollow,
            {$pull : {followings: req.params.id}},
            ({new : true, upsert : true}),
            (err, docs) =>{
                if(err){ 
                    return res.status(500).json({message : "erreur l'ors de l'enregistrement dans la liste d'amis "});
                }
                
            }
        );
    } catch(err){
        res.status(400).send(err);
    }    
};
