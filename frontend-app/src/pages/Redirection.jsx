import { useEffect, useState } from "react";
import axios from "axios";

export default function Redirection() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  // ✅ Fetch URLs
  const fetchUrls = async () => {
    try {
      const res = await axios.get("http://localhost:8081/url/fetch");
      if (res.data.success) {
        setUrls(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // ✅ Add New URL
  const handleAdd = async () => {
    if (!source || !destination) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8081/url/add", {
        source: source,
        destination: destination,
      });

      if (res.data.success) {
        setUrls(res.data.data);
        setShowModal(false);
        setSource("");
        setDestination("");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // ✅ Delete URL
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8081/url/delete", { id });

      if (res.data.success) {
        setUrls(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">URL Redirects</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {/* {loading && (
        <p className="text-center text-blue-600 font-semibold mb-3">
          Processing...
        </p>
      )} */}

      {/* ✅ Responsive Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse border border-gray-300 min-w-[650px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center">Id</th>
              <th className="border p-2 text-center">Source</th>
              <th className="border p-2 text-center">Destination</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {urls.map((item, i) => (
              <tr key={item._id}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2 text-center">{item.source}</td>
                <td className="border p-2 text-center">{item.destination}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Responsive Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

            <h3 className="text-lg font-bold mb-4">Add New Redirect URL</h3>

            <input
              type="text"
              placeholder="Source URL"
              className="w-full p-2 border rounded mb-3"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />

            <input
              type="text"
              placeholder="Destination URL"
              className="w-full p-2 border rounded mb-3"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
