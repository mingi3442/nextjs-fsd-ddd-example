import { UserDto } from "@/entities/user/infrastructure/dto";
import { UserAvatar } from "@/entities/user/ui/identifier";

interface UserIdentifierProps {
  user: UserDto;
}

export const UserIdentifier = ({ user }: UserIdentifierProps) => {
  return (
    <div className="flex items-center mb-2 space-x-2">
      <UserAvatar userProfileImage={user.profileImage} />
      <span className="font-semibold">{user.username}</span>
    </div>
  );
};
