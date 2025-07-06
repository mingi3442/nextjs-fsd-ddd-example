import { PostDto } from "@/entities/post/infrastructure/dto";
import { UserIdentifier } from "@/entities/user/ui/identifier";
import { CommentIcon, LikeIcon } from "@/shared/ui/icons";
import Image from "next/image";
import Link from "next/link";

export const PostCard = ({ post }: { post: PostDto }) => {
  return (
    <Link
      href={`/post/${post.id}`}
      key={post.id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative pb-[100%]">
        <Image
          src={post.image}
          alt={`post-${post.id}`}
          className="absolute inset-0 w-full h-full object-cover"
          width={400}
          height={400}
          priority={true}
          loading="eager"
        />
      </div>
      <div className="p-4">
        <UserIdentifier user={post.user} />
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.body}</p>
        <div className="flex items-center text-gray-500 text-sm">
          <div className="flex items-center mr-4">
            <LikeIcon className="h-4 w-4 text-red-500 mr-1" />
            <span>{post.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <CommentIcon className="h-4 w-4 text-blue-500 mr-1" />

            <span>{post.totalComments.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
