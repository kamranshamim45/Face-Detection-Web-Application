// routes/faceRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { detectFace, getHistory, deleteHistory } = require('../controllers/faceController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post('/', protect, upload.single('image'), detectFace);
router.get('/history', protect, getHistory);
router.delete('/history/:id', protect, deleteHistory);

module.exports = router;
