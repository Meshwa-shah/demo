import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';
export const getComment = async (req, res) => {
  try {
    const item = await Comment.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Comment not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const payload = req.body || {};

    if (!payload.blogid) {
      return res.status(400).json({
        success: false,
        message: "blogid is required"
      });
    }

    // 1️⃣ Create comment
    const item = await Comment.create(payload);

    // 2️⃣ Push comment id to Blog.comments[]
    await Blog.findByIdAndUpdate(
      payload.blogid,
      { $push: { comments: item._id } },
      { new: true }
    );

    res.status(201).json({ success: true, data: item });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL COMMENTS
export const getAllComment = async (req, res) => {
  try {
    const items = await Comment.find({});
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE COMMENT
export const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body || {};

    const item = await Comment.findByIdAndUpdate(id, payload, { new: true });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    res.status(200).json({ success: true, data: item });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required in body"
      });
    }

    // Find comment first
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    // 1️⃣ Remove comment from Blog
    await Blog.findByIdAndUpdate(
      comment.blogid,
      { $pull: { comments: id } }
    );

    // 2️⃣ Delete comment
    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};