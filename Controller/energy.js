const { formatDateToMidnight } = require("../Util/Helpers");
const { influxDB } = require("../Util/Db");
const moment = require("moment-timezone");
exports.getTodayZone1Energy = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const endDates = new Date(endDate);

    // Get the current date and time as a Date object
    const currentDate = new Date();

    // Set the date part of the current date to match the end date
    currentDate.setFullYear(endDates.getFullYear());
    currentDate.setMonth(endDates.getMonth());
    currentDate.setDate(endDates.getDate());

    // Get the time components (hours, minutes, and seconds)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Create the combined timestamp in the desired format
    const combinedTimestamp = `${endDate}T${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}Z`;

    // const selectedDate = new Date(startDate);

    // // Adjust for the time zone offset
    // selectedDate.setMinutes(
    //   selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
    // );

    // // Set the time to midnight for the selected date
    // selectedDate.setUTCHours(0, 0, 0);

    // // Format the date string manually as "yyyy-mm-ddTHH:MM:SSZ"
    // const year = selectedDate.getUTCFullYear();
    // const month = String(selectedDate.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-based
    // const day = String(selectedDate.getUTCDate()).padStart(2, "0");
    // const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    //   2,
    //   "0"
    // )}T00:00:00Z`;

    // const stopTime = moment().subtract(5, "hours").subtract(30, "minutes").format("YYYY-MM-DDTHH:mm:ss[Z]");
    // const localTimeZoneOffsetHours = 5; // Replace with your local offset
    // const localTimeZoneOffsetMinutes = 30; // Replace with your local offset

    // Calculate the stop time based on local time zone offset
    // const currentLocalTime = moment().utcOffset(
    //   localTimeZoneOffsetHours * 60 + localTimeZoneOffsetMinutes
    // );
    // const stopTime = currentLocalTime.format("YYYY-MM-DDTHH:mm:ss[Z]");

    const measurementNames = [
      "EM_2",
      "EM_4",
      "EM_6",
      "EM_7",
      "EM_8",
      "EM_10",
      "EM_11",
      "EM_12",
    ];
    // console.log(formattedDate,"start time");
    // console.log(combinedTimestamp,"stop time")
    const results = {};
    const org = "wakeflo";
    Promise.all(
      measurementNames.map((measurement) => {
        const fluxQuery = `
        from(bucket: "bindhu")
          |> range(start: time(v: "${startDate}"), stop: time(v: "${combinedTimestamp}"))
          |> filter(fn: (r) => r["_measurement"] == "EM_4")
          |> filter(fn: (r) => r["_field"] == "KWH")
          |> aggregateWindow(every: 1h, fn: last, createEmpty: false)
      `;
        return influxDB
          .getQueryApi(org)
          .collectRows(fluxQuery)
          .then((rows) => {
            // console.log(rows,"this is rows")
            const latestValue = rows[rows.length - 1]._value;
            // console.log(latestValue,"######values")
            const firstValue = rows[0]._value;
            let difference = null;

            if (latestValue !== null && firstValue !== null) {
              // Calculate the difference
              difference = latestValue - firstValue;
            }
            // console.log(difference, "#######");
            // Store the difference in the results object
            results[measurement] = {
              latestValue,
              firstValue,
              difference,
            };
          });
      })
    )
      .then(() => {
        // Calculate the sum of all differences
        let totalSum = 0;
        measurementNames.forEach((measurement) => {
          if (results[measurement].difference !== null) {
            totalSum += results[measurement].difference;
          }
        });
        // console.log(totalSum, "totalk");
        // Send the total sum in the JSON response
        res.json({ message: "Data fetched successfully", totalSum });
      })
      .catch((error) => {
        console.error("Error executing query:", error);
      });
    // res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error fetching today's energy data:", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getTodayZone2Energy = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const endDates = new Date(endDate);

    // Get the current date and time as a Date object
    const currentDate = new Date();

    // Set the date part of the current date to match the end date
    currentDate.setFullYear(endDates.getFullYear());
    currentDate.setMonth(endDates.getMonth());
    currentDate.setDate(endDates.getDate());

    // Get the time components (hours, minutes, and seconds)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Create the combined timestamp in the desired format
    const combinedTimestamp = `${endDate}T${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}Z`;

    const selectedDate = new Date(startDate);

    // Adjust for the time zone offset
    selectedDate.setMinutes(
      selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
    );

    // Set the time to midnight for the selected date
    selectedDate.setUTCHours(0, 0, 0, 0);

    // Format the date string manually as "yyyy-mm-ddTHH:MM:SSZ"
    const year = selectedDate.getUTCFullYear();
    const month = String(selectedDate.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(selectedDate.getUTCDate()).padStart(2, "0");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T00:00:00Z`;

    const measurementNames = [
      "EM_14",
      "EM_15",
      "EM_16",
      "EM_17",
      "EM_18",
      "EM_19",
      "EM_22",
      "EM_24",
      "EM_25",
      "EM_26",
    ];
    // console.log(formattedDate,"start time");
    // console.log(combinedTimestamp,"stop time")
    const results = {};
    const org = "wakeflo";
    Promise.all(
      measurementNames.map((measurement) => {
        const fluxQuery = `
        from(bucket: "bindhu")
          |> range(start: time(v: "${startDate}"), stop: time(v: "${combinedTimestamp}"))
          |> filter(fn: (r) => r["_measurement"] == "${measurement}")
          |> filter(fn: (r) => r["_field"] == "KWH")
          |> aggregateWindow(every: 1h, fn: last, createEmpty: false)
      `;
        return influxDB
          .getQueryApi(org)
          .collectRows(fluxQuery)
          .then((rows) => {
            const latestValue = rows[rows.length - 1]._value;
            // console.log(latestValue,"######values")
            const firstValue = rows[0]._value;
            let difference = null;

            if (latestValue !== null && firstValue !== null) {
              // Calculate the difference
              difference = latestValue - firstValue;
            }
            // console.log(difference, "#######");
            // Store the difference in the results object
            results[measurement] = {
              latestValue,
              firstValue,
              difference,
            };
          });
      })
    )
      .then(() => {
        // Calculate the sum of all differences
        let totalSum = 0;
        measurementNames.forEach((measurement) => {
          if (results[measurement].difference !== null) {
            totalSum += results[measurement].difference;
          }
        });
        // console.log(totalSum, "totalk");
        // Send the total sum in the JSON response
        res.json({ message: "Data fetched successfully", totalSum });
      })
      .catch((error) => {
        console.error("Error executing query:", error);
      });
    // res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error fetching today's energy data:", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.get1WeekHeatMap = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    console.log(startDate, endDate,"this is week heatmap date");

    const endDates = new Date(endDate);

    // Get the current date and time as a Date object
    const currentDate = new Date();

    // Set the date part of the current date to match the end date
    currentDate.setFullYear(endDates.getFullYear());
    currentDate.setMonth(endDates.getMonth());
    currentDate.setDate(endDates.getDate());

    // Get the time components (hours, minutes, and seconds)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Create the combined timestamp in the desired format
    const combinedTimestamp = `${endDate}T${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}Z`;

    const selectedDate = new Date(startDate);

    // Adjust for the time zone offset
    selectedDate.setMinutes(
      selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
    );

    // Set the time to midnight for the selected date
    selectedDate.setUTCHours(0, 0, 0, 0);

    // Format the date string manually as "yyyy-mm-ddTHH:MM:SSZ"
    const year = selectedDate.getUTCFullYear();
    const month = String(selectedDate.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(selectedDate.getUTCDate()).padStart(2, "0");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T00:00:00Z`;
    // console.log(formattedDate, combinedTimestamp, "this is formateed dates");

    const fluxQueryToday = `
    from(bucket: "bindhu")

    |> range(start: time(v: "${startDate}"), stop: time(v: "${combinedTimestamp}"))
    
    |> filter(fn: (r) => r["_measurement"] == "EM_12")
    
    |> filter(fn: (r) => r["_field"] == "KWH")
    
    |> aggregateWindow(every: 1h, fn: last, createEmpty:false)
    
    |> fill(usePrevious: true)
    
    |> difference()   
  `;
    const org = "wakeflo";
    influxDB
    .getQueryApi(org)
    .collectRows(fluxQueryToday)
    .then((rows) => {
      res.json({ message: "Data fetched successfully", rows });   
       
      // const resultsWithLocalTime = rows.map((entry) => {
      //   const utcTime = moment(entry._time, "YYYY-MM-DDTHH:mm:ss[Z]");
      //   const localTime = utcTime.clone().add(localTimeZoneOffsetHours, 'hours').add(localTimeZoneOffsetMinutes, 'minutes');
      //   entry._time = localTime.format("YYYY-MM-DDTHH:mm:ss[Z]");
      //   return entry;
      // });
      // console.log(resultsWithLocalTime)
     
    })
    .catch((error) => {
      console.error("Error executing query:", error);
    });
  } catch (error) {
    console.error("Error fetching today's energy data:", error);
  }
};
