import { ModalLogin } from "../features/Auth";

function Login() {
  return (
    <div className="container mx-auto text-center pt-10 flex flex-col items-center">
      <header className="mb-6">
        <h1 className="text-black text-2xl md:text-3xl font-bold mb-2">
          Welcome Back
        </h1>
        <p className="text-secondary ">Sign in to your SocialConnect account</p>
      </header>
      <ModalLogin />
      <div className="text-xs text-gray-500 mt-6 max-w-sm mx-4">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
}

export default Login;
