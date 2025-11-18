import { supabase } from "../../../services/supabase";

export async function acceptFriendRequest(friendshipId) {
  console.log("friendshipId", friendshipId);
  try {
    const { data, error } = await supabase
      .from("friendships")
      .update({ status: "accepted" })
      .eq("id", friendshipId)
      .select("*");

    if (error) {
      throw error;
    }

    console.log(data);

    const { data: friendData, error: friendError } = await supabase
      .from("friends")
      .insert([
        { user1_id: data[0].receiver_id, user2_id: data[0].requester_id },
      ])
      .select();

    if (friendError) {
      throw friendError;
    }

    return friendData;
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
}
