import Category from '../models/Category.js';
import { uploadFile, deleteById } from '../utils/cloudinaryUtil.js';
export const createCategory = async (req, res) => {
  try {
    const payload = req.body || {};
    if (req.files && req.files['image'] && req.files['image'][0]) {
      const resu = await uploadFile(req.files['image'][0].path, 'Category/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    if (req.files && req.files['icon'] && req.files['icon'][0]) {
      const resu = await uploadFile(req.files['icon'][0].path, 'Category/icon');
      payload['icon'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await Category.create(payload);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const items = await Category.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const item = await Category.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const payload = req.body || {};
    const id = req.body.id || req.params.id;
    const existing = await Category.findById(id);
    if (req.files && req.files['image'] && req.files['image'][0]) {
      if (existing && existing['image'] && existing['image'].public_id) await deleteById(existing['image'].public_id);
      const resu = await uploadFile(req.files['image'][0].path, 'Category/image');
      payload['image'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    if (req.files && req.files['icon'] && req.files['icon'][0]) {
      if (existing && existing['icon'] && existing['icon'].public_id) await deleteById(existing['icon'].public_id);
      const resu = await uploadFile(req.files['icon'][0].path, 'Category/icon');
      payload['icon'] = { url: resu.url, secure_url: resu.secure_url, public_id: resu.public_id };
    }
    const item = await Category.findByIdAndUpdate(id, payload, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) return res.status(400).json({ success: false, message: 'id required in body' });
    const existing = await Category.findById(id);
    if (existing && existing['image'] && existing['image'].public_id) { await deleteById(existing['image'].public_id); }
    if (existing && existing['icon'] && existing['icon'].public_id) { await deleteById(existing['icon'].public_id); }
    const item = await Category.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
