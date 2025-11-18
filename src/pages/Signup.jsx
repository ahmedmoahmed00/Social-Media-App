import ModalSignup from "../features/Auth/components/ModalSignup";

function Signup() {
  return (
    <div className="container mx-auto text-center pt-10 flex flex-col items-center pb-10">
      <header className="mb-6">
        <h1 className="text-black text-2xl md:text-3xl font-bold mb-2">
          Join SocialConnect
        </h1>
        <p className="text-secondary ">
          Create your account and start connecting with friends
        </p>
      </header>
      <ModalSignup />
    </div>
  );
}

export default Signup;
