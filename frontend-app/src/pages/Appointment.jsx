import { useEffect, useState } from "react";
import axios from "axios";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: 0,
    clinic: "",
    url: "",
  });

  // ✅ Fetch appointments
  const loadAppointments = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get("http://localhost:8081/appointment/fetch");

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add appointment
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8081/appointment/add", form);

      if (res.data.success) {
        setAppointments(res.data.data);
        setShowModal(false);
        setForm({ name: "", email: "", number: 0, clinic: "", url: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">

      {/* ✅ Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Appointment List</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {/* ✅ Responsive Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border text-center">S. No</th>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 border text-center">Email</th>
              <th className="p-3 border text-center">Mobile</th>
              <th className="p-3 border text-center">Clinic</th>
              <th className="p-3 border text-center">URL</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((ap, index) => (
              <tr key={ap._id} className="hover:bg-gray-100">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border text-center">{ap.name}</td>
                <td className="p-3 border text-center">{ap.email}</td>
                <td className="p-3 border text-center">{ap.mobile}</td>
                <td className="p-3 border text-center">{ap.clinic}</td>
                <td className="p-3 border truncate text-center">{ap.url}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ✅ Responsive Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow">

            <h2 className="text-lg font-bold mb-4">Add Appointment</h2>

            <form onSubmit={handleAdd} className="space-y-3">

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="number"
                placeholder="Mobile Number"
                value={form.number}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="clinic"
                placeholder="Clinic"
                value={form.clinic}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="url"
                placeholder="URL"
                value={form.url}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
