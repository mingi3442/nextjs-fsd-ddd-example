"use client";
import { useGetPosts } from "@/features/post/hooks";
import { PostCard } from "@/features/post/ui/card";

export const PostListSection = () => {
  const { data } = useGetPosts();
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.data.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
