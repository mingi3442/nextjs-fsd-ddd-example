import { PostDetailSection } from "@/widgets/post/post-detail-section";

export const PostDetailPage = ({ postId }: { postId: string }) => {
  return (
    <div className="w-full bg-white overflow-y-auto">
      <PostDetailSection postId={postId} />
    </div>
  );
};
