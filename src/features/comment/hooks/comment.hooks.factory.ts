import { CommentUseCase } from "../usecase/comment.usecase";
import { createUseGetCommentsByPostId } from "./useGetCommentsByPostId";

export const createCommentHooks = (commentUseCase: CommentUseCase) => {
  return {
    useGetCommentsByPostId: createUseGetCommentsByPostId(commentUseCase),
  };
};
