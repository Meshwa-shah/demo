import mongoose from 'mongoose';
const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  number: { type: String },
  clinic: { type: String },
  url: { type: String }
}, { timestamps: true });
export default mongoose.model('appointment', AppointmentSchema);
