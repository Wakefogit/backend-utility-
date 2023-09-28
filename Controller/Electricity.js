const Electricity = require("../Models/ElectricityTariff");
const GasTariff = require("../Models/GasTariff");
const WaterTariff = require("../Models/WaterTariff");
const CompressedAirtariff = require("../Models/CompressedAirTariff")
exports.createElectricity = async (req, res, next) => {
  try {
    const { fromDate, toDate, currency, charge, basicPrice, lowPrice, note } =
      req.body;
    console.log(req.body, "this is value");

    const electricity = await Electricity.create({
      fromDate,
      toDate,
      currency,
      charge,
      basicPrice,
      lowPrice,
      note,
    });

    res.status(200).json({
      message: "Electricity data added successfully",
      data: electricity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Electricity" });
  }
};

exports.createGas = async (req, res, next) => {
  try {
    const { fromDate, toDate, currency, charge, price, note } = req.body;

    const gas = await GasTariff.create({
      fromDate,
      toDate,
      currency,
      charge,
      price,
      note,
    });

    res.status(200).json({ message: "Gas data added successfully" ,data:gas});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating gas" });
  }
};

exports.createCompressedAir = async (req, res, next) => {
  try {
    const { fromDate, toDate, currency, charge, price, note } = req.body;

    const compressedair = await CompressedAirtariff.create({
      fromDate,
      toDate,
      currency,
      charge,
      price,
      note,
    });

    res.status(200).json({ message: "Compressed Air data added successfully" ,data:compressedair});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Compressed Air" });
  }
};

exports.createWater = async (req, res, next) => {
  try {
    const {
      fromDate,
      toDate,
      currency,
      charge,
      coldWaterPrice,
      hotWaterPrice,
      note,
    } = req.body;

    const water = await WaterTariff.create({
      fromDate,
      toDate,
      currency,
      charge,
      coldWaterPrice,
      hotWaterPrice,
      note,
    });

    res.status(200).json({ message: "Water data added successfully",data:water });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating water" });
  }
};
