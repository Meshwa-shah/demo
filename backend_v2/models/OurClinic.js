import mongoose from 'mongoose';
const OurClinicSchema = new mongoose.Schema({
  drname: { type: String },
  drprofile: { type: String },
  clinicname: { type: String },
  mobile: { type: String },
  email: { type: String },
  address: { type: String },
  area: { type: String },
  maplink: { type: String },
  strip: { type: String },
  image: { url: String, secure_url: String, public_id: String }
}, { timestamps: true });
export default mongoose.model('clinic', OurClinicSchema);
