import mongoose from 'mongoose';
const InquirySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  number: { type: String },
  date: { type: Date, default: Date.now() }
}, { timestamps: true });
export default mongoose.model('inquiry', InquirySchema);
