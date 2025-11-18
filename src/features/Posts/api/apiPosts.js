import { supabase } from "../../../services/supabase";

export async function GetAllPosts({ pageParam = null }) {
  try {
    let query = supabase
      .from("posts")
      .select(
        `
        *,
        user:users(*)
      `
      )
      .order("created_at", { ascending: false })
      .limit(10);

    if (pageParam) {
      query = query.lt("created_at", pageParam);
    }

    const { data: posts, error } = await query;

    if (error) throw new Error(error.message);

    return posts;
  } catch (error) {
    console.error("Fetch posts error:", error);
    return null;
  }
}

export async function insertPost(userId, postValue, filePost) {
  if (!postValue || postValue.trim().length === 0) {
    console.error("Post content is required");
    return null;
  }

  let imageUrl = null;

  if (filePost) {
    imageUrl = await uploadUserImage(filePost);
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          author_id: userId,
          content: postValue,
          media_url: imageUrl,
        },
      ])
      .select();

    if (error) throw error;

    return data[0];
  } catch (error) {
    console.error("Insert post error:", error);
    return null;
  }
}

export async function GetPostsPaginated({ page = 1, limit = 9 }) {
  try {
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    const { data: posts, error } = await supabase
      .from("posts")
      .select(`*, user:users(*)`)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);

    return posts;
  } catch (error) {
    console.error("Fetch posts error:", error);
    return [];
  }
}

export async function GetPostsWithMeta({ page = 1, limit = 9, userId }) {
  try {
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    const { data, error } = await supabase
      .rpc("get_posts_with_meta", {
        user_uuid: userId,
      })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Fetch posts with meta error:", err.message);
    return [];
  }
}

export async function deletePost(postId) {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error("Delete post error:", err.message);

    return { success: false, message: err.message };
  }
}

async function uploadUserImage(file) {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return data.publicUrl;
}
