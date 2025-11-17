import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema({
  strip: { type: String },
  name: { type: String, required: true },
  display: { type: Boolean, default: false },
  title: { type: String },
  sequence: { type: String },
  imagetitle: { type: String },
  imagealt: { type: String },
  image: { url: String, secure_url: String, public_id: String },
  icon: { url: String, secure_url: String, public_id: String }
}, { timestamps: true });
export default mongoose.model('category', CategorySchema);
