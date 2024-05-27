const mongoose = require("mongoose");

const sellerModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Please add a Full Name"],
      match: /^[\p{L}].*$/u,
    },
    mobileNumber: {
      type: Number,
      trim: true,
      minlength: 10,
      maxlength: 10,
      required: [true, "Please add a Mobile Number"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add an Email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid Email",
      ],
    },
    password: {
      type: String,
      trim: true,
      minlength: [6, "Password must have at least six(6) characters"],
      required: [true, "Please add a Password"],
    },
    gender: {
      type: String,
      enum: ["NONE", "MALE", "FEMALE", "OTHERS"],
      required: [true, "Please select a Gender"],
    },
    properties: [
      {
        type: Object,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", sellerModel);
