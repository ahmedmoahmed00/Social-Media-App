import { FiCheck, FiUser } from "react-icons/fi";
import Input from "../../../../components/form/Input";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import useUpdateUserInformation from "../../hooks/useUpdateUserInformation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function SettingPersonalInformationSection({ user }) {
  const queryClient = useQueryClient();

  const { updateUserInformation, isLoading, isSuccess } =
    useUpdateUserInformation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bio: user?.bio || "",
    },
  });

  const watchedValues = watch();

  const isChanged =
    watchedValues.firstName !== user?.firstName ||
    watchedValues.lastName !== user?.lastName ||
    watchedValues.bio !== user?.bio;

  const handleFormSubmit = (data) => {
    if (
      data.firstName !== user.firstName ||
      data.lastName !== user.lastName ||
      data.bio !== user.bio
    ) {
      updateUserInformation({
        userId: user.id,
        userData: data,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["user"]);
    }
  }, [isSuccess]);

  return (
    <div>
      <div>
        <h2 className="flex text-primary dark:text-dark-primary items-center gap-2">
          <span>
            <FiUser size={20} />
          </span>
          Profile Images
        </h2>
      </div>
      <form className="mt-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-6">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={"First Name"}
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 5,
                  message: "First name must be at least 5 characters",
                },
              })}
              error={errors.firstName}
            />
            <Input
              label={"Last Name"}
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 5,
                  message: "Last name must be at least 5 characters",
                },
              })}
              error={errors.lastName}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="bio"
              className="font-semibold text-primary dark:text-dark-primary"
            >
              Bio
            </label>
            <textarea
              id="bio"
              className="w-full p-3 border border-primary dark:border-dark-primary rounded-lg bg-gray-150 dark:bg-dark-secondary text-sm dark:text-dark-primary outline-0 resize-none focus-visible:ring-gray-300 focus-visible:ring-[4px]"
              rows={2}
              placeholder="Bio"
              {...register("bio")}
            ></textarea>
          </div>
        </div>
        {isChanged && (
          <div className="mt-6">
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SettingPersonalInformationSection;
