const User = require("../Models/User");
const Role = require("../Models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOtp, hashedPassword,sendOtpToMail} = require("../Util/Helpers");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, selectedRole } = req.body;

    const role = await Role.findOne({ where: { name: selectedRole } });
    if (!role) {
      return res.status(400).json({ error: "Selected role not found" });
    }
    const hashedpassword = await hashedPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      roleId: role.id,
    });

    res
      .status(200)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};


exports.postLogin = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    // Check if the selected role exists before creating the user
 
    const user = await User.findOne({ where: { name } });
    console.log(user,"this is user")
    if (!user) {
      return res.status(202).json({ error: "Invalid name" });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(206).json({ error: "Invalid password" });
    }
    // Generate JWT token
    const secretKey = "SecretKey";
    const payload = { user: user, roleID: user.roleId };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      message: "User logged in  successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userData = await User.findAll();

    console.log(userData);
    res
      .status(200)
      .json({ message: "User Fetched Successfully", userValues: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error  occured during creating user" });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(201).json({ error: "user not found" });
    }

    //generate otp
    const otp = generateOtp();
    //setting the expiration time to otp
    const hashedOtp  = await hashedPassword(otp);
    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + 60);
    //storing the otp and expiration time in user table
    user.otp = hashedOtp;
    user.otpExpirationTime = expirationTime;

    await user.save();
    //send otp to mail ;
    sendOtpToMail(email,otp);
    res.status(200).json({ message: 'OTP sent successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occured during forgot password" });
  }
};

exports.verifyOtp = async (req,res,next) =>{
  try{
    const {email,otp } = req.body;   
    const user = await User.findOne({where: { email: email } });
  
    if (!user) {
      return res.status(201).json({ message: 'User not found' });
    }
    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid || new Date() > user.otpExpirationTime) {
      return res.status(201).json({ error: "Invalid Otp" });
    }
    res.status(200).json({ message: 'OTP verified successfully' });
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occured during verifying password" });
  }
  
}

exports.resetPassword = async (req,res,next) =>{
try{
const {email,newpassword,confirmpassword} = req.body;
const user = await User.findOne({ where: { email: email } });
  
if (!user) {
  return res.status(201).json({ message: 'User not found' });
}
if(newpassword !== confirmpassword){
  return res.status(201).json({ message: 'Password does not match' });
}
const hashedpassword = await hashedPassword(confirmpassword);
user.password = hashedpassword;
user.otp = null;
  user.otpExpirationTime = null;
  await user.save();
  res.status(200).json({ message: "Password reset successfully" });
}catch (error) {
    console.error(error);
    res.status(501).json({ error: "Error occured during reset password" });
  }
}
