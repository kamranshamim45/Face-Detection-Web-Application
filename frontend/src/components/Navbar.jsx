import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-700' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/dashboard" className="text-2xl font-bold text-white hover:text-white/80 transition-colors duration-300 drop-shadow-lg">
            Smart <sup className="text-red-500 text-lg">Vision</sup>
          </Link>
          <div className="flex space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="bg-white/20 hover:bg-blue-500 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  Dashboard
                </Link>
                <Link to="/detect" className="bg-white/20 hover:bg-blue-500 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  Face Detection
                </Link>
                <Link to="/history" className="bg-white/20 hover:bg-yellow-500 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-red-500 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-white/20 hover:bg-green-500 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  Login
                </Link>
                <Link to="/register" className="bg-white/20 hover:bg-blue-500 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
