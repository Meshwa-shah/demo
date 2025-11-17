import City from '../models/City.js';

export const createCity = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await City.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCity = async (req, res) => {
  try {
    const items = await City.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCity = async (req, res) => {
  try {
    const item = await City.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'City not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCity = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await City.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'City not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const item = await City.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'City not found' });
    res.status(200).json({ success: true, message: 'City deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
