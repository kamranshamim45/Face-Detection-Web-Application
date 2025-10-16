import React from 'react';

const FaceBoxOverlay = ({ imageUrl, boundingBoxes = [] }) => {
  const hasFaces = boundingBoxes && boundingBoxes.length > 0;

  return (
    <div className="relative inline-block">
      <img
        src={imageUrl}
        alt="Detected faces"
        className="max-w-full h-auto rounded-lg shadow"
      />

      {/*  Only render boxes if faces are detected */}
      {hasFaces ? (
        boundingBoxes.map((box, index) => (
          <div
            key={index}
            className="absolute border-2 border-red-500 bg-transparent"
            style={{
              left: `${box.x}px`,
              top: `${box.y}px`,
              width: `${box.width}px`,
              height: `${box.height}px`,
            }}
          >
            <span className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-1 rounded">
              Face {index + 1}
            </span>
          </div>
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-gray-700 bg-opacity-70 text-white text-sm px-3 py-1 rounded">
            No face detected
          </span>
        </div>
      )}
    </div>
  );
};

export default FaceBoxOverlay;
