import { useEffect, useState } from "react";
import axios from "axios";

export default function Inquiry() {
  const [inquiry, setInquiry] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    date: "",
  });

  // ✅ FETCH INQUIRIES
  const fetchInquiry = async () => {
    try {
      const res = await axios.get("http://localhost:8081/inquiry/fetch");
      if (res.data.success) setInquiry(res.data.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchInquiry();
  }, []);

  // ✅ ADD INQUIRY
  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:8081/inquiry/add", form);

      if (res.data.success) {
        setOpenAdd(false);
        fetchInquiry();
      }
    } catch (err) {
      console.log("Add error:", err);
    }
  };

  // ✅ DELETE INQUIRY
  const handleDelete = async () => {
    try {
      const res = await axios.post("http://localhost:8081/inquiry/delete", {
        id: deleteId,
      });

      if (res.data.success) {
        setOpenDelete(false);
        fetchInquiry();
      }
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Inquiry List</h2>
      </div>

      {/* ✅ Responsive Table Wrapper */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border text-center">S. No</th>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 border text-center">Email</th>
              <th className="p-3 border text-center">Mobile No.</th>
              <th className="p-3 border text-center">Appointment Date</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inquiry.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border text-center break-words">{item.name}</td>
                <td className="p-3 border text-center break-words">{item.email}</td>
                <td className="p-3 border text-center">{item.mobile}</td>
                <td className="p-3 border text-center">
                  {item.appdate.slice(0, 10)}
                </td>

                <td className="p-3 border text-center">
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded md:w-auto w-full"
                    onClick={() => {
                      setDeleteId(item._id);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ ADD POPUP */}
      {openAdd && (
        <Popup
          title="Add Inquiry"
          form={form}
          setForm={setForm}
          onSubmit={handleAdd}
          onClose={() => setOpenAdd(false)}
        />
      )}

      {/* ✅ DELETE POPUP */}
      {openDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-center">Delete this inquiry?</h2>

            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setOpenDelete(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleDelete}
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

/* ---------------------------------------------------
 ✅ POPUP COMPONENT (RESPONSIVE)
--------------------------------------------------- */
function Popup({ title, form, setForm, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 overflow-auto">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl">

        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>

        <div className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Mobile Number"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
          />

          <input
            type="date"
            className="w-full p-2 border rounded"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}>
            Cancel
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onSubmit}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
