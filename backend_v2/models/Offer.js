import mongoose from 'mongoose';
const OfferSchema = new mongoose.Schema({
  strip: { type: String },
  status: { type: Boolean, default: true },
  title: { type: String },
  category: { type: String },
  head: { type: String },
  body: { type: String },
  startdate: { type: Date },
  enddate: { type: Date },
  imgtitle: { type: String },
  metatitle: { type: String },
  description: { type: String },
  image: { url: String, secure_url: String, public_id: String }
}, { timestamps: true });
export default mongoose.model('offer', OfferSchema);
