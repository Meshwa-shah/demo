import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
    question: String,
    answer: String,
    sequence: Number,
    category: String,
    strip: String,
}, {timestamps: true});

export default mongoose.model('faq', FaqSchema);