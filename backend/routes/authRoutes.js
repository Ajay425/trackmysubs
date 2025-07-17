const express = require("express");
const { protect } = require("../middlewares/authMiddlewares");
const { upload } = require("../config/s3");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageKey = req.file.key; 
  res.status(200).json({ key: imageKey }); 
});

module.exports = router;
