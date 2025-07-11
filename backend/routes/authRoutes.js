const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// User registration
router.post("/register", authController.register);

// send OTP
router.post("/login", authController.login);

//  verify OTP 
router.post("/verify-otp", authController.verifyOtp);



module.exports = router;
