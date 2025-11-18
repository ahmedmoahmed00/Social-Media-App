import { supabase } from "../../../services/supabase";

export async function getTrendingUsers() {
  try {
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .range(0, 4);

    if (error) {
      throw error;
    }

    return users;
  } catch (error) {
    console.error("Database fetch failed:", error.message);
  }
}

export async function getSearchUsers(search, userID) {
  try {
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .or(`userName.ilike.%${search}%,full_name.ilike.%${search}%`)
      .neq("id", userID); // هنا استبعاد المستخدم الحالي

    if (error) {
      throw error;
    }

    return users;
  } catch (error) {
    console.error("Error searching users:", error.message);
  }
}
