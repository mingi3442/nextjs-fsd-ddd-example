"use client";
import { BackIcon } from "@/shared/ui/icons";
import { useRouter } from "next/navigation";

export const PostHeader = () => {
  const router = useRouter();

  return (
    <header className="w-full sticky top-0 z-10 bg-white shadow-sm py-3 px-4">
      <div className="flex items-center">
        <button
          onClick={() => router.back()}
          className="text-gray-700 hover:text-teal-600 text-xl cursor-pointer">
          <BackIcon className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-medium mx-auto">Post</h1>
      </div>
    </header>
  );
};
