const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {AirQualityData:AQFactor} = require("../models/airqualityfactors");

router.get("/", async (req, res) => {
  const AQData = await AQFactor.find();
  res.send(JSON.stringify(AQData));
});

router.post("/", (req, res) => {
  setData(req, res);
});


async function setData(req, res) {
  try {
    const data = new AQFactor(req.body);
    const DataResult = await data.save();
    res.send(DataResult);
  } catch (err) {
    res.send(`Error in adding ${err}`);
  }
}

module.exports = router;
