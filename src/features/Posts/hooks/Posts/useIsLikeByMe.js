import { useQuery } from "@tanstack/react-query";
import { isLikedByMe } from "../../api/apiLikes";

function useIsLikeByMe(userId, postId) {
  const { data = false } = useQuery(
    ["isLikedByMe", userId, postId],
    () => isLikedByMe(userId, postId),
    {
      enabled: Boolean(userId && postId),
      staleTime: 1000 * 60 * 1,
    }
  );

  return data;
}

export default useIsLikeByMe;
