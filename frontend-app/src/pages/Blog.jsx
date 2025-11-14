import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setloading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    name: "",
    tags: "",
    strip: "",
    imagealt: "",
    metatitle: "",
    metakeyword: "",
    metadescription: "",
    image: null,
  });

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8081/blog/fetch");
      if (res.data.success) setBlogs(res.data.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      name: "",
      tags: "",
      strip: "",
      imagealt: "",
      metatitle: "",
      metakeyword: "",
      metadescription: "",
      image: null,
    });

  // ADD
  const handleAddBlog = async () => {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.name.trim() ||
      !form.tags.trim() ||
      !form.strip.trim() ||
      !form.imagealt.trim() ||
      !form.metatitle.trim() ||
      !form.metakeyword.trim() ||
      !form.metadescription.trim() ||
      !form.image
    ) {
      return;
    }
    setloading(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== "image") fd.append(key, form[key] ?? "");
      });
      if (form.image) fd.append("image", form.image);

      const res = await axios.post("http://localhost:8081/blog/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setOpenAdd(false);
        fetchBlogs();
      }
    } catch (err) {
      console.error("Add error:", err);
    } finally {
      setloading(false);
    }
  };

  // EDIT
  const handleEditBlog = async () => {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.name.trim() ||
      !form.tags.trim() ||
      !form.strip.trim() ||
      !form.imagealt.trim() ||
      !form.metatitle.trim() ||
      !form.metakeyword.trim() ||
      !form.metadescription.trim() ||
      !form.image
    ) {
      return;
    }

    setloading(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== "image") fd.append(key, form[key] ?? "");
      });
      if (form.image) fd.append("image", form.image);

      const res = await axios.put(
        `http://localhost:8081/blog/edit/${editId}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        setOpenEdit(false);
        fetchBlogs();
      }
    } catch (err) {
      console.error("Edit error:", err);
    } finally {
      setloading(false);
    }
  };

  // DELETE
  const handleDeleteBlog = async () => {
    setloading(true);
    try {
      const res = await axios.post("http://localhost:8081/blog/delete", {
        id: deleteId,
      });
      if (res.data.success) {
        setOpenDelete(false);
        fetchBlogs();
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full overflow-x-auto no-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold">Blog List</h2>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => {
            resetForm();
            setOpenAdd(true);
          }}
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[900px] w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-sm">
              <th className="p-3 border text-center">#</th>
              <th className="p-3 border text-center">Title</th>
              <th className="p-3 border text-center">Description</th>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 border text-center">Tags</th>
              <th className="p-3 border text-center">Image</th>
              <th className="p-3 border text-center">Strip</th>
              <th className="p-3 border text-center">Comments</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((b, index) => (
              <tr
                key={b._id}
                className="hover:bg-gray-100 text-sm transition"
              >
                <td className="p-3 border text-center">{index + 1}</td>

                <td className="p-3 border text-center font-semibold">
                  <div className="max-w-[150px] truncate mx-auto">{b.title}</div>
                </td>

                <td className="p-3 border text-center">
                  <div className="max-w-[200px] text-gray-600 truncate mx-auto">
                    {b.description}
                  </div>
                </td>

                <td className="p-3 border text-center">{b.name}</td>
                <td className="p-3 border text-center"># {b.tags}</td>

                <td className="p-3 border text-center">
                  <img
                    src={b.image?.url}
                    className="w-12 h-12 rounded object-cover mx-auto"
                    alt=""
                  />
                </td>

                <td className="p-3 border text-center">{b.strip}</td>

                <td className="p-3 border text-center font-bold">
                  {b.comments?.length || 0}
                </td>

                <td className="p-3 border text-center  space-x-1 space-y-1">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => {
                      setEditId(b._id);
                      setForm({
                        title: b.title ?? "",
                        description: b.description ?? "",
                        name: b.name ?? "",
                        tags: b.tags ?? "",
                        strip: b.strip ?? "",
                        imagealt: b.imagealt ?? "",
                        metatitle: b.metatitle ?? "",
                        metakeyword: b.metakeyword ?? "",
                        metadescription: b.metadescription ?? "",
                        image: null,
                      });
                      setOpenEdit(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => {
                      setDeleteId(b._id);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </button>

                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                    onClick={() => nav(`/comments/${b._id}`)}
                  >
                    Comments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD POPUP */}
      {openAdd && (
        <Popup
          title="Add Blog"
          form={form}
          setForm={setForm}
          onSubmit={handleAddBlog}
          onClose={() => setOpenAdd(false)}
          loading={loading}
        />
      )}

      {/* EDIT POPUP */}
      {openEdit && (
        <Popup
          title="Edit Blog"
          form={form}
          setForm={setForm}
          onSubmit={handleEditBlog}
          onClose={() => setOpenEdit(false)}
          loading={loading}
        />
      )}

      {/* DELETE CONFIRM */}
      {openDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-4">Delete Blog?</h2>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setOpenDelete(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleDeleteBlog}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ✅ Responsive Popup UI */
function Popup({ title, form, setForm, onSubmit, onClose, loading }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-3 overflow-auto">
      <div className="bg-white w-full max-w-lg rounded-xl p-4 shadow-xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="grid grid-cols-1 gap-3">
          <input
            className="w-full p-1.5 border rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="w-full p-2 border rounded h-12 resize-none"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="w-full p-1.5 border rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-1.5 border rounded"
            placeholder="Tags"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />

          <input
            type="file"
            className="w-full p-1.5 border rounded"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />

          <input
            className="w-full p-1.5 border rounded"
            placeholder="Strip"
            value={form.strip}
            onChange={(e) => setForm({ ...form, strip: e.target.value })}
          />

          <input
            className="w-full p-1.5 border rounded"
            placeholder="Image Alt"
            value={form.imagealt}
            onChange={(e) =>
              setForm({ ...form, imagealt: e.target.value })
            }
          />

          <input
            className="w-full p-1.5 border rounded"
            placeholder="Meta Title"
            value={form.metatitle}
            onChange={(e) =>
              setForm({ ...form, metatitle: e.target.value })
            }
          />

          <textarea
            className="w-full p-2 border rounded h-12 resize-none"
            placeholder="Meta Description"
            value={form.metadescription}
            onChange={(e) =>
              setForm({ ...form, metadescription: e.target.value })
            }
          />

          <input
            className="w-full p-1.5 border rounded"
            placeholder="Meta Keywords"
            value={form.metakeyword}
            onChange={(e) =>
              setForm({ ...form, metakeyword: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={onSubmit}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
