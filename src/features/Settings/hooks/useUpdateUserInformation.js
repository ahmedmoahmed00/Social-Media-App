import { useMutation } from "@tanstack/react-query";
import { updateUserInformation } from "../api/apiUserSettings";
import { toast } from "react-toastify";

export default function useUpdateUserInformation() {
  const {
    mutate: updateUserInformationMutate,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ userId, userData }) =>
      updateUserInformation(
        userId,
        userData.firstName,
        userData.lastName,
        userData.bio
      ),
    onSuccess: () => {
      toast.success("User information updated successfully");
    },
    onError: (error) => {
      console.log(`Error updating user information: ${error}`);
      toast.error(`Error updating user information: ${error.message}`);
    },
  });

  return {
    updateUserInformation: updateUserInformationMutate,
    isLoading,
    isError,
    error,
    isSuccess,
  };
}
