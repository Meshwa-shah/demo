import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { id } = useParams();
  const blogId = id
  console.log(blogId)
  // ✅ Fetch comments
  const fetchComments = async () => {
    try {
      setFetching(true);
      const res = await axios.get(`http://localhost:8081/comment/fetch/${blogId}`);
      if (res.data.success) {
        setComments(res.data.data.comments);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  // ✅ Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.description) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:8081/comment/add/${blogId}`, form);

      if (res.data.success) {
        setComments(res.data.data.comments);
        setForm({ name: "", email: "", description: "" });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Comment
  const handleDelete = async (id) => {
   

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:8081/comment/delete`, {
       commentId: id,
       blogId: blogId
      });

      if (res.data.success) {
        setComments(res.data.data.comments);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* ✅ Loading State */}
      {fetching ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.email}</p>
                </div>

                <button
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => handleDelete(c._id)}
                  disabled={loading}
                >
                  {loading ? "..." : "Delete"}
                </button>
              </div>

              <p className="text-gray-700 mt-2">{c.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Form */}
      <form
        onSubmit={handleAddComment}
        className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
        />

        <textarea
          placeholder="Write your comment..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none h-28"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
        >
          {loading ? "Adding..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;
