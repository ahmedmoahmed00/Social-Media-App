import { supabase } from "../../../services/supabase";

export async function checkIsFriend(userId, friendId) {
  try {
    const { data, error } = await supabase.rpc("is_friend", {
      u1: userId,
      u2: friendId,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error checking friendship:", error.message);
    return false;
  }
}

export async function removeFriend(userId, friendId) {
  try {
    const { data, error } = await supabase
      .from("friends")
      .delete()
      .or(
        `and(user1_id.eq."${userId}",user2_id.eq."${friendId}"),and(user1_id.eq."${friendId}",user2_id.eq."${userId}")`
      );

    console.log("data:", data);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error removing friend:", error.message);
    return false;
  }
}

export async function sendFriendRequest(userId, friendId) {
  try {
    const { data, error } = await supabase.from("friendships").insert([
      {
        requester_id: userId,
        receiver_id: friendId,
      },
    ]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error sending friend request:", error.message);
    return false;
  }
}

export async function removeSendFriendRequest(userId, friendId) {
  try {
    const { data, error } = await supabase
      .from("friendships")
      .delete()
      .or(
        `and(requester_id.eq."${userId}",receiver_id.eq."${friendId}"),and(requester_id.eq."${friendId}",receiver_id.eq."${userId}")`
      );

    console.log("data:", data);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error removing friend request:", error.message);
    return false;
  }
}
