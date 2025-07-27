import {
  ErrorMessages,
  HttpMocks,
  HttpStatus,
} from "@/shared/libs/__tests__/mocks/api.mock";
import { CommentEntity } from "../../types";

/**
 * Comment API 모킹 유틸리티
 */
export const CommentApiMocks = {
  /**
   * 댓글 조회 API 모킹
   */
  getComment: (comment: CommentEntity) => HttpMocks.get(comment),

  /**
   * 댓글 목록 조회 API 모킹
   */
  getComments: (comments: CommentEntity[]) => HttpMocks.get(comments),

  /**
   * 댓글 생성 API 모킹
   */
  createComment: (comment: CommentEntity) =>
    HttpMocks.post(comment, HttpStatus.CREATED),

  /**
   * 댓글 수정 API 모킹
   */
  updateComment: (comment: CommentEntity) => HttpMocks.put(comment),

  /**
   * 댓글 삭제 API 모킹
   */
  deleteComment: () => HttpMocks.delete(),

  /**
   * 게시글별 댓글 조회 API 모킹
   */
  getCommentsByPost: (comments: CommentEntity[]) => HttpMocks.get(comments),

  /**
   * 사용자별 댓글 조회 API 모킹
   */
  getCommentsByUser: (comments: CommentEntity[]) => HttpMocks.get(comments),

  /**
   * 댓글 수 조회 API 모킹
   */
  getCommentCount: (count: number) => HttpMocks.get({ count }),

  /**
   * 댓글 좋아요 API 모킹
   */
  likeComment: (comment: CommentEntity) =>
    HttpMocks.put({ ...comment, likes: comment.likes + 1 }),

  /**
   * 댓글 좋아요 취소 API 모킹
   */
  unlikeComment: (comment: CommentEntity) =>
    HttpMocks.put({ ...comment, likes: Math.max(0, comment.likes - 1) }),

  /**
   * 에러 시나리오 모킹
   */
  errors: {
    /**
     * 댓글 없음 에러
     */
    notFound: () =>
      HttpMocks.error(ErrorMessages.NOT_FOUND, HttpStatus.NOT_FOUND),

    /**
     * 인증 에러
     */
    unauthorized: () =>
      HttpMocks.error(ErrorMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED),

    /**
     * 권한 에러 (작성자가 아닌 경우)
     */
    forbidden: () =>
      HttpMocks.error(ErrorMessages.FORBIDDEN, HttpStatus.FORBIDDEN),

    /**
     * 잘못된 요청 에러
     */
    badRequest: () =>
      HttpMocks.error(ErrorMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST),

    /**
     * 유효성 검증 에러
     */
    validation: () =>
      HttpMocks.error("Invalid comment data", HttpStatus.UNPROCESSABLE_ENTITY),

    /**
     * 댓글 길이 초과 에러
     */
    tooLong: () =>
      HttpMocks.error("Comment too long", HttpStatus.UNPROCESSABLE_ENTITY),

    /**
     * 빈 댓글 에러
     */
    empty: () =>
      HttpMocks.error(
        "Comment cannot be empty",
        HttpStatus.UNPROCESSABLE_ENTITY
      ),

    /**
     * 서버 에러
     */
    serverError: () =>
      HttpMocks.error(
        ErrorMessages.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      ),

    /**
     * 네트워크 에러
     */
    networkError: () => HttpMocks.networkError(),

    /**
     * 타임아웃 에러
     */
    timeout: () => HttpMocks.timeoutError(),
  },
};
