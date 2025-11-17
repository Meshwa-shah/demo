import mongoose from 'mongoose';
const RedirectionSchema = new mongoose.Schema({
  source: { type: String },
  destination: { type: String }
}, { timestamps: true });
export default mongoose.model('url', RedirectionSchema);
