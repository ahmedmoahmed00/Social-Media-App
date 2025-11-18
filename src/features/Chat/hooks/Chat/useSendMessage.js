import { useMutation } from "@tanstack/react-query";
import { sendMessage as apiSendMessage } from "../../api/apiChat";

function useSendMessage() {
  const {
    mutate: sendMessage,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ userId, friendId, contentMessage }) =>
      apiSendMessage(userId, friendId, contentMessage),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return { sendMessage, isLoading, isError };
}

export default useSendMessage;
