const mongoose = require("mongoose");


const AirQualityData = mongoose.model("PolutantsData", new mongoose.Schema(
  {
    humidity: {
      type: Number,
      required: "true",
    },
    temperature: {
      type: Number,
      required: "true",
    },
    pm25: {
      type: Number,
      required: "true",
    },
    CO: {
      type: Number,
      required: "true",
    },
    CO2: {
      type: Number,
      required: "true",
    },
    location: { type: String, required: "true" },
  },
  { timestamps: true }
));

exports.AirQualityData = AirQualityData;
