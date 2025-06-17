const Request = require("../models/Request");

// ✅ CREATE
const createRequest = async (req, res) => {
  try {
    const { name, email, item, quantity, reason } = req.body;
    const document = req.file ? req.file.filename : null;

    const newRequest = new Request({
      name,
      email,
      item,
      quantity,
      reason,
      document,
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request created successfully",
      request: newRequest,
    });
  } catch (err) {
    console.error("❌ Failed to create request:", err);
    res.status(500).json({ error: "Failed to create request" });
  }
};

// ✅ READ
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    console.error("❌ Failed to fetch requests:", err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// ✅ DELETE
const deleteRequest = async (req, res) => {
  try {
    const deleted = await Request.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("❌ Failed to delete request:", err);
    res.status(500).json({ error: "Failed to delete request" });
  }
};

// ✅ UPDATE — NEW
const updateRequest = async (req, res) => {
  try {
    const { name, email, item, quantity, reason } = req.body;

    const updateData = {
      name,
      email,
      item,
      quantity,
      reason,
    };

    if (req.file) {
      updateData.document = req.file.filename;
    }

    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }  // returns the updated doc
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json({
      message: "Request updated successfully",
      request: updated,
    });

  } catch (err) {
    console.error("❌ Failed to update request:", err);
    res.status(500).json({ error: "Failed to update request" });
  }
};

// ✅ Export all controllers
module.exports = {
  createRequest,
  getAllRequests,
  deleteRequest,
  updateRequest, // <-- ✅ added
};
