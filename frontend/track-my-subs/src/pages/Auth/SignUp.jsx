import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePictureSelector';
import axios from 'axios';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext'; // Import UserContext
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';


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
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext); // Assuming you have a UserContext to update user info

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



    setError('');
    let profileImageUrl = "";
    // Sign Up API Call (TODO)
    try {

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "" ; // Assuming upload returns an object with a url property

      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { user, token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user); // Assuming you have a context or state management to update user info
        navigate('/Home'); // Redirect to Home after successful sign up
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error("Sign Up Error:", error);
        setError('An error occurred while signing up. Please try again.');
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



          {error && <p className="text-red-500 text-xs mb-2.5">{error}</p>}

          <button type="submit" className="button w-full mb-2">
            <span className="button_lg">
              <span className="button_fill"></span>
              <span className="button_text">SIGN UP</span>
            </span>
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{' '}
            <Link className="text-[#7f5af0] hover:underline" to="/#">Login</Link>
          </p>
        </form>
      </div>
      {/* Custom Animations & Button Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .button {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          border: none;
          background: none;
          color: #0f1923;
          cursor: pointer;
          position: relative;
          padding: 8px;
          margin-bottom: 20px;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 14px;
          transition: all .15s ease;
          outline: none;
        }
        .button::before,
        .button::after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          left: 0;
          height: calc(50% - 5px);
          border: 1px solid #7D8082;
          transition: all .15s ease;
        }
        .button::before {
          top: 0;
          border-bottom-width: 0;
        }
        .button::after {
          bottom: 0;
          border-top-width: 0;
        }
        .button:active::before,
        .button:active::after {
          right: 3px;
          left: 3px;
        }
        .button:active::before {
          top: 3px;
        }
        .button:active::after {
          bottom: 3px;
        }
        .button_lg {
          position: relative;
          display: block;
          padding: 10px 20px;
          color: #fff;
          background-color: #1a1a1a;
          overflow: hidden;
          box-shadow: inset 0px 0px 0px 1px transparent;
          z-index: 2;
        }
        .button_fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #7f5af0 0%, #6841e6 100%);
          z-index: 1;
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .button:hover .button_fill {
          width: 100%;
        }
        .button_text {
          position: relative;
          z-index: 2;
          transition: color 0.2s;
        }
        .button:hover .button_text {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
