import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, label, type, options = [] }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isSelect = type === 'select';

  return (
    <div className="w-full">
      <label className="text-sm text-slate-300 mb-1 block">{label}</label>

      {isSelect ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-[#111111] text-white placeholder-slate-500 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type={isPassword && !showPassword ? 'password' : 'text'}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 pr-10 bg-[#111111] text-white placeholder-slate-500 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          {isPassword && (
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
