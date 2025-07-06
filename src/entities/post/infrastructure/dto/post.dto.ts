import { UserReference } from "../../types";

export type PostDto = {
  id: string;
  user: UserReference;
  title: string;
  body: string;
  image: string;
  likes: number;
  totalComments: number;
  createdAt: number;
  updatedAt: number;
};
