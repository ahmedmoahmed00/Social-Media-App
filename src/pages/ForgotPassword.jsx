import { Link } from "react-router-dom";
import ModalAuth from "../features/Auth/components/ModalAuth";
import { GoArrowLeft } from "react-icons/go";
import Input from "../components/form/Input";
import { EMAIL_REGEX } from "../config/validation";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import useSendForgotPasswordRequest from "../features/Auth/hooks/auth/useSendForgotPasswordRequest";
import { useEffect, useRef, useState } from "react";

const COOLDOWN_SECONDS = 60;
const LS_KEY = "forgot_password_last_sent_at";

function ForgotPassword() {
  const { sendForgotPasswordRequest, isLoading, isSuccess } =
    useSendForgotPasswordRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef(null);

  const computeRemaining = () => {
    try {
      const last = Number(localStorage.getItem(LS_KEY));
      if (!last || isNaN(last)) return 0;

      const elapsed = Math.floor((Date.now() - last) / 1000);
      const rem = COOLDOWN_SECONDS - elapsed;

      return rem > 0 ? rem : 0;
    } catch {
      return 0;
    }
  };

  const startCountdown = (startFrom) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (startFrom > 0) {
      setRemaining(startFrom);

      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    const rem = computeRemaining();
    if (rem > 0) startCountdown(rem);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

    const onSubmit = async (data) => {
    try {
      await sendForgotPasswordRequest(data.email);

      localStorage.setItem(LS_KEY, String(Date.now()));
      startCountdown(COOLDOWN_SECONDS);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto text-left px-4 flex flex-col items-center justify-center h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Forgot Password?</h1>
      </div>

      <ModalAuth>
        <div className="flex flex-col gap-2">
          <header className="text-left">
            <Link
              to="/login"
              className="flex items-center gap-3 font-semibold text-primary dark:text-dark-primary p-2  rounded-lg hover:bg-gray-100 hover:dark:bg-dark-hover w-fit"
            >
              <GoArrowLeft size={18} />
              <span className="text-sm">Back to Login</span>
            </Link>
          </header>

          <p className="text-gray-500">
            No worries! Enter your email and we'll send you instructions to
            reset your password.
          </p>

          <div className="mt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="Enter your email"
                Icon={CiMail}
                error={errors.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Please enter a valid email address",
                  },
                })}
              />

              <button
                type="submit"
                disabled={isLoading || remaining > 0}
                className="bg-dark-primary text-sm text-white w-full mt-4 py-2 rounded-lg hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Sending..."
                  : remaining > 0
                  ? `Resend in ${remaining}s`
                  : "Send Reset Link"}
              </button>
            </form>

            <div className="text-center">
              <p className="text-gray-500 text-sm mt-4">
                Remembered your password?{" "}
                <Link to="/login" className="font-semibold text-lg text-black">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </ModalAuth>
    </div>
  );
}

export default ForgotPassword;
