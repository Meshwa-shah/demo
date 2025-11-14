import { useEffect, useState } from "react";
import axios from "axios";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    city: "",
    url: "",
    strip: "",
    imagealt: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editId, setEditId] = useState(null);

  // ✅ FETCH
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:8081/video/fetch");
      setVideos(res.data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE SELECT
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ✅ OPEN ADD
  const openAddPopup = () => {
    setIsEdit(false);
    setFormData({
      category: "",
      city: "",
      url: "",
      strip: "",
      imagealt: "",
    });
    setImageFile(null);
    setPreviewImage(null);
    setShowPopup(true);
  };

  // ✅ OPEN EDIT
  const openEditPopup = (item) => {
    setIsEdit(true);
    setEditId(item._id);
    setFormData({
      category: item.category,
      city: item.city,
      url: item.url,
      strip: item.strip,
      imagealt: item.imagealt,
    });
    setPreviewImage(item.image);
    setImageFile(null);
    setShowPopup(true);
  };

  // ✅ ADD VIDEO
  const handleAdd = async () => {
    if (
      !formData.category.trim() ||
      !formData.city.trim() ||
      !formData.strip.trim() ||
      !formData.imagealt.trim() ||
      !formData.url.trim()
    ) {
      return;
    }
    setloading(true);
    try {
      const fd = new FormData();
      fd.append("category", formData.category);
      fd.append("city", formData.city);
      fd.append("url", formData.url);
      fd.append("strip", formData.strip);
      fd.append("imagealt", formData.imagealt);
      if (imageFile) fd.append("image", imageFile);

      await axios.post("http://localhost:8081/video/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchVideos();
      setShowPopup(false);
    } catch (err) {
      console.error("Add Error:", err);
    } finally {
      setloading(false);
    }
  };

  // ✅ EDIT VIDEO
  const handleEdit = async () => {
    if (
      !formData.category.trim() ||
      !formData.city.trim() ||
      !formData.strip.trim() ||
      !formData.imagealt.trim() ||
      !formData.url.trim()
    ) {
      return;
    }
    setloading(true);
    try {
      const fd = new FormData();
      fd.append("category", formData.category);
      fd.append("city", formData.city);
      fd.append("url", formData.url);
      fd.append("strip", formData.strip);
      fd.append("imagealt", formData.imagealt);
      if (imageFile) fd.append("image", imageFile);

      await axios.put(`http://localhost:8081/video/edit/${editId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchVideos();
      setShowPopup(false);
    } catch (err) {
      console.error("Edit Error:", err);
    } finally {
      setloading(false);
    }
  };

  // ✅ DELETE VIDEO
  const handleDelete = async (id) => {
    setloading(true);
    try {
      await axios.post(`http://localhost:8081/video/delete`, { id });
      fetchVideos();
    } catch (err) {
      console.error("Delete Error:", err);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md w-full">

      {/* ✅ HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold">Video Gallery</h2>

        <button
          onClick={openAddPopup}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Add New
        </button>
      </div>

      {/* ✅ RESPONSIVE TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border text-center">#</th>
              <th className="p-2 border text-center">Thumbnail</th>
              <th className="p-2 border text-center">Category</th>
              <th className="p-2 border text-center">City</th>
              <th className="p-2 border text-center">URL</th>
              <th className="p-2 border text-center">Strip</th>
              <th className="p-2 border text-center w-32">Actions</th>
            </tr>
          </thead>

          <tbody>
            {videos.map((item, i) => (
              <tr key={item._id} className="border-b">
                <td className="p-2 border text-center">{i + 1}</td>

                <td className="p-2 border text-center">
                  <img
                    src={item.image.url}
                    alt={item.imagealt}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                  />
                </td>

                <td className="p-2 border text-center">{item.category}</td>
                <td className="p-2 border text-center">{item.city}</td>

                <td className="p-2 border  text-center">{item.url}</td>

                <td className="p-2 border text-center">{item.strip}</td>

                <td className="p-2 border text-center space-x-2 space-y-1">
                  <button
                    onClick={() => openEditPopup(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded mt-2 sm:mt-0"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ POPUP RESPONSIVE */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-3">
              {loading ? "wait..." : isEdit ? "Edit Video" : "Add New Video"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="url"
                placeholder="YouTube URL"
                value={formData.url}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="strip"
                placeholder="Strip"
                value={formData.strip}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="imagealt"
                placeholder="Image Alt"
                value={formData.imagealt}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border p-2 rounded"
              />

              {previewImage && (
                <img
                  src={previewImage}
                  className="w-20 h-20 mt-2 rounded object-cover"
                  alt="Preview"
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded w-full sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={isEdit ? handleEdit : handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto"
              >
                {loading ? "wait..." : isEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
