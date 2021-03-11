const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
const getAirQualityFactors = require("../routes/airqualityfactors");

mongoose
  .connect("mongodb://localhost/AirQualityMonitoring")
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("Not connected", err));


const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/api",getAirQualityFactors);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
