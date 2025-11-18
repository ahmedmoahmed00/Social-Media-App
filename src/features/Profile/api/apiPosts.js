import { supabase } from "../../../services/supabase";

export async function getPostsByID({ page = 1, limit = 9, userId }) {
  try {
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let { data: posts, error } = await supabase
      .rpc("get_posts_by_user_uuid", {
        user_uuid: userId,
      })
      .range(from, to);
    if (error) {
      throw error;
    }

    return posts;
  } catch (error) {
    console.error("Error", error.message);
  }
}
export async function getCountPostsByID(userId) {
  try {
    const { count, error } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("author_id", userId);

    if (error) {
      throw error;
    }

    return count;
  } catch (error) {
    console.error("Error", error.message);
  }
}
