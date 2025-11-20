import { supabase } from "../../../services/supabase";

export async function addLike(userId, postId) {
  try {
    const { error } = await supabase
      .from("likes")
      .insert([{ user_id: userId, post_id: postId }]);

    if (error) throw error;
  } catch (error) {
    console.log("❌ Add like error:", error.message);
  }
}

export async function removeLike(userId, postId) {
  try {
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ user_id: userId, post_id: postId });

    if (error) throw error;
  } catch (error) {
    console.log("❌ Remove like error:", error.message);
  }
}

export async function isLikedByMe(userId, postId) {
  try {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .match({ user_id: userId, post_id: postId })
      .maybeSingle();

    if (error) {
      console.log(" Supabase error:", error.message);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.log(" isLikedByMe unexpected error:", error.message);
    return false;
  }
}
