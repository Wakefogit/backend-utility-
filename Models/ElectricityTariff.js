const Sequelize = require('sequelize');
const {sequelize} = require('../Util/Db');

const ElectrictyTariff = sequelize.define('electricity', {
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
        allowNull:true       
    },
    currency:{
        type: Sequelize.STRING,
        allowNull:false
    },
    charge:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    basicPrice:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    lowPrice:{
        type: Sequelize.INTEGER,
    },
    note:{
        type: Sequelize.STRING,
    }    
  
  });
  
module.exports = ElectrictyTariff;