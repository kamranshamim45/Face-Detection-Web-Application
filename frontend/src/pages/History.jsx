import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import faceService from '../services/faceService';
import FaceBoxOverlay from '../components/FaceBoxOverlay';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log('Fetching history for user:', user);
        const data = await faceService.getHistory();
        console.log('History data received:', data);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
        setError('Failed to fetch history: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await faceService.deleteHistory(id);
      // Remove from local state after successful deletion
      setHistory(history.filter(item => item._id !== id));
    } catch (error) {
      setError('Failed to delete history entry');
    }
  };

  if (loading) {
    return <div className="text-center">Loading history...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/dashboard.jpg')" }}>
      <div className="max-w-6xl w-full mx-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">Detection History</h1>

        {history.length === 0 ? (
          <p className="text-center text-white/80 text-lg">No detection history found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div key={item._id} className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6">
                <div className="mb-4">
                  <FaceBoxOverlay
                    imageUrl={`http://localhost:5000${item.imageUrl}`}
                    boundingBoxes={item.boundingBoxes}
                  />
                </div>
                <div className="text-sm text-white drop-shadow-md">
                  <p className="mb-2">Faces detected: {item.facesDetected}</p>
                  <p>Date: {new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-4 bg-red-500 hover:bg-red-700 backdrop-blur-sm text-white font-bold py-2 px-4 rounded-lg border border-red-400 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
