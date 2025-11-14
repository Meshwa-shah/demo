import { useState, useEffect } from "react";
import axios from "axios";

export default function City() {
  const [city, setcity] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [cityName, setCityName] = useState("");
  const [editId, setEditId] = useState(null);

  const BASE_URL = "http://localhost:8081/city";

  // ✅ Fetch all cities
  const fetchCities = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/fetch`);
      setcity([...res.data.data]);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const addCity = async () => {
    if (cityName === "") return;
    try {
      await axios.post(`${BASE_URL}/add`, { name: cityName });
      fetchCities();
      setPopupOpen(false);
    } catch (error) {
      console.error("Add Error:", error);
    }
  };

  const updateCity = async () => {
    if (cityName === "") return;
    try {
      await axios.put(`${BASE_URL}/edit/${editId}`, { name: cityName });
      fetchCities();
      setPopupOpen(false);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const deleteCity = async (i) => {
    const eid = city[i]._id;
    try {
      await axios.post(`${BASE_URL}/delete`, { id: eid });
      fetchCities();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleAdd = () => {
    setCityName("");
    setEditId(null);
    setPopupOpen(true);
  };

  const handleEdit = (i) => {
    setCityName(city[i].City);
    setEditId(city[i]._id);
    setPopupOpen(true);
  };

  return (
    <div className="bg-white p-4 md:p-5 rounded-xl shadow-md w-full">

      {/* ✅ Popup */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit City" : "Add City"}
            </h3>

            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter city name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setPopupOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded w-full sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={editId ? updateCity : addCity}
                className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Header */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <h2 className="text-xl font-bold text-center sm:text-left">City List</h2>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={handleAdd}
        >
          Add New
        </button>
      </div>

      {/* ✅ Table Wrapper for responsiveness */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border text-center">ID</th>
              <th className="p-3 border text-center">City Name</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {city.map((city, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border text-center">{city.City}</td>
                <td className="p-3 border text-center">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => deleteCity(index)}
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

    </div>
  );
}
