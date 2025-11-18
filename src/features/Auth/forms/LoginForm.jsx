import { CiMail } from "react-icons/ci";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/ui/SubmitButton";
import { PiSignIn } from "react-icons/pi";
import { EMAIL_REGEX } from "../../../config/validation";
import useLogin from "../hooks/auth/useLogin";
import Loader from "../../../components/ui/Loader";

function LoginForm() {
  const { login, isLoading, isError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
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

          <Input
            error={errors.password}
            Icon={CiMail}
            id={"password"}
            type="password"
            placeholder={"Enter your password"}
            label={"Password"}
            {...register("password", {
              required: "Password is required",
            })}
          />
          {isError && (
            <div className="text-red-500 text-sm">
              Login failed. Please check your credentials and try again.
            </div>
          )}
        </div>
        <div>
          <p className="font-bold text-sm text-right">Forgot password?</p>
        </div>
        <SubmitButton Icon={PiSignIn} label={"Sign In"} />
      </form>
    </>
  );
}

export default LoginForm;
