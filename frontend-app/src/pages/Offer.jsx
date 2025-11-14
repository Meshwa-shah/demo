import { useEffect, useState } from "react";
import axios from "axios";

export default function Offer() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    strip: "",
    status: true,
    title: "",
    category: "",
    head: "",
    body: "",
    startdate: "",
    enddate: "",
    imgtitle: "",
    metatitle: "",
    description: "",
    image: null,
  });

  const loadOffers = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:8081/offer/fetch");
    setOffers(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const checkExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else if (e.target.name === "status") {
      setForm({ ...form, status: e.target.value === "true" });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setForm({
      strip: "",
      status: true,
      title: "",
      category: "",
      head: "",
      body: "",
      startdate: "",
      enddate: "",
      imgtitle: "",
      metatitle: "",
      description: "",
      image: null,
    });
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.category ||
      !form.startdate ||
      !form.enddate ||
      !form.description ||
      !form.imgtitle ||
      !form.metatitle ||
      !form.strip ||
      !form.head ||
      !form.body
    ) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    const fd = new FormData();
    for (const key in form) fd.append(key, form[key]);

    if (editId) {
      await axios.put(`http://localhost:8081/offer/edit/${editId}`, fd);
    } else {
      await axios.post("http://localhost:8081/offer/add", fd);
    }

    setOpenModal(false);
    await loadOffers();
    setLoading(false);
  };

  const deleteOffer = async (id) => {
    setLoading(true);
    await axios.delete("http://localhost:8081/offer/delete", {
      data: { id },
    });
    loadOffers();
    setLoading(false);
  };

  const openEditModal = (offer) => {
    setEditId(offer._id);

    setForm({
      strip: offer.strip,
      status: offer.status,
      title: offer.title,
      category: offer.category,
      head: offer.head,
      body: offer.body,
      startdate: offer.startdate,
      enddate: offer.enddate,
      imgtitle: offer.imgtitle,
      metatitle: offer.metatitle,
      description: offer.description,
      image: null,
    });

    setOpenModal(true);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-2">
        <h2 className="text-xl font-bold text-center sm:text-left">Offers</h2>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Add New
        </button>
      </div>

      {/* ✅ Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px] sm:min-w-0 mt-3">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border text-center">S. No</th>
              <th className="p-3 border text-center">Title</th>
              <th className="p-3 border text-center">Category</th>
              <th className="p-3 border text-center">Start Date</th>
              <th className="p-3 border text-center">End Date</th>
              <th className="p-3 border text-center">Image</th>
              <th className="p-3 border text-center">Description</th>
              <th className="p-3 border text-center">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((offer, index) => {
              const expired = checkExpired(offer.enddate);

              return (
                <tr key={offer._id} className="hover:bg-gray-100">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">{offer.title}</td>
                  <td className="p-3 border text-center">{offer.category}</td>
                  <td className="p-3 border text-center">
                    {offer.startdate.slice(0, 10)}
                  </td>
                  <td className="p-3 border text-center">
                    {offer.enddate.slice(0, 10)}
                  </td>

                  <td className="p-3 border text-center">
                    <img
                      src={offer.image?.url}
                      alt={offer.title}
                      className="w-12 h-12 rounded object-cover mx-auto"
                    />
                  </td>

                  <td className="p-3 border text-center">
                    {offer.description}
                  </td>

                  <td className="p-3 border text-center">
                    {offer.status ? (
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="p-3 border text-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => openEditModal(offer)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded w-full sm:w-auto"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteOffer(offer._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Responsive Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white p-5 rounded-xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-bold mb-3 text-center">
              {loading ? "wait..." : editId ? "Edit Offer" : "Add Offer"}
            </h2>

            <div className="grid gap-3">
              <input type="text" name="strip" placeholder="Strip"
                className="border p-2 rounded" value={form.strip} onChange={handleChange} />

              <select name="status" className="border p-2 rounded"
                value={form.status} onChange={handleChange}>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>

              <input type="text" name="title" placeholder="Title"
                className="border p-2 rounded" value={form.title} onChange={handleChange} />

              <input type="text" name="category" placeholder="Category"
                className="border p-2 rounded" value={form.category} onChange={handleChange} />

              <input type="text" name="head" placeholder="Head"
                className="border p-2 rounded" value={form.head} onChange={handleChange} />

              <textarea name="body" placeholder="Body"
                className="border p-2 rounded" value={form.body} onChange={handleChange} />

              <input type="date" name="startdate"
                className="border p-2 rounded" value={form.startdate} onChange={handleChange} />

              <input type="date" name="enddate"
                className="border p-2 rounded" value={form.enddate} onChange={handleChange} />

              <input type="text" name="imgtitle" placeholder="Image Alt / Title"
                className="border p-2 rounded" value={form.imgtitle} onChange={handleChange} />

              <input type="text" name="metatitle" placeholder="Meta Title"
                className="border p-2 rounded" value={form.metatitle} onChange={handleChange} />

              <textarea name="description" placeholder="Description"
                className="border p-2 rounded" value={form.description}
                onChange={handleChange} />

              <input type="file" name="image" accept="image/*"
                className="border p-2 rounded" onChange={handleChange} />

              <button onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                {editId ? "Update" : "Add"}
              </button>

              <button onClick={() => setOpenModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded w-full">
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
