
// const { formatDateToMidnight } = require("../Util/Helpers");
// const { influxDB } = require("../Util/Db");
const moment = require("moment-timezone");
exports.getTodayEnergy = async (req, res, next) => {
  try {

    const { startDate,endDate } = req.query;
   
    // const selectedDate = new Date(date);

    // // Set the time to midnight for the selected date
    // selectedDate.setUTCHours(0, 0, 0, 0);

    // // Convert the selected date to an ISO string with the 'Z' suffix for UTC time
    // selectedDate.setUTCHours(0, 0, 0, 0);

    // // Format the date string manually as "yyyy-mm-ddTHH:MM:SSZ"
    // const year = selectedDate.getUTCFullYear();
    // const month = String(selectedDate.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based
    // const day = String(selectedDate.getUTCDate()).padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day}T00:00:00Z`;

    // console.log(formattedDate);
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
    const formattedDate = `${year}-${month}-${day}T00:00:00Z`; 

    // const stopTime = moment().subtract(5, "hours").subtract(30, "minutes").format("YYYY-MM-DDTHH:mm:ss[Z]");
    const localTimeZoneOffsetHours = 5; // Replace with your local offset
    const localTimeZoneOffsetMinutes = 30; // Replace with your local offset

    // Calculate the stop time based on local time zone offset
    const currentLocalTime = moment().utcOffset(
      localTimeZoneOffsetHours * 60 + localTimeZoneOffsetMinutes
    );
    const stopTime = currentLocalTime.format("YYYY-MM-DDTHH:mm:ss[Z]");
   
    console.log("start time", formattedDate);
    console.log("stopTime:", stopTime);
    const fluxQueryToday = `
    from(bucket: "bindhu")
    |> range(start: ${formattedDate}, stop: ${stopTime}) 
    |> filter(fn: (r) => r["_measurement"] == "EM_2")  
    |> filter(fn: (r) => r["_field"] == "KWH")  
    |> aggregateWindow(every: 1h, fn: last, createEmpty: false)    
  `;
    const org = "wakeflo";
    // influxDB
    //   .getQueryApi(org)
    //   .collectRows(fluxQueryToday)
    //   .then((rows) => {
    //     console.log("Query Result:", rows);
    //     const latestValue = rows[rows.length - 1]._value;
    //     const firstValue = rows[0]._value;
    //     if (latestValue !== null && firstValue !== null) {
    //         // Calculate the difference
    //         const difference = latestValue - firstValue;

    //         console.log('Difference:', difference);
    //     } else {
    //         console.log('Latest value or first value is null. Cannot calculate difference.');
    //     }
    //   })
    influxDB
      .getQueryApi(org)
      .collectRows(fluxQueryToday)
      .then((rows) => {
       console.log("Query Result:", rows);
        const latestValue = rows[rows.length - 1]._value;
            const firstValue = rows[0]._value;
            if (latestValue !== null && firstValue !== null) {
                // Calculate the difference
                const difference = latestValue - firstValue;
                console.log(difference)
                // res.json({message:"data fetched Successfully",data:difference});
                // console.log('Difference:', difference);
            } else {
                console.log('Latest value or first value is null. Cannot calculate difference.');
            }
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
    // res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error fetching today's energy data:", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};


