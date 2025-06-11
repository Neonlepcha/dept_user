import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const StatusPage = () => {
  const [requests, setRequests] = useState([]);

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
      fetchRequests(); // Refresh the list
    } catch (err) {
      console.error("Failed to cancel request", err);
      alert("Failed to cancel request.");
    }
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
            <p>Requested by: <strong>{r.name}</strong> ({r.email})</p>
            <p>Quantity: {r.quantity}</p>
            <p>Reason: {r.reason}</p>
            <p>Status: <strong>{r.status}</strong></p>
            <button
              onClick={() => handleCancel(r._id)}
              className="mt-3 px-4 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            >
              Cancel Request
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default StatusPage;
