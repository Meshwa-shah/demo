import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8081/clinic";

export default function Clinic() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false); // global actions
  const [fetching, setFetching] = useState(true);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // form
  const [form, setForm] = useState({
    drname: "",
    drprofile: "",
    clinicname: "",
    mobile: "",
    email: "",
    address: "",
    area: "",
    maplink: "",
    strip: "",
    image: null,
  });
console.log(form);
  // preview for selected image
  const [preview, setPreview] = useState(null);

  // fetch
  const fetchClinics = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/fetch`);
      if (res.data?.success) setClinics(res.data.data || []);
      else setClinics([]);
    } catch (err) {
      console.error("Fetch clinics:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  // handle form inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm((p) => ({ ...p, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  // open add modal
  const openAdd = () => {
    setEditingId(null);
    setForm({
      drname: "",
      drprofile: "",
      clinicname: "",
      mobile: "",
      email: "",
      address: "",
      area: "",
      maplink: "",
      strip: "",
      image: null,
    });
    setPreview(null);
    setModalOpen(true);
  };

  // open edit modal with data
  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({
      drname: item.drname || "",
      drprofile: item.drprofile || "",
      clinicname: item.clinicname || "",
      mobile: item.mobile ? String(item.mobile) : "",
      email: item.email || "",
      address: item.address || "",
      area: item.area || "",
      maplink: item.maplink || "",
      strip: item.strip || "",
      image: null, // new file optional
    });
    setPreview(item.image?.url || null);
    setModalOpen(true);
  };

  // validation
  const validate = () => {
    const required = [
      "drname",
      "clinicname",
      "mobile",
      "email",
      "address",
      "area",
      "strip",
    ];
    for (const key of required) {
      if (!String(form[key] || "").trim()) return false;
    }
    // simple mobile/email checks could be added
    return true;
  };

  // submit add/edit
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!validate()) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("drname", form.drname);
      fd.append("drprofile", form.drprofile);
      fd.append("clinicname", form.clinicname);
      fd.append("mobile", form.mobile);
      fd.append("email", form.email);
      fd.append("address", form.address);
      fd.append("area", form.area);
      fd.append("maplink", form.maplink);
      fd.append("strip", form.strip);

      if (form.image) fd.append("image", form.image);

      if (editingId) {
        // edit
        await axios.put(`${API}/edit/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // add
        await axios.post(`${API}/add`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // refresh
      await fetchClinics();
      setModalOpen(false);
      setEditingId(null);
      setPreview(null);
    } catch (err) {
      console.error("Save clinic:", err);
     
    } finally {
      setLoading(false);
    }
  };

  // delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this clinic?")) return;
    setLoading(true);
    try {
      await axios.post(`${API}/delete`, { id });
      await fetchClinics();
    } catch (err) {
      console.error("Delete clinic:", err);
      alert("Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-xl font-bold">Clinic List</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm"
          >
            Add New
          </button>
        </div>
      </div>

      {/* loader */}
      {fetching ? (
        <p className="text-center text-blue-600">Loading clinics...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border text-center">S. No</th>
                <th className="p-3 border text-center">Doctor</th>
                <th className="p-3 border text-center">Profile</th>
                <th className="p-3 border text-center">Clinic</th>
                <th className="p-3 border text-center">Mobile</th>
                <th className="p-3 border text-center">Email</th>
                <th className="p-3 border text-center">Area</th>
                <th className="p-3 border text-center">Strip</th>
                <th className="p-3 border text-center">Image</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {clinics.length === 0 ? (
                <tr className="hidden">
                  <td
                    colSpan={10}
                    className="p-4 text-center text-gray-500 border"
                  >
                  
                  </td>
                </tr> 
              ) : (
                clinics.map((c, idx) => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="p-3 border text-center">{idx + 1}</td>
                    <td className="p-3 border text-center">{c.drname}</td>
                    <td className="p-3 border text-center max-w-xs truncate">
                      {c.drprofile}
                    </td>
                    <td className="p-3 border text-center">{c.clinicname}</td>
                    <td className="p-3 border text-center">{c.mobile}</td>
                    <td className="p-3 border text-center">{c.email}</td>
                    <td className="p-3 border text-center">{c.area}</td>
                    <td className="p-3 border text-center">{c.strip}</td>
                    <td className="p-3 border text-center">
                      <img
                        src={c.image?.url}
                        alt={c.clinicname}
                        className="w-12 h-12 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="p-3 border text-center space-x-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* modal centered */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? "Edit Clinic" : "Add Clinic"}
              </h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">Doctor Name *</label>
                  <input
                    name="drname"
                    value={form.drname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Doctor name"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">Clinic Name *</label>
                  <input
                    name="clinicname"
                    value={form.clinicname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Clinic name"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">Mobile *</label>
                  <input
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Mobile"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Doctor Profile</label>
                  <textarea
                    name="drprofile"
                    value={form.drprofile}
                    onChange={handleChange}
                    className="w-full p-2 border rounded h-24"
                    placeholder="Short profile / bio"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Address"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">Area *</label>
                  <input
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Area"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">Map Link</label>
                  <input
                    name="maplink"
                    value={form.maplink}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Google map link"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1">Strip *</label>
                  <input
                    name="strip"
                    value={form.strip}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Strip"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Image {editingId ? "(leave blank to keep existing)" : "*"}</label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="mt-3 w-28 h-28 object-cover rounded"
                    />
                  )}
                </div>

                <div className="col-span-1 md:col-span-2 flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      setEditingId(null);
                      setPreview(null);
                    }}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {loading ? "Saving..." : editingId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
