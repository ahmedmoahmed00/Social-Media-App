import { supabase } from "../../../services/supabase";

export async function getComments({ page, limit, postId }) {
  try {
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let { data: comments, error } = await supabase
      .from("comments")
      .select(
        `
    id,
    content,
    created_at,
    author_id,
    author:users (
      full_name,
      avatar_url,
      userName
    ) 
  `
      )
      .eq("post_id", postId)
      .range(from, to);

    if (error) throw error;

    return comments;
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    return [];
  }
}
export async function addComment(newComment) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([newComment])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return [];
  }
}
