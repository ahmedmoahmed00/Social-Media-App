import { supabase } from "../../../services/supabase";

export async function changeAvatar(userId, avatarFile) {
  const publicUrl = await uploadAvatarFile(avatarFile);

  let { data, error } = await supabase
    .from("users")
    .update({ avatar_url: publicUrl })
    .eq("id", userId)
    .select();

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  return data[0];
}

async function uploadAvatarFile(avatarFile) {
  if (!avatarFile) return null;

  const fileName = `${Date.now()}-${avatarFile.name}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatarFile);
  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return data.publicUrl;
}
export async function changeBigAvatar(userId, BigavatarFile) {
  const publicUrl = await uploadBigAvatarFile(BigavatarFile);

  let { data, error } = await supabase
    .from("users")
    .update({ bigavatar_url: publicUrl })
    .eq("id", userId)
    .select();

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  return data[0];
}

async function uploadBigAvatarFile(BigavatarFile) {
  if (!BigavatarFile) return null;

  const fileName = `${Date.now()}-${BigavatarFile.name}`;

  const { error } = await supabase.storage
    .from("bigAvatar")
    .upload(fileName, BigavatarFile);
  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("bigAvatar").getPublicUrl(fileName);

  return data.publicUrl;
}

export async function updateUserInformation(userId, firstName, lastName, bio) {
  let { data, error } = await supabase
    .from("users")
    .update({ firstName, lastName, bio })
    .eq("id", userId)
    .select();
  if (error) {
    console.error("Update error:", error.message);
    return null;
  }
  return data[0];
}

export async function updateUserPassword(currentPassword, newPassword, email) {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (signInError) {
    throw new Error("Current password is incorrect");
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { success: true };
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

export async function signOut() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await EditStatus(user.id, false);
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);

    return true;
  } catch (err) {
    console.error("Logout error:", err);
    return false;
  }
}
