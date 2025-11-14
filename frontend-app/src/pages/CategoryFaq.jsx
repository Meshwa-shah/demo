import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryFaq() {
  const BASE_URL = "http://localhost:8081/faq";

  const [faq, setFaq] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    sequence: 0,
    category: "",
    strip: "",
  });

  // ✅ Fetch all faq
  const fetchFaq = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/fetch`);
      setFaq(res.data.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Add new
  const openAddPopup = () => {
    setEditId(null);
    setFormData({
      question: "",
      answer: "",
      sequence: 0,
      category: "",
      strip: "",
    });
    setShowPopup(true);
  };

  // ✅ Edit existing
  const openEditPopup = (item) => {
    setEditId(item._id);
    setFormData({
      question: item.question,
      answer: item.answer,
      sequence: item.sequence,
      category: item.category,
      strip: item.strip,
    });
    setShowPopup(true);
  };

  // ✅ Save FAQ
  const handleSubmit = async () => {
    try {
      if (
        !formData.question.trim() ||
        !formData.answer.trim() ||
        !formData.category.trim() ||
        !formData.strip.trim()
      ) {
        return;
      }

      const sendData = {
        question: formData.question,
        answer: formData.answer,
        category: formData.category,
        sequence: Number(formData.sequence),
        strip: formData.strip,
      };

      setloading(true);

      if (editId) {
        const res = await axios.put(`${BASE_URL}/edit/${editId}`, sendData);
        if (res.data.success) {
          fetchFaq();
          setShowPopup(false);
        }
      } else {
        const res = await axios.post(`${BASE_URL}/add`, sendData);
        if (res.data.success) {
          fetchFaq();
          setShowPopup(false);
        }
      }
    } catch (err) {
      console.log("Save Error:", err);
    } finally {
      setloading(false);
    }
  };

  // ✅ Delete FAQ
  const deleteFaq = async (id) => {
    setloading(true);
    try {
      const res = await axios.delete(`${BASE_URL}/delete`, { data: { id } });
      if (res.data.success) {
        fetchFaq();
      }
    } catch (err) {
      console.log("Delete Error:", err);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">

      {/* ✅ Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold">FAQ List</h2>

        <button
          onClick={openAddPopup}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Add New
        </button>
      </div>

      {/* ✅ Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border text-center">S. No</th>
              <th className="p-3 border text-center">Question</th>
              <th className="p-3 border text-center">Answer</th>
              <th className="p-3 border text-center">Sequence</th>
              <th className="p-3 border text-center">Category</th>
              <th className="p-3 border text-center">Strip</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {faq.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border max-w-[220px] text-center">{item.question}</td>
                <td className="p-3 border max-w-[220px] text-center">{item.answer}</td>
                <td className="p-3 border text-center">{item.sequence}</td>
                <td className="p-3 border text-center">{item.category}</td>
                <td className="p-3 border text-center">{item.strip}</td>

                <td className="p-3 border text-center space-y-2">
                  <button
                    onClick={() => openEditPopup(item)}
                    className="px-3 py-1 w-full bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteFaq(item._id)}
                    className="px-3 py-1 w-full bg-red-600 text-white rounded"
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
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit FAQ" : "Add FAQ"}
            </h2>

            <input
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Question"
              className="border p-2 w-full mb-3 rounded"
            />

            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Answer"
              className="border p-2 w-full mb-3 rounded h-24"
            ></textarea>

            <input
              name="sequence"
              type="number"
              value={formData.sequence}
              onChange={handleChange}
              placeholder="Sequence"
              className="border p-2 w-full mb-3 rounded"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border p-2 w-full mb-3 rounded"
            />

            <input
              name="strip"
              value={formData.strip}
              onChange={handleChange}
              placeholder="Strip"
              className="border p-2 w-full mb-3 rounded"
            />

            {/* ✅ Buttons */}
            <div className="flex flex-col md:flex-row justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded w-full md:w-auto"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded w-full md:w-auto"
              >
                {loading ? "Wait..." : editId ? "Update" : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
