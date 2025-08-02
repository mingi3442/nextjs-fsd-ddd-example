import { CommentDto } from "@/entities/comment";
import { UserAvatar } from "@/entities/user";
import { formatDate } from "@/shared/libs";

export const CommentView = ({ comment }: { comment: CommentDto }) => {
  return (
    <div key={comment.id} className="flex items-start space-x-2">
      <UserAvatar userProfileImage={comment.user.profileImage} />
      <div className="flex-1 px-2">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="font-semibold text-sm">{comment.user.username}</div>
          <p className="text-gray-800 text-sm mt-1">{comment.body}</p>
        </div>
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <span className="mr-3">
            {formatDate(comment.updatedAt ?? comment.createdAt ?? "")}
          </span>
          <button className="mr-3 hover:text-gray-700 cursor-pointer">
            Like
          </button>
          <button className="hover:text-gray-700 cursor-pointer">Reply</button>
        </div>
      </div>
    </div>
  );
};
