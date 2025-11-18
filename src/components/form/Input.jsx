import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Input({
  id,
  label,
  labelRequired = true,
  type = "text",
  placeholder,
  required = false,
  Icon,
  error,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="text-left ">
      {labelRequired && (
        <label
          className="flex items-center gap-2 text-sm font-medium text-primary dark:text-dark-primary"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="border mt-2 bg-gray-150 border-main rounded-xl relative w-full flex items-center gap-2">
        {Icon && <Icon className="size-4 left-2 z-10 absolute text-gray-400" />}
        <input
          {...rest}
          className={`${Icon ? "pl-8" : ""} ${
            inputType === "password" ? "pr-12" : ""
          } text-sm outline-0 relative border-0 rounded-xl p-2 w-full duration-200
  focus-visible:ring-gray-300 focus-visible:ring-[4px] dark:text-dark-primary
  placeholder-gray-400 dark:placeholder-gray-500`}
          id={id}
          type={inputType}
          placeholder={placeholder}
          required={required}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 text-gray-500 text-sm cursor-pointer"
          >
            {showPassword ? (
              <IoEyeOffOutline size={20} />
            ) : (
              <IoEyeOutline size={20} />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-1">{error.message}</p>
      )}
    </div>
  );
}

export default Input;
