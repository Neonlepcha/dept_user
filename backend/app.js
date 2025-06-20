const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const requestRoutes = require("./routes/requestRoutes");

dotenv.config();

const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Serve uploaded files statically (important for uploaded documents)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Main API routes
app.use("/api/requests", requestRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // recommended for Mongoose 8+
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = app;
