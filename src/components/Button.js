// frontend/src/components/Button.js
import React from 'react';

function Button({ children, onClick, type = "button", className = "", variant = "primary", disabled = false }) {
  const baseStyles = "font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;