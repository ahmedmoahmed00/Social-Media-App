import { useQuery } from "@tanstack/react-query";
import { GetPostsWithMeta } from "../../api/apiPosts";

function useGetPostsWithMeta(userID) {
  const query = useQuery({
    queryKey: ["posts-meta", userID],
    queryFn: () => GetPostsWithMeta(userID),
  });

  return query;
}

export default useGetPostsWithMeta;
