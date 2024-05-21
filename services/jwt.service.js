const jwt = require("jsonwebtoken");

const generateTokens = async (id, usertype) => {
  try {
    const payload = { _id: id.id, role: id.role };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 5 * 60 * 1000, // 5 minutes
    });

    return { token };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const verifyToken = async (token) => {
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    return _id;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { generateTokens, verifyToken };
