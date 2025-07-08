import { PostHeader } from "@/widgets/header/post-header";

export function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex-1 flex flex-col">
      <PostHeader />
      <div className="px-4 py-6">{children}</div>
    </div>
  );
}
