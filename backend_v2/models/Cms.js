import mongoose from 'mongoose';
const CmsSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  strip: { type: String }
}, { timestamps: true });
export default mongoose.model('cms', CmsSchema);
