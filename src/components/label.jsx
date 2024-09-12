import { useEffect, useState } from 'react';

const FloatingLabel = ({ htmlFor, children, isFocused, inputValue }) => {
  const shouldFloat = isFocused || inputValue.length > 0;

  return (
    <label
      htmlFor={htmlFor}
      className={`absolute left-2 transition-all duration-200 transform ${
        shouldFloat 
        ? '!left-0  !-top-4 !text-[10px] !text-purple-900' 
        : '!left-0 !-top-1 !text-[14px] text-gray-700'
      }`}
    >
      {children}
    </label>
  );
};

export default FloatingLabel;
