const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createRequest, getAllRequests, deleteRequest } = require("../controllers/requestController");

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save in uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// POST with file upload
router.post("/", upload.single("document"), createRequest);

router.get("/", getAllRequests);
router.delete("/:id", deleteRequest);

module.exports = router;
