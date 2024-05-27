const Seller = require("../models/seller.model");
const Property = require("../models/property.model");

const createProperty = async (req, res) => {
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ code: 404, message: "Seller not found" });
    }

    const property = await Property.create(req.body);
    seller.properties.push(property);
    await seller.save();

    return res.status(201).json({
      code: 201,
      message: "Property created successfully",
      data: property,
    });
  } catch (err) {
    return res.status(400).json({ code: 400, message: err.message });
  }
};

const getProperties = async (req, res) => {
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ code: 404, message: "Seller not found" });
    }
    const properties = await Property.find({});
    return res
      .status(200)
      .json({ code: 200, message: "Properties found", data: properties });
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

const getPropertieById = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ code: 404, message: "Seller not found" });
    }
    const properties = await Property.findById(id);
    return res
      .status(200)
      .json({ code: 200, message: "Properties found", data: properties });
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ code: 404, message: "Seller not found" });
    }

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ code: 404, message: "Property not found" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Update property in seller's properties array
    const sellerPropertyIndex = seller.properties.findIndex(
      (prop) => prop._id.toString() === id
    );
    if (sellerPropertyIndex !== -1) {
      seller.properties[sellerPropertyIndex] = updatedProperty;
    }

    // Save the updated seller document
    await seller.save();

    return res.status(200).json({
      code: 200,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await Seller.findById(req.body.user);
    if (!seller) {
      return res.status(404).json({ code: 404, message: "Seller not found" });
    }
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ code: 404, message: "Property not found" });
    }

    await Property.findByIdAndDelete(id);

    seller.properties = seller.properties.filter((prop) => {
      return prop._id.toString() !== id;
    });

    await seller.save();
    return res
      .status(200)
      .json({ code: 200, message: "Property deleted successfully" });
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertieById,
  updateProperty,
  deleteProperty,
};
