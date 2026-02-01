import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({ type = "text", placeholder = "", name,value,className = "",onValueChange=()=>{}, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type dynamically
  const inputType = type === "password" && showPassword ? "text" : type;
  const handleInput=(e)=>{
     onValueChange({value:e.target.value,name})
  }
  return (
    <div className="relative w-full">
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded border border-gray-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition ${className}`}
        onChange={handleInput}
        value={value}
        {...rest}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 cursor-pointer"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
