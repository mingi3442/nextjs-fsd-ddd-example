export interface PostEntity {
  id: string;
  user: UserReference;
  title: string;
  body: string;
  image: string;
  likes: number;
  totalComments: number;
  createdAt: number;
  updatedAt: number;
}

export interface UserReference {
  id: string;
  username: string;
  profileImage: string;
}
