import { FaFacebook, FaGoogle } from "react-icons/fa";

function SocialSignAndLog() {
  return (
    <div>
      <div className="opacity-70">
        <button className="w-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2">
          <FaGoogle />
          <span>Continue with Google</span>
        </button>
      </div>
      <div className="mt-4 opacity-70">
        <button className="w-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2">
          <FaFacebook />
          <span>Continue with Facebook</span>
        </button>
      </div>
    </div>
  );
}

export default SocialSignAndLog;
