const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: [true, "Please add a place"],
      trim: true,
    },
    numberOfBedrooms: {
      type: Number,
      required: [true, "Please add the number of bedrooms"],
    },
    numberOfBathrooms: {
      type: Number,
      required: [true, "Please add the number of bathrooms"],
    },
    hospitalsNearby: {
      type: [String],
      required: [true, "Please add nearby hospitals"],
    },
    collegesNearby: {
      type: [String],
      required: [true, "Please add nearby colleges"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
