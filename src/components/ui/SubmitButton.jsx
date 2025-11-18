function SubmitButton({ Icon, label }) {
  return (
    <button
      type="submit"
      className="bg-black flex items-center justify-center cursor-pointer hover:bg-black/85 gap-2 text-white py-2 px-4 rounded-lg"
    >
      {Icon ? <Icon width={20} height={20} /> : null}
      <p className="font-semibold text-lg">{label}</p>
    </button>
  );
}

export default SubmitButton;
