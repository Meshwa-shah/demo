import Inquiry from '../models/Inquiry.js';

export const createInquiry = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Inquiry.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllInquiry = async (req, res) => {
  try {
    const items = await Inquiry.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getInquiry = async (req, res) => {
  try {
    const item = await Inquiry.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateInquiry = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Inquiry.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const item = await Inquiry.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
