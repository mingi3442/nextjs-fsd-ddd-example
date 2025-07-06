import { UserReference } from "@/entities/comment/types";

export type CommentDto = {
  id: string;
  body: string;
  postId: string;
  likes: number;
  user: UserReference;
  createdAt?: number;
  updatedAt?: number;
};
