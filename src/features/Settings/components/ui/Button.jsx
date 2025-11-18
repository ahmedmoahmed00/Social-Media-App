import { IoMdCheckmark } from "react-icons/io";

function Button({ onClick, disabled, children, type = "button" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className="px-3 bg-dark-primary py-2  dark:bg-primary text-dark-primary dark:text-primary  disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer font-semibold text-sm rounded-lg flex items-center gap-2 "
    >
      <IoMdCheckmark />
      <span>{children}</span>
    </button>
  );
}

export default Button;
