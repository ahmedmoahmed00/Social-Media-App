import { supabase } from "../../../services/supabase";

export async function getUserByID(id) {
  try {
    let { data: user, error } = await supabase.rpc(
      "get_user_with_friends_count",
      { p_user_id: id }
    );

    if (error) {
      throw error;
    }

    return user;
  } catch (error) {
    console.error("Erorr", error.message);
  }
}
