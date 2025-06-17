const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  item: String,
  quantity: Number,
  reason: String,
  document: String, // ✅ NEW FIELD to store file name or path
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
