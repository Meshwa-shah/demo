import mongoose from 'mongoose';
const VideoGallerySchema = new mongoose.Schema({
  category: { type: String },
  city: { type: String },
  url: { type: String },
  strip: { type: String },
  imagealt: { type: String },
  image:{
    url: String,
    secure_url: String,
    public_id: String
  }
}, { timestamps: true });
export default mongoose.model('video', VideoGallerySchema);
