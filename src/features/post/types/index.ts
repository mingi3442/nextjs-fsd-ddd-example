import { CommentDto } from "@/entities/comment";
import { PostDto } from "@/entities/post";
import { Pagination } from "@/shared/types";

export type PostListResult = Pagination<PostDto>;

export type PostDetailResult = PostDto & {
  comments: CommentDto[];
};
export interface GetPostsOptions {
  limit?: number;
  skip?: number;
  query?: string;
}
