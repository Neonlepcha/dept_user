// backend/controllers/requestController.js

const Request = require("../models/Request");

const createRequest = async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to create request" });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// ✅ Add this
const deleteRequest = async (req, res) => {
  try {
    const deleted = await Request.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete request" });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  deleteRequest, // 👈 Export this
};
