import { Link } from "react-router-dom";
import FormSignup from "../forms/formSignup";
import ModalAuth from "./ModalAuth";
import SocialSignAndLog from "./SocialSignAndLog";

function ModalSignup() {
  return (
    <ModalAuth>
      <header className="flex flex-col gap-2 ">
        <h2 className="text-xl">Create Account</h2>
        <p className="text-secondary">
          Fill in your information to get started
        </p>
      </header>
      <FormSignup />
      <div className="relative before:absolute before:w-full before:h-[1px] before:bg-gray-300 before:top-1/2 before:left-0 ">
        <span className="text-sm max-w-8 mx-auto text-center flex w-full justify-center relative bg-white z-10 text-gray-500">
          OR
        </span>
      </div>
      <SocialSignAndLog />

      <div>
        <div className="text-center  text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="font-semibold text-black" to={"/login"}>
            Sign In
          </Link>
        </div>
      </div>
    </ModalAuth>
  );
}

export default ModalSignup;
