// const express = require("express");
// const router = express.Router();
// const {queryApi} = require('../Util/Db');
// const Influx = require("influx");
// const AverageCurrentController = require("../Controller/AverageCurrent");

// router.get("/readdata", async (req, res, next) => {
//   const fluxQuery = `from(bucket: "Energy_meter")
//   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
//   |> filter(fn: (r) => r["_measurement"] == "EM_22" or r["_measurement"] == "EM_3")
//   |> filter(fn: (r) => r["_field"] == "KWH")
//   |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
//   |> yield(name: "mean")`;

//   const myQuery = async () => {
//     for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
//       const o = tableMeta.toObject(values)
//       res.status(200).send(o)
//     }
//   }
//   myQuery()
// });

// module.exports = router;

// const { InfluxDB, flux } = require("@influxdata/influxdb-client");

// // Create an instance of the InfluxDB client
// const token = "SCohoknxBiZvQJcpUbwFYCprfsAkw32x9iItS-y33NIaeUcJaHNjak1M-JRceYby3fvuI0TH4kRmcH0WGu07Ow==";
// const org = "wakeflo";
// const bucket = "Energy_meter";
// const client = new InfluxDB({ url: "http://localhost:8086", token: token });
// const queryApi = client.getQueryApi(org);

// // Construct the Flux query
// const fluxQuery = `
//   from(bucket: "${bucket}")
//     |> range(start: 2023-08-01T00:00:00Z, stop: 2023-08-31T00:00:00Z)
//     |> filter(fn: (r) => r._measurement == "your_measurement_name")
//     |> filter(fn: (r) => r._field == "kwh")
// `;

// // Execute the Flux query
// queryApi.queryRows(fluxQuery, {
//   next(row, tableMeta) {
//     console.log("Row:", row, "Table Meta:", tableMeta);
//   },
//   error(error) {
//     console.error("Error executing query:", error);
//   },
//   complete() {
//     console.log("Query complete");
//   },
// });

const { InfluxDB, flux } = require("@influxdata/influxdb-client");

// Create an instance of the InfluxDB client
// const token = "SCohoknxBiZvQJcpUbwFYCprfsAkw32x9iItS-y33NIaeUcJaHNjak1M-JRceYby3fvuI0TH4kRmcH0WGu07Ow==";
// const org = "wakeflo";
// const bucket = "Energy_meter";
// const client = new InfluxDB({ url: "http://localhost:8086", token });

// const fluxQuery = flux`
//   from(bucket: ${bucket})
//     |> range(start: 2023-08-01T00:00:00Z, stop: 2023-08-31T00:00:00Z)
//     |> filter(fn: (r) => r._measurement == "your_measurement_name")
//     |> filter(fn: (r) => r._field == "kwh")
// `;

// client.query(fluxQuery).then(result => {
//   console.log("Query result:", result);
// }).catch(error => {
//   console.error("Error executing query:", error);
// });


const express = require("express");

const router = express.Router();
const energyController = require("../Controller/energy")
router.get("/energy/zone1", energyController.getTodayZone1Energy);
router.get("/energy/zone2", energyController.getTodayZone2Energy);
router.get("/energy/zone1heatmap", energyController.get1WeekHeatMap);


module.exports = router;










