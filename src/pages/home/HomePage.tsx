import { PostListSection } from "@/widgets/post/post-list-section";

export function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full flex-1 flex flex-col items-center justify-center p-4">
        <PostListSection />
      </div>
    </div>
  );
}
