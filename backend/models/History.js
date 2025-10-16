const mongoose = require('mongoose');

const historySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    facesDetected: {
      type: Number,
      required: true,
    },
    boundingBoxes: [
      {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('History', historySchema);
