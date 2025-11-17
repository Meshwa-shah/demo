import faq from "../models/faq.js";

// Create FAQ
export const createFaq = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await faq.create(payload);

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All
export const getAllFaq = async (req, res) => {
  try {
    const items = await faq.find({});
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Single
export const getFaq = async (req, res) => {
  try {
    const item = await faq.findById(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "FAQ not found" });

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update
export const updateFaq = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await faq.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });

    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "FAQ not found" });

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete
export const deleteFaq = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "id required in body" });

    const item = await faq.findByIdAndDelete(id);

    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "FAQ not found" });

    res.status(200).json({
      success: true,
      message: "FAQ deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
