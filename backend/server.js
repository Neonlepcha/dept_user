// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const app = require("./app");

// dotenv.config();

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("✅ Connected to MongoDB");
//   app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// })
// .catch((err) => {
//   console.error("❌ MongoDB connection error:", err);
// });
/////////////
const app = require("./app");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
