// gestion des erreurs 
module.exports.signUpErrors = (err) =>{
    let errors = {username :"", email: "", password : ""};
    if(err.message.includes("username"))
      errors.username = "username incorrect ou déjà pris";
    if(err.message.includes("email"))
      errors.email = "Email incorrect";
    if(err.message.includes("password"))
      errors.password = "le mot de passe doit faire 6 caractères minimum";
      
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
      errors.username = "ce username est déjà pris";  

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "cet email est déjà enregistrer";  

    return errors;
}

module.exports.signInErrors = (err) =>{
    let errors = {email : "", password : ""};
    if(err.message.includes("email"))
      errors.email = "Email inconnu";
    if(err.message.includes("password"))
      errors.password = "le mot de passe ne correspond pas"  

    return errors;  
}