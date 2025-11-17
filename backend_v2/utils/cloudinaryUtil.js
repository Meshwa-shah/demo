import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const uploadFile = async (filePath, folder='app') => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  try { fs.unlinkSync(filePath); } catch(e) { /* ignore */ }
  return result;
};

export const deleteById = async (public_id) => {
  if (!public_id) return;
  return cloudinary.uploader.destroy(public_id);
};
