import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
}, {timestamps: true});

export default mongoose.model("user", UserSchema);