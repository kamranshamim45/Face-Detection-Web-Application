import React, { useState, useRef, useContext } from 'react';
import Webcam from 'react-webcam';
import AuthContext from '../context/AuthContext';
import faceService from '../services/faceService';
import FaceBoxOverlay from '../components/FaceBoxOverlay';


const Facedetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useWebcam, setUseWebcam] = useState(false);
  const webcamRef = useRef(null);
  const { user } = useContext(AuthContext); // eslint-disable-line no-unused-vars

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setResult(null);
      setError('');
    }
  };

  const captureFromWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImagePreview(imageSrc);
    setResult(null);
    setError('');
    // Convert base64 to file
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
        setSelectedFile(file);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select an image or capture from webcam');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await faceService.detectFaces(selectedFile);
      setResult(response);
    } catch (error) {
      setError(error.response?.data?.message || 'Face detection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/face detect.webp')" }}>
      <div className="max-w-4xl w-full mx-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">Face Detection</h1>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8 mb-8">
          <div className="mb-6">
            <label className="block text-white text-lg font-semibold mb-4">
              Choose Input Method:
            </label>
            <div className="flex space-x-6">
              <button
                onClick={() => setUseWebcam(false)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${!useWebcam ? 'bg-blue-500 text-whitebackdrop-blur-sm text-white border border-white/50 shadow-lg' : 'bg-white/10 backdrop-blur-sm text-white/80 border border-white/30 hover:bg-white/30'}`}
              >
                Upload Image
              </button>
              <button
                onClick={() => setUseWebcam(true)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${useWebcam ? 'bg-white/30 backdrop-blur-sm text-white border border-white/50 shadow-lg' : 'bg-white/10 backdrop-blur-sm text-white/80 border border-white/30 hover:bg-blue-500'}`}
              >
                Use Webcam
              </button>
            </div>
          </div>

          {useWebcam ? (
            <div className="mb-6">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-white/30"
              />
              <button
                onClick={captureFromWebcam}
                className="mt-6 bg-white/20 hover:bg-blue-500 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Capture Image
              </button>
            </div>
          ) : (
            <div className="mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-white file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 file:backdrop-blur-sm file:border file:border-white/30 file:shadow-lg file:transition-all file:duration-300"
              />
            </div>
          )}

          {imagePreview && (
            <div className="mb-6">
              <img src={imagePreview} alt="Preview" className="max-w-md mx-auto rounded-2xl shadow-2xl border border-white/30" />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !selectedFile}
            className="bg-white/20 hover:bg-red-500 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Detecting...' : 'Detect Faces'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100/80 backdrop-blur-sm border border-red-400/50 text-red-700 px-6 py-4 rounded-2xl mb-8 shadow-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8">
            <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">Detection Results</h2>
            <p className="mb-6 text-white/90 text-lg">Faces detected: {result.facesDetected}</p>
            {result.imageUrl && (
              <FaceBoxOverlay
                imageUrl={`http://localhost:5000${result.imageUrl}`}
                boundingBoxes={result.boundingBoxes}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Facedetection;
