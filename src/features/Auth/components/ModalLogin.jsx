import LoginForm from "../forms/LoginForm";
import { Link } from "react-router-dom";
import SocialSignAndLog from "./SocialSignAndLog";
import ModalAuth from "./ModalAuth";

function ModalLogin() {
  return (
    <ModalAuth>
      <header className="flex flex-col gap-2 ">
        <h2 className="text-xl">Sign In</h2>
        <p className="text-secondary">
          Enter your credentials to access your account
        </p>
      </header>
      <div>
        <LoginForm />
      </div>
      <div className="relative before:absolute before:w-full before:h-[1px] before:bg-gray-300 before:top-1/2 before:left-0 ">
        <span className="text-sm max-w-8 mx-auto text-center flex w-full justify-center relative bg-white z-10 text-gray-500">
          OR
        </span>
      </div>
      <SocialSignAndLog />
      <div className="text-center  text-sm text-gray-600">
        Don't have an account?{" "}
        <Link className="font-semibold text-black" to={"/signup"}>
          Sign Up
        </Link>
      </div>
    </ModalAuth>
  );
}

export default ModalLogin;
