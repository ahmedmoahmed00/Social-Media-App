import { supabase } from "../../../services/supabase";

export async function notificationsFriends(receiverId) {
  try {
    const { data, error } = await supabase.rpc("get_pending_friend_requests", {
      receiver: receiverId,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}
