import { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const BASE_URL = "http://localhost:8081/category";

  const [cate, setcate] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    strip: "",
    name: "",
    display: false,
    title: "",
    sequence: "",
    imagetitle: "",
    imagealt: "",
    image: null,
    icon: null,
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/fetch`);
      setcate(res.data.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const openAddPopup = () => {
    setFormData({
      strip: "",
      name: "",
      display: false,
      title: "",
      sequence: "",
      imagetitle: "",
      imagealt: "",
      image: null,
      icon: null,
    });
    setEditId(null);
    setOpenPopup(true);
  };

  const openEditPopup = (cat) => {
    setFormData({
      strip: cat.strip || "",
      name: cat.Name || "",
      display: cat.Display || false,
      title: cat.title || "",
      sequence: cat.sequence || "",
      imagetitle: cat.imagetitle || "",
      imagealt: cat.imagealt || "",
      image: null,
      icon: null,
    });
    setEditId(cat._id);
    setOpenPopup(true);
  };

  const saveCategory = async () => {
    if (
      !formData.name.trim() ||
      !formData.imagealt.trim() ||
      !formData.imagetitle.trim() ||
      !formData.strip.trim() ||
      !formData.title.trim()
    ) {
      return;
    }

    setloading(true);

    try {
      const fd = new FormData();
      fd.append("strip", formData.strip);
      fd.append("name", formData.name);
      fd.append("display", formData.display);
      fd.append("title", formData.title);
      fd.append("sequence", formData.sequence);
      fd.append("imagetitle", formData.imagetitle);
      fd.append("imagealt", formData.imagealt);

      if (formData.image) fd.append("image", formData.image);
      if (formData.icon) fd.append("icon", formData.icon);

      let res;

      if (editId) {
        res = await axios.put(`${BASE_URL}/edit/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post(`${BASE_URL}/add`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchCategories();
      setOpenPopup(false);
    } catch (err) {
      console.error("Save Error:", err);
    } finally {
      setloading(false);
    }
  };

  const deleteCategory = async (id) => {
    setloading(true);
    try {
      await axios.post(`${BASE_URL}/delete`, { id });
      fetchCategories();
    } catch (err) {
      console.error("Delete Error:", err);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h2 className="text-xl font-bold">Category list</h2>

        <button
          onClick={openAddPopup}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Add New
        </button>
      </div>

      {/* ✅ Table Wrapper - responsive scroll */}
      <div className="overflow-x-auto  ">
        <table className="w-full text-sm md:text-base border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border text-center">S. No</th>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 border text-center">Image</th>
              <th className="p-3 border text-center">Title</th>
              <th className="p-3 border text-center">Display</th>
              <th className="p-3 border text-center">Sequence</th>
              <th className="p-3 border text-center">Image Title</th>
              <th className="p-3 border text-center">Icon</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cate.map((cat, index) => (
              <tr key={cat._id} className="hover:bg-gray-100">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border text-center">{cat.Name}</td>

                <td className="p-3 border text-center">
                  <img
                    src={cat.Image?.url}
                    alt={cat.Name}
                    className="w-10 h-10 object-cover rounded mx-auto"
                  />
                </td>

                <td className="p-3 border text-center">{cat.title}</td>

                <td className="p-3 border text-center">
                  {cat.Display ? (
                    <span className="px-2 py-1 bg-green-500 text-white rounded text-xs md:text-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-500 text-white rounded text-xs md:text-sm">
                      No
                    </span>
                  )}
                </td>

                <td className="p-3 border text-center">{cat.sequence}</td>

                <td className="p-3 border text-center">{cat.imagetitle}</td>

                <td className="p-3 border text-center">
                  <img
                    src={cat.icon?.url}
                    alt="icon"
                    className="w-8 h-8 object-cover rounded-full mx-auto"
                  />
                </td>

                <td className="p-3 border text-center space-y-1">
                  <button
                    onClick={() => openEditPopup(cat)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded w-full"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded w-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Responsive Popup */}
      {openPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 p-3">
          <div className="bg-white p-5 rounded-lg w-full max-w-md shadow-lg animate-fadeIn">

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Category" : "Add Category"}
            </h2>

            <div className="flex flex-col gap-3">

              <input className="input" name="strip" value={formData.strip} onChange={handleChange} placeholder="Strip" />

              <input className="input" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />

              <label className="flex items-center gap-2">
                <input type="checkbox" name="display" checked={formData.display} onChange={handleChange} />
                Display
              </label>

              <input className="input" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />

              <input className="input" name="sequence" type="number" value={formData.sequence} onChange={handleChange} placeholder="Sequence" />

              <input className="input" name="imagetitle" value={formData.imagetitle} onChange={handleChange} placeholder="Image Title" />

              <input className="input" name="imagealt" value={formData.imagealt} onChange={handleChange} placeholder="Image Alt" />

              <label className="font-semibold mt-2">Image:</label>
              <input type="file" name="image" onChange={handleChange} className="p-2 border rounded" />

              <label className="font-semibold mt-2">Icon:</label>
              <input type="file" name="icon" onChange={handleChange} className="p-2 border rounded" />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setOpenPopup(false)} className="px-4 py-2 bg-gray-400 text-white rounded w-full">
                Cancel
              </button>

              <button
                onClick={saveCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded w-full"
              >
                {loading ? "Saving..." : editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
