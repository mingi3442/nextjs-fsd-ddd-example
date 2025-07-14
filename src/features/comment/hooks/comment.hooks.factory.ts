import { CommentUseCase } from "../usecase/comment.usecase";
import { createUseGetCommentsByPostId } from "./useGetCommentsByPostId";

export const createCommentHooks = (commentUseCase: CommentUseCase) => ({
  useGetCommentsByPostId: createUseGetCommentsByPostId(commentUseCase),
});
