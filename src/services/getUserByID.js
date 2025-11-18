import { supabase } from "./supabase";

async function getUserByID(userId) {
  try {
    let { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId);

    if (error) {
      throw error;
    }

    return user[0];
  } catch (error) {
    console.log(error);
  }
}

export default getUserByID;
