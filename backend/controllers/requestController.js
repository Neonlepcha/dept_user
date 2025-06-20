const Request = require("../models/Request");
const nodemailer = require("nodemailer"); // ✅ added

// ✅ CREATE
const createRequest = async (req, res) => {
  try {
    const { name, email, item, quantity, reason } = req.body;
    const document = req.file ? req.file.filename : null;

    // 1️⃣ Save the request
    const newRequest = new Request({
      name,
      email,
      item,
      quantity,
      reason,
      document,
    });

    await newRequest.save();

    // 2️⃣ Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // send to user's email from form
      subject: "Request Confirmation",
      text: `Dear ${name},

Your request for "${item}" (Quantity: ${quantity}) has been received and has been sent to Higher Authority.

Thank you for using our service!

Best regards,
IT Concurrence & Approval Team`,
    };

    await transporter.sendMail(mailOptions);

    // 3️⃣ Respond to frontend
    res.status(201).json({
      message: "Request created successfully and confirmation email sent.",
      request: newRequest,
    });
  } catch (err) {
    console.error("❌ Failed to create request or send email:", err);
    res.status(500).json({ error: "Failed to create request or send email" });
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

// ✅ UPDATE
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

    const updated = await Request.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

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
  updateRequest,
};
