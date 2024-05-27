const express = require("express");

const {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  getPropertieById,
} = require("../controllers/property.controller");
const { userAuth } = require("../middleware/middleware");

const router = express.Router();

router.use(userAuth);

router.route("/create").post(createProperty);
router.route("/details").get(getProperties);
router
  .route("/details/:id")
  .get(getPropertieById)
  .patch(userAuth, updateProperty)
  .delete(userAuth, deleteProperty);

module.exports = router;
