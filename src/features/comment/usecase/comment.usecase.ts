import { CommentDto } from "@/entities/comment/infrastructure/dto";

export interface CommentUseCase {
  getAllComments: (postId: string) => Promise<CommentDto[]>;
  getCommentById: (id: string) => Promise<CommentDto>;
  addComment: (
    body: string,
    postId: string,
    userId: string
  ) => Promise<CommentDto>;
  updateComment: (
    id: string,
    body: string,
    userId: string
  ) => Promise<CommentDto>;
  deleteComment: (id: string, userId: string) => Promise<boolean>;
  likeComment: (id: string, userId: string) => Promise<boolean>;
  unlikeComment: (id: string, userId: string) => Promise<boolean>;
}
