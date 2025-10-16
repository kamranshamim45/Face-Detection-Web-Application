import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/AuthContext';
import authService from '../services/authService';

const Register = () => {
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.register(data);
      login(response.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/logo.jpg')" }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Flikt Technology</h1>
        <p className="text-xl text-white/80">Web Solution</p>
      </div>
      <div className="max-w-md w-full mx-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Register</h2>
        {error && (
          <div className="bg-red-100/80 backdrop-blur-sm border border-red-400/50 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-300 text-xs italic mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email address',
                },
              })}
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-300 text-xs italic mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-white/20 hover:bg-blue-500 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Register
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-semibold text-sm text-white hover:text-white/80 transition-colors duration-300"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
