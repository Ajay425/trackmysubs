import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper'; 
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError("");
    // Login API Call (TODO)
    try {
      // Simulate API call
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const { user, token } = response.data;
      // Store user info and token in localStorage
      if (token) {
        localStorage.setItem('token',token);
        navigate('/Home'); // Redirect to Home after successful login

      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while logging in. Please try again.');
      }
    }

  };


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#1a1a1a] text-white flex flex-col items-center justify-center overflow-hidden px-4">
      {/* background glow */}
      <div className="absolute w-96 h-96 bg-purple-800 rounded-full blur-[160px] opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-[160px] opacity-20 bottom-0 right-0 animate-pulse"></div>

      {/* page title */}
      <div className="z-10 text-center mb-10 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#7f5af0] neon-text drop-shadow-md">
          Welcome to Trackmysubs.com
        </h1>
        <p className="mt-2 text-gray-400 text-sm md:text-base tracking-wide">
          Track all your subscriptions in one place — organized and simplified.
        </p>
      </div>

      {/* login card */}
      <div className="z-10 backdrop-blur-2xl bg-black/40 border border-white/10 p-10 rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(127,90,240,0.2)] animate-fadeIn">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#7f5af0] tracking-wide">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-400">Email</label>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="john@example.com"
              type="text"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-400">Password</label>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="●●●●●●"
              type="password"
            />
          </div>

          {error && <p className="text-red-500 text-xs mb-2.5">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-3 bg-[#7f5af0] hover:bg-[#6841e6] transition-colors duration-300 rounded-lg font-bold text-white shadow-lg shadow-[#7f5af0]/40">
            LOGIN
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link className="text-[#7f5af0] hover:underline" to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}


export default Login;