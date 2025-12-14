function SubmitButton({ Icon, label, textSize, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`bg-black flex items-center disabled:pointer-events-none justify-center cursor-pointer hover:bg-black/85 gap-2 text-white py-2 px-4 rounded-lg ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {Icon ? <Icon width={20} height={20} /> : null}
      <p className={`font-semibold ${textSize || "text-lg"}`}>{label}</p>
    </button>
  );
}

export default SubmitButton;
