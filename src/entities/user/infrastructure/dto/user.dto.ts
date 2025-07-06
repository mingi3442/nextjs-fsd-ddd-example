export type UserDto = {
  id: string;
  profileImage: string;
  username: string;
};

export type UserProfileDto = UserDto & {
  age?: number;
  email?: string;
};
