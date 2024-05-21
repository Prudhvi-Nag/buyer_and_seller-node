const Seller = require("../models/seller.model");
const Property = require("../models/property.model");

const createProperty = async (req, res) => {
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const property = await Property.create(req.body);
    seller.properties.push(property._id);
    await seller.save();

    return res
      .status(201)
      .json({ message: "Property created successfully", data: property });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getProperties = async (req, res) => {
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const properties = await Property.find({});

    return res
      .status(200)
      .json({ message: "Properties found", data: properties });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPropertieById = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const properties = await Property.findById(id);

    return res
      .status(200)
      .json({ message: "Properties found", data: properties });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await Property.findByIdAndDelete(id);
    await Seller.findByIdAndUpdate(req.body.user._id, {
      $pull: { properties: id },
    });

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertieById,
  updateProperty,
  deleteProperty,
};
