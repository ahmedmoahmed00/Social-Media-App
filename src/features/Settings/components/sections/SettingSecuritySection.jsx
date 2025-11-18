import { IoLockClosedOutline } from "react-icons/io5";
import Input from "../../../../components/form/Input";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import useUpdateUserPassword from "../../hooks/useUpdateUserPassword";

function SettingSecuritySection({ user }) {
  const { updateUserPassword, isLoading, error } = useUpdateUserPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { currentPassword, newPassword, confirmPassword } = watch();

  const isFormValid =
    [currentPassword, newPassword, confirmPassword].every(Boolean) &&
    newPassword === confirmPassword;

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword || !data.currentPassword)
      return;

    updateUserPassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      email: data.email,
    });
  };

  return (
    <div>
      <h2 className="flex text-primary dark:text-dark-primary items-center gap-2">
        <IoLockClosedOutline size={20} />
        Security
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <input
          type="email"
          name="username"
          {...register("email")}
          defaultValue={user.email}
          autoComplete="username"
          style={{ display: "none" }}
        />

        <div>
          <Input
            label="Current Password"
            placeholder="Enter current password"
            type="password"
            autoComplete="current-password"
            {...register("currentPassword", {
              required: "Current password required",
            })}
            error={errors.currentPassword || (error && error)}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="New Password"
            placeholder="Enter new password"
            type="password"
            autoComplete="new-password"
            {...register("newPassword", {
              required: "New password required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            error={errors.newPassword}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm new password"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Confirm password required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            error={errors.confirmPassword}
          />
        </div>

        <div className="mt-6">
          <Button disabled={!isFormValid || isLoading} type="submit">
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SettingSecuritySection;
