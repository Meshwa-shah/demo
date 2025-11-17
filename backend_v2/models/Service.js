import mongoose from 'mongoose';
const ServiceSchema = new mongoose.Schema({
  service: { type: String },
  display: { type: Boolean, default: true },
  strip: { type: String },
  image: { url: String, secure_url: String, public_id: String }
}, { timestamps: true });
export default mongoose.model('service', ServiceSchema);
