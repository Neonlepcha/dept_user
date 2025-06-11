// // app.js
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const requestRoutes = require("./routes/requestRoutes");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/requests", requestRoutes);

// module.exports = app;
////////////
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const requestRoutes = require("./routes/requestRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/requests", requestRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

module.exports = app;
