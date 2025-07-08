import { PostDto } from "@/entities/post";
import { PostDetailResult, PostListResult } from "../types";

export interface PostUseCase {
  getAllPosts: (limit?: number, skip?: number) => Promise<PostListResult>;
  searchPosts: (
    limit?: number,
    skip?: number,
    searchQuery?: string
  ) => Promise<PostListResult>;
  getPostById: (id: string) => Promise<PostDetailResult>;
  addPost: (
    title: string,
    body: string,
    userId: string,
    image?: string
  ) => Promise<PostDto>;

  updatePost: (id: string, title: string, body: string) => Promise<PostDto>;
  deletePost: (id: string) => Promise<boolean>;

  likePost: (id: string, userId: string) => Promise<boolean>;
  unlikePost: (id: string, userId: string) => Promise<boolean>;
}
