import { useEffect, useState } from "react";
import axios from "axios";

export default function Media() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setloading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    strip: "",
    image: null,
  });

  const fetchMedia = async () => {
    try {
      const res = await axios.get("http://localhost:8081/media/fetch");
      setItems(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    for (let key in form) {
      if (key !== "image" && form[key].trim() === "") return false;
    }
    if (!form.image && !editId) {
      alert("Image is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setloading(true);

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("strip", form.strip);
    if (form.image) fd.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:8081/media/edit/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:8081/media/add", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowForm(false);
      setEditId(null);
      resetForm();
      fetchMedia();
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setloading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      strip: "",
      image: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost:8081/media/delete`, { id });
      fetchMedia();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      strip: item.strip,
      image: null,
    });
    setShowForm(true);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">

      {/* ✅ Header */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold">Media List</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Add New
        </button>
      </div>

      {/* ✅ Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border text-center">S. No</th>
              <th className="p-3 border text-center">Title</th>
              <th className="p-3 border text-center">Image</th>
              <th className="p-3 border text-center">Strip</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 &&
              items.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">{item.title}</td>

                  <td className="p-3 border text-center">
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="w-12 h-12 rounded object-cover mx-auto"
                    />
                  </td>

                  <td className="p-3 border text-center">{item.strip}</td>

                  <td className="p-3 border text-center space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row justify-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Media" : "Add Media"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {["title", "strip"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              ))}

              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <button className="bg-blue-600 text-white w-full py-2 rounded">
                {loading ? "wait..." : editId ? "Update" : "Add"}
              </button>
            </form>

            <button
              onClick={() => setShowForm(false)}
              className="mt-3 text-center w-full text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
