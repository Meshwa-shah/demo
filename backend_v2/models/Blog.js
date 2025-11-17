import mongoose from 'mongoose';
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  name: { type: String },
  tags: { type: String },
  strip: { type: String },
  imagealt: { type: String },
  metatitle: { type: String },
  metakeyword: { type: String },
  metadescription: { type: String },
  image: { url: String, secure_url: String, public_id: String },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment"
    }
  ]
}, { timestamps: true });
export default mongoose.model('blog', BlogSchema);
