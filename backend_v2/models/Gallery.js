import mongoose from 'mongoose';
const GallerySchema = new mongoose.Schema({
  strip: { type: String },
  title: { type: String },
  category: String,
  imagetitle: String,
  imagealt: String,
  metatitle: String,
  metakeyword: String,
  metadescription: String,
  image: {
    url: String,
    secure_url: String,
    public_id: String
  }
}, { timestamps: true });
export default mongoose.model('image', GallerySchema);
