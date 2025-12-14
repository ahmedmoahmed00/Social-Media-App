import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PasswordStrength from "../features/Auth/components/PasswordStrength";
import ModalAuth from "../features/Auth/components/ModalAuth";
import Input from "../components/form/Input";
import SubmitButton from "../components/ui/SubmitButton";
import { toast } from "react-toastify";
import useResetPassword from "../features/Auth/hooks/auth/useResetPassword";

const rules = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw) => /\d/.test(pw) },
];

function ResetPasswordPage() {
  const [hasNonEnglish, setHasNonEnglish] = useState(false);
  const { resetPassword, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    const nonEnglishRegex = /[^a-zA-Z0-9]/;
    setHasNonEnglish(nonEnglishRegex.test(newPassword || ""));
  }, [newPassword]);

  const isPasswordValid =
    rules.every((rule) => rule.test(newPassword || "")) &&
    !hasNonEnglish &&
    newPassword === confirmPassword;

  const onSubmit = async (data) => {
    if (!isPasswordValid) {
      toast.error(
        "Password does not meet all requirements or contains non-English characters."
      );
      return;
    }

    resetPassword({ newpassword: data.newPassword });
  };

  return (
    <div className="container mx-auto text-center flex flex-col items-center space-y-5 h-screen justify-center">
      <h1>Reset Your Password</h1>
      <ModalAuth>
        <div className="flex flex-col gap-6">
          <h2 className="text-left text-gray-500">
            Enter your new password below. Make sure it's strong and secure.
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-left flex flex-col gap-3"
          >
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              {...register("newPassword", { required: "Password is required" })}
              error={errors.newPassword}
            />

            <div className="ml-1">
              <PasswordStrength
                showProgress={newPassword?.length > 0}
                password={newPassword || ""}
                rules={rules}
              />
            </div>

            {hasNonEnglish && (
              <p className="text-red-500 text-sm mt-1">
                Only English letters and numbers are allowed.
              </p>
            )}

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              error={errors.confirmPassword}
            />

            <SubmitButton
              disabled={!isPasswordValid || isLoading}
              textSize="text-sm"
              label="Reset Password"
            />
          </form>
        </div>
      </ModalAuth>
    </div>
  );
}

export default ResetPasswordPage;
