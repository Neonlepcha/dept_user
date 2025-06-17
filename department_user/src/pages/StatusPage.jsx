import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const StatusPage = () => {
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: null,
  });

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this request?");
    if (!confirmCancel) return;

    try {
      await axios.delete(`/requests/${id}`);
      alert("Request canceled successfully.");
      fetchRequests();
    } catch (err) {
      console.error("Failed to cancel request", err);
      alert("Failed to cancel request.");
    }
  };

  const startEditing = (r) => {
    setEditingId(r._id);
    setFormData({
      name: r.name,
      email: r.email,
      document: null,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("email", formData.email);
      if (formData.document) {
        updateData.append("document", formData.document);
      }

      await axios.patch(`/requests/${editingId}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Request updated successfully.");
      setEditingId(null);
      setFormData({ name: "", email: "", document: null });
      fetchRequests();
    } catch (err) {
      console.error("Failed to update request", err);
      alert("Failed to update request.");
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({ name: "", email: "", document: null });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Request Status</h2>
      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        requests.map((r, idx) => (
          <div key={r._id} className="border p-4 rounded mb-3 bg-white shadow">
            <h3 className="text-lg font-bold text-indigo-700">
              #{idx + 1} - {r.item}
            </h3>
            {editingId === r._id ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <div>
                  <label className="block text-sm font-semibold">Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border p-1 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border p-1 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">New Document (optional):</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => setFormData({ ...formData, document: e.target.files[0] })}
                    className="border p-1 rounded w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="ml-2 px-4 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p>Requested by: <strong>{r.name}</strong> ({r.email})</p>
                <p>Quantity: {r.quantity}</p>
                <p>Reason: {r.reason}</p>
                <p>Status: <strong>{r.status}</strong></p>

                {r.document && (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/uploads/${r.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    View Document
                  </a>
                )}

                <button
                  onClick={() => handleCancel(r._id)}
                  className="mt-3 ml-2 px-4 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Cancel Request
                </button>

                <button
                  onClick={() => startEditing(r)}
                  className="mt-3 ml-2 px-4 py-1 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700"
                >
                  Update Request
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default StatusPage;
