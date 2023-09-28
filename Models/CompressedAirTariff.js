const Sequelize = require('sequelize');
const {sequelize} = require('../Util/Db');

const CompressedAirTariff = sequelize.define('compressedair', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    fromDate:{
        type:Sequelize.DATE,
        allowNull: false,        
    },
    toDate:{
        type:Sequelize.DATE,       
    },
    currency:{
        type: Sequelize.STRING,
        allowNull:false
    },
    charge:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull:false
    },  
    note:{
        type: Sequelize.STRING,
    } 
  
  });
  
module.exports = CompressedAirTariff;