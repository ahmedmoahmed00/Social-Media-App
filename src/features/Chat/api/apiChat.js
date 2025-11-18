import { supabase } from "../../../services/supabase";

export async function getMessages({ userID, friendID, page = 1, limit = 20 }) {
  try {
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    const { data, error } = await supabase
      .rpc("get_conversation", {
        user_uuid: userID,
        friend_uuid: friendID,
      })
      .range(from, to);

    if (error) throw error;

    return data.reverse();
  } catch (err) {
    console.error("Error fetching conversation:", err.message);
    return [];
  }
}

export async function sendMessage(userID, friendID, contentMessage) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        { sender_id: userID, receiver_id: friendID, content: contentMessage },
      ])
      .select();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error fetching conversation:", err.message);
    return [];
  }
}
