import { useState, useEffect } from "react";
import axios from "axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    service: "",
    display: true,
    strip: "",
    image: null,
  });

  const fetchServices = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:8081/service/fetch");
    setServices(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    if (!form.service || !form.strip) return false;
    if (!editingId && !form.image) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const fd = new FormData();
    fd.append("service", form.service);
    fd.append("display", form.display);
    fd.append("strip", form.strip);
    if (form.image) fd.append("image", form.image);

    if (editingId) {
      await axios.put(`http://localhost:8081/service/edit/${editingId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post("http://localhost:8081/service/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setShowModal(false);
    setForm({ service: "", display: true, strip: "", image: null });
    setEditingId(null);
    fetchServices();
    setLoading(false);
  };

  const deleteService = async (id) => {
    setLoading(true);
    await axios.post("http://localhost:8081/service/delete", { id });
    fetchServices();
    setLoading(false);
  };

  const openEdit = (srv) => {
    setEditingId(srv._id);
    setForm({
      service: srv.service,
      display: srv.display,
      strip: srv.strip,
      image: null,
    });
    setShowModal(true);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Services</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {/* ✅ RESPONSIVE TABLE */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border text-center">S. No</th>
              <th className="p-3 border text-center">Service</th>
              <th className="p-3 border text-center">Image</th>
              <th className="p-3 border text-center">Display</th>
              <th className="p-3 border text-center">Strip</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((srv, index) => (
              <tr key={srv._id} className="hover:bg-gray-100">
                <td className="p-3 border text-center">{index + 1}</td>

                <td className="p-3 border text-center break-words">
                  {srv.service}
                </td>

                <td className="p-3 border text-center">
                  <img
                    src={srv.image?.url}
                    alt={srv.service}
                    className="w-12 h-12 object-cover rounded mx-auto"
                  />
                </td>

                <td className="p-3 border text-center">
                  {srv.display ? (
                    <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                      No
                    </span>
                  )}
                </td>

                <td className="p-3 border text-center break-words">
                  {srv.strip}
                </td>

                <td className="p-3 border  text-center space-y-2 md:space-y-0 md:space-x-2">
                  <button
                    onClick={() => openEdit(srv)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded w-full md:w-auto"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteService(srv._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded w-full md:w-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ RESPONSIVE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">

            <h2 className="text-lg font-bold mb-3">
              {editingId ? "Edit Service" : "Add Service"}
            </h2>

            <input
              type="text"
              name="service"
              placeholder="Service Name"
              value={form.service}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              name="strip"
              placeholder="Strip"
              value={form.strip}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                name="display"
                checked={form.display}
                onChange={handleChange}
              />
              Display
            </label>

            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
              className="w-full mb-3"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                {loading ? "Saving..." : editingId ? "Update" : "Add"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
