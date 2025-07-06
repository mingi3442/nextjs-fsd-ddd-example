import { CommentDto } from "@/entities/comment/infrastructure/dto";
import { PostDto } from "@/entities/post/infrastructure/dto";
import { Pagination } from "@/shared/types";

export type PostListResult = Pagination<PostDto>;

export type PostDetailResult = PostDto & {
  comments: CommentDto[];
};
