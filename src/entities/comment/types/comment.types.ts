export interface UserReference {
  id: string;
  username: string;
  profileImage: string;
}

export interface CommentEntity {
  postId: string;
  id: string;
  user: UserReference;
  body: string;
  likes: number;
  createdAt: number;
  updatedAt: number;

  updateBody(newBody: string): void;
  like(userId: string): void;
  unlike(userId: string): void;
}
