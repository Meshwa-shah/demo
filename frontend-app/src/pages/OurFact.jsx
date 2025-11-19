import { useState, useEffect } from "react";
import axios from "axios";

export default function OurFact() {
  const [facts, setFacts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    count1: 0,
    count2: 0,
    count3: 0,
  });

  const [error, setError] = useState("");

  // ✅ Fetch all facts
  const getData = async () => {
    const res = await axios.get("http://localhost:8081/fact/fetch");
    setFacts(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit (Create + Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.count1 || !form.count2 || !form.count3) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (editId) {
        await axios.put(`http://localhost:8081/fact/edit/${editId}`, form);
      } else {
        await axios.post("http://localhost:8081/fact/add", form);
      }

      setForm({ title: "", count1: 0, count2: 0, count3: 0 });
      setEditId(null);
      setOpenModal(false);
      getData();
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }

    setLoading(false);
  };
  
  // ✅ Edit
  const handleEdit = (fact) => {
    setEditId(fact._id);
    setForm({
      title: fact.title,
      count1: fact.count1,
      count2: fact.count2,
      count3: fact.count3,
    });
    setOpenModal(true);
  };

  // ✅ Delete
  const handleDelete = async (id) => {

    await axios.delete(`http://localhost:8081/fact/delete/${id}`);
    getData();
  };

  return (
    <div className="w-full mx-auto">

      {/* ✅ Add Button */}
      

      {/* ✅ Popup Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-lg">
            <h2 className="text-xl font-semibold mb-3">
              {editId ? "Edit Fact" : "Add Fact"}
            </h2>

            {error && (
              <p className="bg-red-100 text-red-700 p-2 rounded mb-2 text-sm">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="count1"
                placeholder="Count 1"
                value={form.count1}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="count2"
                placeholder="Count 2"
                value={form.count2}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="count3"
                placeholder="Count 3"
                value={form.count3}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded"
              >
                {loading ? "Saving..." : editId ? "Update" : "Add"}
              </button>

              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="w-full bg-gray-400 text-white p-3 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Table */}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-3">
            <h2 className="text-xl font-bold">Our facts</h2>
        <button
          onClick={() => {
            setEditId(null);
            setForm({ title: "", count1: "", count2: "", count3: "" });
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-300">
            <th className="border p-3 text-center">Sr No.</th>
              <th className="border p-3 text-center">Title</th>
              <th className="border p-3 text-center">Count1</th>
              <th className="border p-3 text-center">Count2</th>
              <th className="border p-3 text-center">Count3</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {facts.map((fact, i) => (
              <tr key={fact._id} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="border p-3 text-center">{i + 1}</td>
                <td className="border p-3 text-center">{fact.title}</td>
                <td className="border p-3 text-center">{fact.count1}</td>
                <td className="border p-3 text-center">{fact.count2}</td>
                <td className="border p-3 text-center">{fact.count3}</td>

                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(fact)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(fact._id)}
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
    </div>
  );
}
