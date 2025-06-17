const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createRequest,
  getAllRequests,
  deleteRequest,
  updateRequest, // ✅ added
} = require("../controllers/requestController");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save to /uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ CREATE request with file upload
router.post("/", upload.single("document"), createRequest);

// ✅ GET all requests
router.get("/", getAllRequests);

// ✅ DELETE a request by ID
router.delete("/:id", deleteRequest);

// ✅ UPDATE a request by ID with optional file upload
router.patch("/:id", upload.single("document"), updateRequest);

module.exports = router;
