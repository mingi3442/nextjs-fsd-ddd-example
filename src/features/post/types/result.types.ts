import { CommentDto } from "@/entities/comment/dto";
import { PostDto } from "@/entities/post/dto";
import { Pagination } from "@/shared/types";

export type PostListResult = Pagination<PostDto>;

export type PostDetailResult = PostDto & {
  comments: CommentDto[];
};
