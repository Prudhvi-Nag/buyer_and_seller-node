const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const sellerRoutes = require("./routes/seller.route");
const propertyRoutes = require("./routes/property.route");
// bhargavi
dotenv.config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE",
  })
);

const dbConnect = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    await mongoose.connect(mongoURI);
    console.log("db connected");
  } catch (err) {
    console.log(err.message);
  }
};

dbConnect();

// routes
app.get("/", (req, res) => {
  res.send({ title: "Express js" });
});

app.use("/api/v1", sellerRoutes);
app.use("/api/v1/property", propertyRoutes);

const port = process.env.PORT || 3000; // Ensure there's a default port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
