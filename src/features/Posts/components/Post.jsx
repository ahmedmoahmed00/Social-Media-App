import React from "react";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";

function Post({ post }) {
  if (!post) return null;

  const hasImage = Boolean(post.media_url);

  console.log("post.isLikedByMe", post);
  return (
    <article
      className="p-main border flex flex-col gap-4 rounded-lg border-primary dark:border-dark-primary"
      aria-label="Post"
    >
      <PostHeader author={post.author} postId={post.id} />

      {post.content && (
        <p className="text-md lg:text-base dark:text-white whitespace-pre-line">
          {post.content}
        </p>
      )}

      {hasImage && (
        <figure className="w-full h-75 overflow-hidden rounded-md">
          <img
            src={post.media_url}
            alt={post.content || "Post image"}
            className="h-full w-full object-contain"
          />
        </figure>
      )}

      <PostActions
        postId={post.id}
        likesCount={post.likes_count}
        commentsCount={post.comments_count}
        isLikedByMe={post.is_liked_by_me}
      />
    </article>
  );
}

export default React.memo(Post);
