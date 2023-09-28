const express = require("express");

const { sequelize } = require("./Util/Db");
const User = require("./Models/User");
const Role = require("./Models/Role");
const userRoute = require("./Routes/User");
const averageEnergyRoute = require("./Routes/Energy");
const electricityRoute = require("./Routes/Electricity")
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

//routes
app.use(userRoute);
app.use(averageEnergyRoute);
app.use(electricityRoute);

User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });
sequelize
  .sync({ force: true }) // Use { force: true } during development to drop and recreate tables
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error creating database & tables:", error);
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
