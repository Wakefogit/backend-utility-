const express = require("express");
const Electricity = require("../Controller/Electricity");
const router = express.Router();

router.post('/createelectricity',Electricity.createElectricity)
router.post('/creategas',Electricity.createGas)
router.post('/createwater',Electricity.createWater)
router.post('/createcompressedair',Electricity.createCompressedAir)








module.exports = router;