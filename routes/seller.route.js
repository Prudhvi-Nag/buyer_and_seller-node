const express = require("express");
const {
  sellerSignUp,
  sellerSignIn,
  sellerDetails,
} = require("../controllers/seller.controller");
const { userAuth } = require("../middleware/middleware");

const router = express.Router();

router.route("/auth/seller/signup").post(sellerSignUp);
router.route("/auth/seller/signin").post(sellerSignIn);
router.route("/seller/details").get(userAuth, sellerDetails);
router.route("/seller/details").patch(userAuth, sellerDetails);

module.exports = router;
