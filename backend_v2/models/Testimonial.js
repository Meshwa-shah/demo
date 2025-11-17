import mongoose from 'mongoose';
const TestimonialSchema = new mongoose.Schema({
  comments: { type: String },
  name: { type: String },
  city: { type: String },
  strip: { type: String },
  image: { url: String, secure_url: String, public_id: String }
}, { timestamps: true });
export default mongoose.model('testimonial', TestimonialSchema);
