import mongoose from 'mongoose';
const MediaSchema = new mongoose.Schema({
  title: { type: String },
  strip: { type: String },
  image: { url: String, secure_url: String, public_id: String }
}, { timestamps: true });
export default mongoose.model('media', MediaSchema);
