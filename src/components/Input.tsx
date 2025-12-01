import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <input
        className={`input-field text-sm sm:text-base ${error ? 'ring-2 ring-red-400 border-red-300' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
    </div>
  );
};
