import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/AuthContext';
import authService from '../services/authService';

const Login = () => {
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showWelcomeText, setShowWelcomeText] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeText(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      login(response.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await authService.forgotPassword(forgotPasswordEmail);
      setMessage('Reset email sent. Check your email.');
      setShowForgotPassword(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send reset email');
    }
  };

  const handleResetPassword = async () => {
    try {
      await authService.resetPassword(forgotPasswordEmail, otp, newPassword);
      setMessage('Password reset successful. You can now login.');
      setShowForgotPassword(false);
      setOtp('');
      setNewPassword('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#ffebcd' }}>
      {showWelcomeText && (
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mt-10 text-indigo-600">
          Welcome to <span className="text-red-500">Smart Vision</span> — 
          where technology sees the future!
        </h1>
      )}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">Flikt Technology</h1>
        <p className="text-xl text-blue-500 mb-4">Web Solution</p>
        <div className="overflow-hidden">
          <div className="marquee text-blue-500 text-sm mt-2">
            👁️ 𝓢𝓶𝓪𝓻𝓽 𝓥𝓲𝓼𝓲𝓸𝓷 𝓾𝓼𝓮𝓼 🧠 𝓬𝓸𝓶𝓹𝓾𝓽𝓮𝓲𝓻 𝓿𝓲𝓼𝓲𝓸𝓷 𝓪𝓷𝓭 𝓶𝓪𝓬𝓱𝓲𝓷𝓮 𝓵𝓮𝓪𝓻𝓷𝓲𝓷𝓰 𝓽𝓸 𝓭𝓮𝓽𝓮𝓬𝓽, 𝓻𝓮𝓬𝓸𝓰𝓷𝓲𝔃𝓮, 𝓪𝓷𝓭 𝓪𝓷𝓪𝓵𝔂𝔃𝓮 𝓯𝓪𝓬𝓮𝓼 𝓲𝓷 𝓻𝓮𝓪𝓵 𝓽𝓲𝓶𝓮, 𝓹𝓻𝓸𝓿𝓲𝓭𝓲𝓷𝓰 𝓪 🛡️ 𝓼𝓶𝓪𝓻𝓽 𝓪𝓷𝓭 𝓼𝓮𝓬𝓾𝓻𝓮 𝓼𝓸𝓵𝓾𝓽𝓲𝓸𝓷 𝓯𝓸𝓻 𝓪𝓾𝓽𝓸𝓶𝓪𝓽𝓮𝓭 𝓲𝓭𝓮𝓷𝓽𝓲𝓯𝓲𝓬𝓪𝓽𝓲𝓸𝓷.
          </div>
        </div>
      </div>
      <div className="max-w-md w-full mx-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8" style={{ backgroundImage: "url('/assets/logo.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Login</h2>
        {error && (
          <div className="bg-red-100/80 backdrop-blur-sm border border-red-400/50 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100/80 backdrop-blur-sm border border-green-400/50 text-green-700 px-4 py-3 rounded-lg mb-6">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-300 text-xs italic mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-8">
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-300 text-xs italic mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-white/20 hover:bg-blue-500 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Login
            </button>
            <Link
              to="/register"
              className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-white/80 transition-colors duration-300"
            >
              Don't have an account?
            </Link>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(!showForgotPassword)}
              className="text-blue-500 hover:text-white/80 transition-colors duration-300 text-sm"
            >
              Forgot Password?
            </button>
          </div>
        </form>
        {showForgotPassword && (
          <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6">
            <h3 className="text-xl font-bold text-center mb-4 text-white">Reset Password</h3>
            <div>
              <input
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent mb-4"
              />
              <button
                onClick={handleForgotPassword}
                className="w-full bg-white/20 hover:bg-blue-500 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
              >
                Send OTP
              </button>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent mb-4"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent mb-4"
              />
              <button
                onClick={handleResetPassword}
                className="w-full bg-white/20 hover:bg-blue-500 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Reset Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
