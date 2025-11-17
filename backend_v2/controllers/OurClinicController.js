import OurClinic from '../models/OurClinic.js';
import { uploadFile, deleteById } from '../utils/cloudinaryUtil.js';
export const createOurClinic = async (req, res) => {
  try {
    const payload = req.body || {};
    if (req.files && req.files['image'] && req.files['image'][0]) {
      const resu = await uploadFile(req.files['image'][0].path, 'OurClinic/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await OurClinic.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllOurClinic = async (req, res) => {
  try {
    const items = await OurClinic.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOurClinic = async (req, res) => {
  try {
    const item = await OurClinic.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'OurClinic not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateOurClinic = async (req, res) => {
  try {
    const payload = req.body || {};
    const id = req.body.id || req.params.id;
    const existing = await OurClinic.findById(id);
    if (req.files && req.files['image'] && req.files['image'][0]) {
      if (existing && existing['image'] && existing['image'].public_id) await deleteById(existing['image'].public_id);
      const resu = await uploadFile(req.files['image'][0].path, 'OurClinic/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await OurClinic.findByIdAndUpdate(id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'OurClinic not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteOurClinic = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const existing = await OurClinic.findById(id);
    if (existing && existing['image'] && existing['image'].public_id) { await deleteById(existing['image'].public_id); }
    const item = await OurClinic.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'OurClinic not found' });
    res.status(200).json({ success: true, message: 'OurClinic deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
