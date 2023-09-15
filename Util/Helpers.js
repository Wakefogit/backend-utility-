const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer")
const hashedPassword = async (data) => {
  try {
    const saltRounds = 5;
    const hashedPassword = bcrypt.hash(data, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occured during hased password" });
  }
};

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOtpToMail = (email,otp) =>{
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: "anandbalu324@gmail.com",
      pass: "ohqpyogrhwhxbjri",
    },
  });
  const mailOptions = {
    from: "anandkumar",
    to: email,
    subject: 'OTP for Password Reset',
    text: `
    Your OTP is: ${otp}
    Message:This otp is valid only for 1 minute
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
}

const formatDateToMidnight = (dateString) => {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[2], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based (0 = January)
  const day = parseInt(dateParts[0], 10);
  
  const currentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0)); // Set time to midnight in UTC
  return currentDate.toISOString();
}
 
module.exports = {
  hashedPassword: hashedPassword,
  generateOtp: generateOtp,
  sendOtpToMail:sendOtpToMail,
  formatDateToMidnight:formatDateToMidnight
};
