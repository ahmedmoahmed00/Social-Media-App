import { supabase } from "../../../services/supabase";

export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error("User data not returned from Supabase");

    const user = await fetchUserData(data.user.id);

    await EditStatus(data.user.id, true);

    return {
      ...data.user,
      ...user,
    };
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) throw new Error(sessionError.message);
    if (!session) return null;

    const user = await fetchUserData(session.user.id);

    return {
      ...session.user,
      ...user,
    };
  } catch (err) {
    console.error("Get current user error:", err);
    return null;
  }
}

export async function fetchUserData(userId) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw new Error(error.message);
    if (!data) {
      console.warn(`No user found with id ${userId}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Fetch user data error:", err);
    return null;
  }
}

export async function EditStatus(userId, active) {
  try {
    let { data, error } = await supabase
      .from("users")
      .update({ status: active ? "active" : "inactive" })
      .eq("id", userId)
      .select();

    if (error) throw new Error(error.message);

    if (!data) {
      console.warn(`No user found with id ${userId}`);
    }

    return data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
}

export async function signUp(formData) {
  const { email, password, userName, firstName, lastName, dateOfBirth } =
    formData;

  try {
    const { data: checkExistingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      throw new Error(checkError.message);
    }

    if (checkExistingUser) {
      throw new Error("Email already exists");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        firstName,
        lastName,
        userName,
        email,
        dateOfBirth,
      },
    ]);

    if (insertError) throw new Error(insertError.message);

    return {
      message: "Please check your email to confirm your account",
      user: data.user,
    };
  } catch (err) {
    console.error("SignUp error:", err.message);
    throw new Error(err.message);
  }
}
