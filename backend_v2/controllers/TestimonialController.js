import Testimonial from '../models/Testimonial.js';
import { uploadFile, deleteById } from '../utils/cloudinaryUtil.js';
export const createTestimonial = async (req, res) => {
  try {
    const payload = req.body || {};
    if (req.files && req.files['image'] && req.files['image'][0]) {
      const resu = await uploadFile(req.files['image'][0].path, 'Testimonial/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await Testimonial.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllTestimonial = async (req, res) => {
  try {
    const items = await Testimonial.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const payload = req.body || {};
    const id = req.body.id || req.params.id;
    const existing = await Testimonial.findById(id);
    if (req.files && req.files['image'] && req.files['image'][0]) {
      if (existing && existing['image'] && existing['image'].public_id) await deleteById(existing['image'].public_id);
      const resu = await uploadFile(req.files['image'][0].path, 'Testimonial/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await Testimonial.findByIdAndUpdate(id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const existing = await Testimonial.findById(id);
    if (existing && existing['image'] && existing['image'].public_id) { await deleteById(existing['image'].public_id); }
    const item = await Testimonial.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
