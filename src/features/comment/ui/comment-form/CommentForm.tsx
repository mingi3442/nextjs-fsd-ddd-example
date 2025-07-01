import { UserAvatar } from "@/entities/user/ui/identifier";
import { Input } from "@/shared/ui/input";

export const CommentForm = ({
  userProfileImage,
}: {
  userProfileImage: string;
}) => {
  return (
    <form onSubmit={() => {}} className="flex items-center mb-6 gap-4">
      <UserAvatar userProfileImage={userProfileImage} />
      <Input
        type="text"
        placeholder="Enter a comment..."
        onChange={(e) => {
          console.log(e);
        }}
      />
      <button
        type="submit"
        className=" text-slate-600 hover:text-teal-600 font-medium text-sm cursor-pointer"
        disabled={!"".trim()}>
        Post
      </button>
    </form>
  );
};
