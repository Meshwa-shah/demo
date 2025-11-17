import Cms from '../models/Cms.js';

export const createCms = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Cms.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCms = async (req, res) => {
  try {
    const items = await Cms.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCms = async (req, res) => {
  try {
    const item = await Cms.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Cms not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCms = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Cms.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Cms not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCms = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const item = await Cms.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Cms not found' });
    res.status(200).json({ success: true, message: 'Cms deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
