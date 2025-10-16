import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/dashboard.jpg')" }}>
      <div className="max-w-4xl w-full mx-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to Smart Vision, {user?.name}!
          </h1>
          <p className="text-white/90 text-lg drop-shadow-md">
            Detect faces in images with our advanced AI technology.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Link
            to="/detect"
            className="bg-white/20 hover:bg-blue-500 backdrop-blur-md text-white font-bold py-8 px-8 rounded-2xl shadow-2xl border border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className="text-4xl mb-4">🔍</div>
            Face Detection
          </Link>
          <Link
            to="/history"
            className="bg-white/20 hover:bg-yellow-500 backdrop-blur-md text-white font-bold py-8 px-8 rounded-2xl shadow-2xl border border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className="text-4xl mb-4">📊</div>
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
