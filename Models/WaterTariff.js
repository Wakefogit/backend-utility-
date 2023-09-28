const Sequelize = require('sequelize');
const {sequelize} = require('../Util/Db');

const WaterTariff = sequelize.define('water', {
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
    coldWaterPrice:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    hotWaterPrice:{
        type: Sequelize.INTEGER,
    },
    note:{
        type: Sequelize.STRING,
    }    
  
  });
  
module.exports = WaterTariff;