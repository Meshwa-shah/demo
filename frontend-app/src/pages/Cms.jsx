import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8081/cms";

export default function Cms() {
  const [cmsList, setCmsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    strip: ""
  });

  // ✅ Fetch CMS
  const fetchCms = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/fetch`);
      if (res.data.success) setCmsList(res.data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCms();
  }, []);

  // ✅ Add / Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.title === "" || form.description === "" || form.strip === "") {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    try {
      if (editId) {
        const res = await axios.put(`${API}/edit/${editId}`, form);
        if (res.data.success) setCmsList(res.data.data);
      } else {
        const res = await axios.post(`${API}/add`, form);
        if (res.data.success) setCmsList(res.data.data);
      }

      closeModal();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // ✅ Delete CMS
  const deleteCms = async (id) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/delete`, { id });
      if (res.data.success) setCmsList(res.data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const openEditModal = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      strip: item.strip,
    });
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditId(null);
    setForm({ title: "", description: "", strip: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ title: "", description: "", strip: "" });
    setEditId(null);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">

      {/* ✅ Header Responsive */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold">CMS List</h2>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Add New
        </button>
      </div>

      {/* ✅ Table (Responsive Scroll) */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border text-center">S. No</th>
              <th className="p-3 border text-center">Title</th>
              <th className="p-3 border text-center">Description</th>
              <th className="p-3 border text-center">Strip</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cmsList.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border text-center">{item.title}</td>

                <td className="p-3 border text-center max-w-[250px] truncate">
                  {item.description}
                </td>

                <td className="p-3 border text-center">{item.strip}</td>

                <td className="p-3 border text-center">
                  <div className="flex flex-col md:flex-row gap-2 justify-center">
                    <button
                      onClick={() => openEditModal(item)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCms(item._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal Responsive */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit CMS" : "Add New CMS"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-2 border rounded h-24"
              ></textarea>

              <input
                type="text"
                placeholder="Strip"
                value={form.strip}
                onChange={(e) => setForm({ ...form, strip: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {loading ? "wait..." : editId ? "Update" : "Add"}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="w-full bg-gray-400 text-white py-2 rounded mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
