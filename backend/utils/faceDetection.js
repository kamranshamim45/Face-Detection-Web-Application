// utils/faceDetection.js
const { createCanvas, loadImage } = require("canvas");

const detectFaces = async (imageBuffer) => {
  try {
    const image = await loadImage(imageBuffer);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    // Simulated brightness analysis (mock for no-face condition)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let totalBrightness = 0;
    for (let i = 0; i < data.length; i += 4) {
      totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    const avgBrightness = totalBrightness / (data.length / 4);

    // If the image is very dark or too bright, assume "no face"
    if (avgBrightness < 40 || avgBrightness > 230) {
      console.log("⚠️ No face detected (image too dark/bright)");
      return { facesDetected: 0, boundingBoxes: [] };
    }

    //  Mock a smaller face detection box (for one person)
    const faceWidth = Math.floor(canvas.width * 0.15);
    const faceHeight = Math.floor(faceWidth * 1.2);
    const x = Math.floor(canvas.width / 2 - faceWidth / 2);
    const y = Math.floor(canvas.height / 3 - faceHeight / 2);

    return {
      facesDetected: 1,
      boundingBoxes: [{ x, y, width: faceWidth, height: faceHeight }],
    };
  } catch (error) {
    console.error("Face detection error:", error);
    return { facesDetected: 0, boundingBoxes: [] };
  }
};

module.exports = { detectFaces };
