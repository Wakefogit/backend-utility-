const express = require("express");
const userController = require("../Controller/user");
const router = express.Router();
const {authenticateToken,requireAdminPermission} = require("../Middleware/authenticateToken");
const { route } = require("./Energy");
router.post("/signup", authenticateToken,requireAdminPermission,userController.createUser);
router.post("/login",userController.postLogin);

router.post("/forgotpassword",userController.forgotPassword);
router.post("/otp",userController.verifyOtp);
router.post("/resetpassword",userController.resetPassword);
router.get('/getUserData',userController.getUser)





module.exports = router;
