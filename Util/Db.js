const { Sequelize } = require('sequelize');
const { InfluxDB } = require("@influxdata/influxdb-client");
// const { InfluxDB, Point } = require('@influxdata/influxdb-client') 

const sequelize = new Sequelize({
  database: 'EnergyManagement',
  username: 'postgres',
  password: 'AnandAK3@',
  host: 'localhost',
  dialect: 'postgres', 
});

const influxDBOptions = {
  url: "http://192.200.11.122:8086", 
  token: "bmLGYv6hspYJg1f6Jg1I0OFvbaj8c5mbLB2QYUpiHlYoHzkO4laXCFXUfm2kRNWDRy953NFhL9zJVYLEvhIHAQ==",
  org: "df81298b33c35b73", 
};

const influxDB = new InfluxDB(influxDBOptions); 
// const queryApi = new InfluxDB({url, token}).getQueryApi(org)

  module.exports = {
    // queryApi: queryApi,
    sequelize: sequelize,
    influxDB: influxDB,
  };