const Sequelize = require("sequelize");
const { sequelize } = require("../Util/Db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  otp: {
    type: Sequelize.STRING,
  },
  otpExpirationTime: {
    type: Sequelize.DATE,
  },
});

module.exports = User;
