const mongoose = require("mongoose");

const buyerModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please add a First Name"],
      match: /^[\p{L}].*$/u,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please add a Last Name"],
      match: /^[\p{L}].*$/u,
    },
    mobileNumber: {
      type: Number,
      trim: true,
      minlength: 10,
      maxlength: 10,
      default: null,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add a E-mail"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid E-mail",
      ],
    },
    password: {
      type: String,
      trim: true,
      minlength: [6, "password must have at least six(6) characters"],
    },
    gender: {
      type: String,
      enum: ["NONE", "MALE", "FEMALE", "OTHERS"],
    },

    role: {
      type: String,
      trim: true,
      default: "Buyer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Buyer", buyerModel);
