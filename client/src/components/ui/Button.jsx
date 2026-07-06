function Button({

  children,

  type = "button",

  onClick,

  className = "",

}) {

  return (

    <button
      type={type}
      onClick={onClick}
      className={`
        px-4
        py-2
        rounded-md
        bg-blue-600
        text-white
        font-medium
        hover:bg-blue-700
        transition-colors
        duration-200
        cursor-pointer
        ${className}
      `}
    >

      {children}

    </button>

  );

}

export default Button;