const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sellerModel = require("../models/seller.model");
const { generateTokens, verifyToken } = require("../services/jwt.service");

const sellerSignUp = async (req, res) => {
  const { fullName, email, password, gender, mobileNumber } = req.body;

  try {
    const userCheck = await sellerModel.findOne({ email });
    if (userCheck) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const seller = await sellerModel.create({
      fullName,
      email,
      gender,
      mobileNumber,
      password: hashedPassword,
    });

    await seller.save();

    const token = await generateTokens(
      { id: seller._id, role: seller.role },
      "seller"
    );

    return res.status(201).json({
      message: "Account created successfully",
      data: { email, tokens: token },
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const sellerSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password is required" });
    }

    const user = await sellerModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const tokens = await generateTokens(
      { id: user._id, role: user.role },
      "user"
    );

    return res.status(200).json({
      message: "Signed in successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
        tokens,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const sellerDetails = async (req, res) => {
  const userId = req.body.user;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "Provide a valid user Id" });
    }

    const desiredFields = "fullName mobileNumber email gender properties";
    const user = await sellerModel.findById(userId).select(desiredFields);

    if (!user) {
      return res.status(400).json({ message: "No such user found" });
    }

    return res.status(200).json({
      code: 200,
      message: "User details",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateSeller = async (req, res) => {
  const userId = req.body.user;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Provide a valid user Id" });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "No such user found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  sellerSignUp,
  sellerSignIn,
  sellerDetails,
  updateSeller,
};
