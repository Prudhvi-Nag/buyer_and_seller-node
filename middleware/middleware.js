const sellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Authorization token Required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.body.user = await sellerModel.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ message: "Authorization token is not authorized" });
  }
};

module.exports = { userAuth };
