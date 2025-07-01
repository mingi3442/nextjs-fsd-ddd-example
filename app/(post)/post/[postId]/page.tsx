import { PostDetailPage } from "@/pages/post";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  if (!postId) {
    redirect("/notfound");
  }
  return <PostDetailPage postId={postId} />;
}
