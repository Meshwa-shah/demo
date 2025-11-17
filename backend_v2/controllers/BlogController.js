import Blog from '../models/Blog.js';
import { uploadFile, deleteById } from '../utils/cloudinaryUtil.js';

export const createBlog = async (req, res) => {
  try {
    const payload = req.body || {};
    if (req.files && req.files['image'] && req.files['image'][0]) {
      const resu = await uploadFile(req.files['image'][0].path, 'Blog/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await Blog.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const items = await Blog.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const item = await Blog.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const payload = req.body || {};
    const id = req.body.id || req.params.id;
    const existing = await Blog.findById(id);
    if (req.files && req.files['image'] && req.files['image'][0]) {
      if (existing && existing['image'] && existing['image'].public_id) await deleteById(existing['image'].public_id);
      const resu = await uploadFile(req.files['image'][0].path, 'Blog/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await Blog.findByIdAndUpdate(id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const existing = await Blog.findById(id);
    if (existing && existing['image'] && existing['image'].public_id) { await deleteById(existing['image'].public_id); }
    const item = await Blog.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
