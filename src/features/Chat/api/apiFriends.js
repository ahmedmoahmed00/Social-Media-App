import { supabase } from "../../../services/supabase";

export async function getUserFriends(userId) {
  try {
    const { data, error } = await supabase.rpc("get_user_friends", {
      user_uuid: userId,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Fetch posts with meta error:", error.message);
    return [];
  }
}
