import VideoGallery from '../models/VideoGallery.js';
import { uploadFile, deleteById } from '../utils/cloudinaryUtil.js';
export const createVideoGallery = async (req, res) => {
  try {
    const payload = req.body || {};
    if (req.files && req.files['image'] && req.files['image'][0]) {
          const resu = await uploadFile(req.files['image'][0].path, 'Testimonial/image');
          payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await VideoGallery.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllVideoGallery = async (req, res) => {
  try {
    const items = await VideoGallery.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getVideoGallery = async (req, res) => {
  try {
    const item = await VideoGallery.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'VideoGallery not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateVideoGallery = async (req, res) => {
  try {
    const payload = req.body || {};
     const id = req.body.id || req.params.id;
      const existing = await VideoGallery.findById(id);
      if (req.files && req.files['image'] && req.files['image'][0]) {
        if (existing && existing['image'] && existing['image'].public_id) await deleteById(existing['image'].public_id);
        const resu = await uploadFile(req.files['image'][0].path, 'Testimonial/image');
        payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
      }
    const item = await VideoGallery.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'VideoGallery not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteVideoGallery = async (req, res) => {
  try {
    const id = req.body.id || req.body._id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
        const existing = await VideoGallery.findById(id);
        if (existing && existing['image'] && existing['image'].public_id) { await deleteById(existing['image'].public_id); }
    const item = await VideoGallery.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'VideoGallery not found' });
    res.status(200).json({ success: true, message: 'VideoGallery deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
