import mongoose from 'mongoose';
const CitySchema = new mongoose.Schema({
  city: { type: String, required: true }
}, { timestamps: true });
export default mongoose.model('city', CitySchema);
