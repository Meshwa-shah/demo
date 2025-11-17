import Redirection from '../models/Redirection.js';

export const createRedirection = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Redirection.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllRedirection = async (req, res) => {
  try {
    const items = await Redirection.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getRedirection = async (req, res) => {
  try {
    const item = await Redirection.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Redirection not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateRedirection = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Redirection.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Redirection not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteRedirection = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const item = await Redirection.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Redirection not found' });
    res.status(200).json({ success: true, message: 'Redirection deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
