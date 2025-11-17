import OurFact from '../models/OurFact.js';

export const createOurFact = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await OurFact.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllOurFact = async (req, res) => {
  try {
    const items = await OurFact.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOurFact = async (req, res) => {
  try {
    const item = await OurFact.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'OurFact not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateOurFact = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await OurFact.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'OurFact not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteOurFact = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const item = await OurFact.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'OurFact not found' });
    res.status(200).json({ success: true, message: 'OurFact deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
