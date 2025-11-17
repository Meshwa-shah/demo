import Media from '../models/Media.js';
import { uploadFile, deleteById } from '../utils/cloudinaryUtil.js';
export const createMedia = async (req, res) => {
  try {
    const payload = req.body || {};
    if (req.files && req.files['image'] && req.files['image'][0]) {
      const resu = await uploadFile(req.files['image'][0].path, 'Media/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await Media.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const items = await Media.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMedia = async (req, res) => {
  try {
    const item = await Media.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Media not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateMedia = async (req, res) => {
  try {
    const payload = req.body || {};
    const id = req.body.id || req.params.id;
    const existing = await Media.findById(id);
    if (req.files && req.files['image'] && req.files['image'][0]) {
      if (existing && existing['image'] && existing['image'].public_id) await deleteById(existing['image'].public_id);
      const resu = await uploadFile(req.files['image'][0].path, 'Media/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await Media.findByIdAndUpdate(id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Media not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const existing = await Media.findById(id);
    if (existing && existing['image'] && existing['image'].public_id) { await deleteById(existing['image'].public_id); }
    const item = await Media.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Media not found' });
    res.status(200).json({ success: true, message: 'Media deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
