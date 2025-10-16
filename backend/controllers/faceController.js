
const History = require('../models/History');
const { detectFaces } = require('../utils/faceDetection');
const path = require('path');
const fs = require('fs');

const detectFace = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const imagePath = path.join(__dirname, '../uploads', req.file.filename);
    const imageBuffer = fs.readFileSync(imagePath);

    const result = await detectFaces(imageBuffer);

    const history = await History.create({
      user: req.user._id,
      imageUrl: `/uploads/${req.file.filename}`,
      facesDetected: result.facesDetected,
      boundingBoxes: result.boundingBoxes,
    });

    res.json({
      facesDetected: result.facesDetected,
      boundingBoxes: result.boundingBoxes,
      imageUrl: `/uploads/${req.file.filename}`,
      historyId: history._id,
      createdAt: history.createdAt.toISOString(),
      updatedAt: history.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Face detection failed", error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id }).sort({ createdAt: -1 });
    const response = history.map(item => ({
      _id: item._id,
      imageUrl: item.imageUrl,
      facesDetected: item.facesDetected,
      boundingBoxes: item.boundingBoxes,
      createdAt: item.createdAt ? item.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: item.updatedAt ? item.updatedAt.toISOString() : new Date().toISOString(),
    }));
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const historyEntry = await History.findById(req.params.id);
    if (!historyEntry) return res.status(404).json({ message: "History not found" });

    if (historyEntry.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    const imagePath = path.join(__dirname, '..', historyEntry.imageUrl);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await History.findByIdAndDelete(req.params.id);
    res.json({ message: "History entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { detectFace, getHistory, deleteHistory };
