// initialisation du routeur 
const express = require("express");
const router  = express.Router();

// imports module 
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const {checkUser, requireAuth} = require("../midlleware/authMidlleware");

// AUTH Users
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout",checkUser , authController.logout);

// Read Users
router.get("/",checkUser, userController.getAllusers);
router.get("/:id", checkUser, userController.getUser);

// Update User
router.put("/:id", checkUser, userController.editUser);

// follow & unfollow user
router.patch("/follow/:id", checkUser, userController.followUser);
router.patch("/unfollow/:id", checkUser, userController.unfollowUser);

// Delete user
router.delete("/:id", checkUser, userController.cancelUser);

module.exports = router;
