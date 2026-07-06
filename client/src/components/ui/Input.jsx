import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`
          w-full
          px-4
          py-2.5
          rounded-md
          border
          border-slate-300
          bg-white
          text-slate-900
          placeholder:text-slate-400
          outline-none
          focus:border-blue-600
          focus:ring-2
          focus:ring-blue-100
          transition-all
          duration-200
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;