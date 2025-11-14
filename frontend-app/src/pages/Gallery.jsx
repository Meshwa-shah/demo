import { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [strip, setStrip] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imagetitle, setImageTitle] = useState("");
  const [imagealt, setImageAlt] = useState("");
  const [metatitle, setMetaTitle] = useState("");
  const [metakeyword, setMetaKeyword] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:8081/image/fetch");
      setGallery(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setStrip("");
    setTitle("");
    setCategory("");
    setImageTitle("");
    setImageAlt("");
    setMetaTitle("");
    setMetaKeyword("");
    setMetaDescription("");
    setImage(null);
  };

  const openAddForm = () => {
    resetForm();
    setEditId(null);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditId(item._id);
    setStrip(item.strip);
    setTitle(item.title);
    setCategory(item.category);
    setImageTitle(item.imagetitle);
    setImageAlt(item.imagealt);
    setMetaTitle(item.metatitle);
    setMetaKeyword(item.metakeyword);
    setMetaDescription(item.metadescription);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !strip.trim() ||
      !imagealt.trim() ||
      !metatitle.trim() ||
      !metakeyword.trim() ||
      !metadescription.trim() ||
      !category.trim() ||
      !imagetitle.trim() ||
      (!editId && !image)
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("strip", strip);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("imagetitle", imagetitle);
    formData.append("imagealt", imagealt);
    formData.append("metatitle", metatitle);
    formData.append("metakeyword", metakeyword);
    formData.append("metadescription", metadescription);

    if (image) formData.append("image", image);

    try {
      setloading(true);
      if (editId) {
        await axios.put(
          `http://localhost:8081/image/edit/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:8081/image/add",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setShowForm(false);
      fetchGallery();
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      setloading(true);
      await axios.post(`http://localhost:8081/image/delete`, { id });
      fetchGallery();
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl font-bold">Image Gallery</h2>

        <button
          onClick={openAddForm}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Add New
        </button>
      </div>

      {/* RESPONSIVE TABLE WRAPPER */}
      <div className="overflow-x-auto ">
        <table className="w-full border min-w-[850px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border text-center">Id</th>
              <th className="p-2 border text-center">Image</th>
              <th className="p-2 border text-center">Title</th>
              <th className="p-2 border text-center">Category</th>
              <th className="p-2 border text-center">Image Title</th>
              <th className="p-2 border text-center">Image Alt</th>
              <th className="p-2 border text-center">Strip</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {gallery?.map((item, i) => (
              <tr key={item._id} className="border-b">
                <td className="p-2 border text-center">{i + 1}</td>

                <td className="p-2 border text-center">
                  <img
                    src={item.image?.url}
                    alt={item.imagealt}
                    className="w-12 h-12 rounded object-cover mx-auto"
                  />
                </td>

                <td className="p-2 border text-center">{item.title}</td>
                <td className="p-2 border text-center">{item.category}</td>
                <td className="p-2 border text-center">{item.imagetitle}</td>
                <td className="p-2 border text-center">{item.imagealt}</td>
                <td className="p-2 border text-center">{item.strip}</td>

                <td className="p-2 border text-center">
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => openEditForm(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => deleteItem(item._id)}
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

      {/* POPUP FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white p-5 rounded-lg w-full max-w-md">

            <h3 className="text-lg font-bold mb-3">
              {editId ? "Edit Image" : "Add Image"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-2">

              <input type="text" placeholder="Strip" className="border w-full p-2"
                value={strip} onChange={(e) => setStrip(e.target.value)} />

              <input type="text" placeholder="Title" className="border w-full p-2"
                value={title} onChange={(e) => setTitle(e.target.value)} />

              <input type="text" placeholder="Category" className="border w-full p-2"
                value={category} onChange={(e) => setCategory(e.target.value)} />

              <input type="text" placeholder="Image Title" className="border w-full p-2"
                value={imagetitle} onChange={(e) => setImageTitle(e.target.value)} />

              <input type="text" placeholder="Image Alt" className="border w-full p-2"
                value={imagealt} onChange={(e) => setImageAlt(e.target.value)} />

              <input type="text" placeholder="Meta Title" className="border w-full p-2"
                value={metatitle} onChange={(e) => setMetaTitle(e.target.value)} />

              <input type="text" placeholder="Meta Keyword" className="border w-full p-2"
                value={metakeyword} onChange={(e) => setMetaKeyword(e.target.value)} />

              <textarea placeholder="Meta Description" className="border w-full p-2"
                value={metadescription} onChange={(e) => setMetaDescription(e.target.value)} />

              <input type="file" className="border w-full p-2"
                onChange={(e) => setImage(e.target.files[0])} />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  {loading ? "wait..." : editId ? "Update" : "Add"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
