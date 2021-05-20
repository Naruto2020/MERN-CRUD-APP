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
router.get("/", userController.getAllusers);
router.get("/:id", userController.getUser);

// Update User
router.put("/:id", userController.editUser);

// follow & unfollow user
router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unfollowUser);

// Delete user
router.delete("/:id", userController.cancelUser);

module.exports = router;
