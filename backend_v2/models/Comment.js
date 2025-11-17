import mongoose from 'mongoose';
const CommentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  description: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model('comment', CommentSchema);
