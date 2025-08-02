import {
  ErrorMessages,
  HttpMocks,
  HttpStatus,
} from "@/shared/libs/__tests__/mocks/api.mock";
import { CommentEntity } from "../../types";

export const CommentApiMocks = {
  getComment: (comment: CommentEntity) => HttpMocks.get(comment),

  getComments: (comments: CommentEntity[]) => HttpMocks.get(comments),

  createComment: (comment: CommentEntity) =>
    HttpMocks.post(comment, HttpStatus.CREATED),

  updateComment: (comment: CommentEntity) => HttpMocks.put(comment),

  deleteComment: () => HttpMocks.delete(),
  getCommentsByPost: (comments: CommentEntity[]) => HttpMocks.get(comments),

  getCommentsByUser: (comments: CommentEntity[]) => HttpMocks.get(comments),

  getCommentCount: (count: number) => HttpMocks.get({ count }),

  likeComment: (comment: CommentEntity) =>
    HttpMocks.put({ ...comment, likes: comment.likes + 1 }),

  unlikeComment: (comment: CommentEntity) =>
    HttpMocks.put({ ...comment, likes: Math.max(0, comment.likes - 1) }),

  errors: {
    notFound: () =>
      HttpMocks.error(ErrorMessages.NOT_FOUND, HttpStatus.NOT_FOUND),

    unauthorized: () =>
      HttpMocks.error(ErrorMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED),

    forbidden: () =>
      HttpMocks.error(ErrorMessages.FORBIDDEN, HttpStatus.FORBIDDEN),

    badRequest: () =>
      HttpMocks.error(ErrorMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST),

    validation: () =>
      HttpMocks.error("Invalid comment data", HttpStatus.UNPROCESSABLE_ENTITY),

    tooLong: () =>
      HttpMocks.error("Comment too long", HttpStatus.UNPROCESSABLE_ENTITY),

    empty: () =>
      HttpMocks.error(
        "Comment cannot be empty",
        HttpStatus.UNPROCESSABLE_ENTITY
      ),

    serverError: () =>
      HttpMocks.error(
        ErrorMessages.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      ),

    networkError: () => HttpMocks.networkError(),

    timeout: () => HttpMocks.timeoutError(),
  },
};
