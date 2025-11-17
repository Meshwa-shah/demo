import Gallery from '../models/Gallery.js';

export const createGallery = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Gallery.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllGallery = async (req, res) => {
  try {
    const items = await Gallery.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getGallery = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await Gallery.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Gallery not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const item = await Gallery.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery not found' });
    res.status(200).json({ success: true, message: 'Gallery deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
