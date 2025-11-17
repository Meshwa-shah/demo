import mongoose from 'mongoose';
const OurFactSchema = new mongoose.Schema({
  title: { type: String },
  count1: { type: Number, default: 0 },
  count2: { type: Number, default: 0 },
  count3: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('ourfact', OurFactSchema);
