import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePictureSelector';

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: 'Weak', color: 'text-red-500' };
  if (score === 2 || score === 3) return { label: 'Medium', color: 'text-yellow-400' };
  return { label: 'Strong', color: 'text-green-500' };
};

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const strength = getPasswordStrength(password);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    // Sign Up API Call (TODO)
    navigate('/Home'); // Redirect to Home after successful sign up
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#1a1a1a] text-white flex flex-col items-center justify-center overflow-hidden px-4">
      
      {/* background glow */}
      <div className="absolute w-96 h-96 bg-purple-800 rounded-full blur-[160px] opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-[160px] opacity-20 bottom-0 right-0 animate-pulse"></div>

      {/* page title */}
      <div className="z-10 text-center mb-10 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#7f5af0] neon-text drop-shadow-md">
          Create Your Account
        </h1>
        <p className="mt-2 text-gray-400 text-sm md:text-base tracking-wide">
          Start tracking your subscriptions in one organized place.
        </p>
      </div>

      {/* sign up card */}
      <div className="z-10 backdrop-blur-2xl bg-black/40 border border-white/10 p-10 rounded-2xl w-full max-w-2xl shadow-[0_0_50px_rgba(127,90,240,0.2)] animate-fadeIn">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#7f5af0] tracking-wide">
          Sign Up
        </h2>

       <div className="flex flex-col items-center mb-6">
         <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <p className="mt-2 text-sm text-gray-400">Upload Photo</p>
      </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-400">Full Name</label>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="John Doe"
              type="text"
            />
          </div>

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
            {password && (
              <p className={`mt-1 text-xs font-medium ${strength.color}`}>
                Strength: {strength.label}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-400">Confirm Password</label>
            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              placeholder="●●●●●●"
              type="password"
            />
          </div>

          {error && <p className="text-red-500 text-xs mb-2.5">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-[#7f5af0] hover:bg-[#6841e6] transition-colors duration-300 rounded-lg font-bold text-white shadow-lg shadow-[#7f5af0]/40"
          >
            SIGN UP
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{' '}
            <Link className="text-[#7f5af0] hover:underline" to="/#">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
