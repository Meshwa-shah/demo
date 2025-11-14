import { useState, useEffect } from "react";
import axios from "axios";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    comments: "",
    name: "",
    city: "",
    strip: "",
    image: null,
  });

  const loadData = async () => {
    const res = await axios.get("http://localhost:8081/testimonial/fetch");
    setTestimonials(res.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const validateForm = () => {
    if (!form.comments || !form.name || !form.city || !form.strip) return false;
    if (!editing && !form.image) return false;
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const fd = new FormData();
    fd.append("comments", form.comments);
    fd.append("name", form.name);
    fd.append("city", form.city);
    fd.append("strip", form.strip);
    if (form.image) fd.append("image", form.image);

    try {
      if (editing) {
        await axios.put(
          `http://localhost:8081/testimonial/edit/${editing}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:8081/testimonial/add",
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setLoading(false);
      setModalOpen(false);
      setEditing(null);
      resetForm();
      loadData();
    } catch (err) {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    await axios.post("http://localhost:8081/testimonial/delete", { id });
    loadData();
  };

  const resetForm = () => {
    setForm({
      comments: "",
      name: "",
      city: "",
      strip: "",
      image: null,
    });
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setForm({
      comments: item.comments,
      name: item.name,
      city: item.city,
      strip: item.strip,
      image: null,
    });
    setModalOpen(true);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-center sm:text-left">
          Testimonials
        </h2>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => {
            resetForm();
            setEditing(null);
            setModalOpen(true);
          }}
        >
          Add New
        </button>
      </div>

      {/* ✅ Responsive Table (scroll on mobile) */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px] sm:min-w-0">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border text-center">#</th>
              <th className="p-2 border text-center">Image</th>
              <th className="p-2 border text-center">Name</th>
              <th className="p-2 border text-center">City</th>
              <th className="p-2 border text-center">Comments</th>
              <th className="p-2 border text-center">Date</th>
              <th className="p-2 border text-center">Strip</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.map((item, i) => (
              <tr key={item._id} className="border-b">
                <td className="p-2 border text-center">{i + 1}</td>

                <td className="p-2 border text-center">
                  <img
                    src={item.image?.url}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover mx-auto"
                  />
                </td>

                <td className="p-2 border text-center">{item.name}</td>
                <td className="p-2 border text-center">{item.city}</td>
                <td className="p-2 border text-center">{item.comments}</td>
                <td className="p-2 border text-center">
                  {item.date.slice(0, 10)}
                </td>
                <td className="p-2 border text-center">{item.strip}</td>

                <td className="p-2 border text-center space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => openEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Responsive Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-3">
          <div className="bg-white p-5 rounded-lg w-full max-w-[400px] shadow">
            <h2 className="text-xl mb-3 font-bold text-center">
              {editing ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="comments"
                placeholder="Comments"
                value={form.comments}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="strip"
                placeholder="Strip"
                value={form.strip}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full"
              />

              <button
                onClick={submitForm}
                className="bg-blue-600 text-white w-full py-2 rounded mt-3"
                disabled={loading}
              >
                {loading ? "Saving..." : editing ? "Update" : "Add"}
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 text-white w-full py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
