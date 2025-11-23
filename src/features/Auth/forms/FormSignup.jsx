import { useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import { FaRegUser } from "react-icons/fa";
import { EMAIL_REGEX } from "../../../config/validation";
import { MdAlternateEmail } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { IoLockClosedOutline } from "react-icons/io5";
import { useState } from "react";
import SubmitButton from "../../../components/ui/SubmitButton";
import { FiUserPlus } from "react-icons/fi";
import useSignup from "../hooks/auth/useSignup";
import Loader from "../../../components/ui/Loader";

function FormSignup() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { signup, isLoading } = useSignup();

  function calculateAge(date) {
    const birthDate = new Date(date);
    const today = new Date();
    return (
      today.getFullYear() -
      birthDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
        ? 1
        : 0)
    );
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    data.email = data.email.trim().toLowerCase();
    data.userName = data.userName.trim().toLowerCase();
    data.firstName = data.firstName.trim();
    data.lastName = data.lastName.trim();

    if (termsAccepted) {
      console.log("xxxx")
      signup(data);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className=" grid sm:grid-cols-2 gap-6 w-full">
          <Input
            {...register("firstName", {
              required: "First name is required",
            })}
            Icon={FaRegUser}
            placeholder="FirstName"
            label="First Name"
            type="text"
            error={errors.firstName}
          />
          <Input
            {...register("lastName", {
              required: "Last name is required",
            })}
            Icon={FaRegUser}
            placeholder="LastName"
            label="Last Name"
            type="text"
            error={errors.lastName}
          />
        </div>
        <Input
          {...register("userName", {
            required: "Username is required",
          })}
          Icon={MdAlternateEmail}
          placeholder="Enter your username"
          label="Username"
          type="text"
          error={errors.userName}
        />
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email is invalid",
            },
          })}
          Icon={CgMail}
          placeholder="Enter your email"
          label="Email Address"
          type="email"
          error={errors.email}
        />
        <Input
          {...register("dateOfBirth", {
            required: "Date of Birth is required",
            validate: (value) => {
              const age = calculateAge(value);

              if (age < 12) return "You must be at least 12 years old";
              if (age > 100) return "Age cannot be more than 100 years";

              return true;
            },
          })}
          Icon={CgMail}
          placeholder="Enter your date of birth"
          label="Date of Birth"
          type="date"
          error={errors.dateOfBirth}
        />

        <Input
          {...register("password", {
            required: "Password is required",
          })}
          Icon={IoLockClosedOutline}
          placeholder="Create password"
          label="Password"
          type="password"
          error={errors.password}
        />

        <Input
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Password not matched",
          })}
          Icon={IoLockClosedOutline}
          placeholder="Confirm password"
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
        />
        <div className="text-left flex  items-center gap-2">
          <input
            id="termsAccepted"
            value={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            type="checkbox"
            className="size-4"
          />
          <label
            htmlFor="termsAccepted"
            className="text-sm text-gray-700 cursor-pointer"
          >
            I agree to{" "}
            <span className="text-black font-bold">Terms of Service </span> and{" "}
            <span className="text-black font-bold">Privacy Policy</span>
          </label>
        </div>

        <SubmitButton Icon={FiUserPlus} label={"Sign In"} />
      </form>
    </>
  );
}

export default FormSignup;
