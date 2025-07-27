import { ErrorMessages, HttpMocks, HttpStatus } from "@/shared/libs/__tests__";
import { PostEntity } from "../../types";

/**
 * Post API 모킹 유틸리티
 */
export const PostApiMocks = {
  /**
   * 게시글 조회 API 모킹
   */
  getPost: (post: PostEntity) => HttpMocks.get(post),

  /**
   * 게시글 목록 조회 API 모킹
   */
  getPosts: (posts: PostEntity[]) => HttpMocks.get(posts),

  /**
   * 게시글 생성 API 모킹
   */
  createPost: (post: PostEntity) => HttpMocks.post(post, HttpStatus.CREATED),

  /**
   * 게시글 수정 API 모킹
   */
  updatePost: (post: PostEntity) => HttpMocks.put(post),

  /**
   * 게시글 삭제 API 모킹
   */
  deletePost: () => HttpMocks.delete(),

  /**
   * 사용자별 게시글 조회 API 모킹
   */
  getPostsByUser: (posts: PostEntity[]) => HttpMocks.get(posts),

  /**
   * 인기 게시글 조회 API 모킹
   */
  getPopularPosts: (posts: PostEntity[]) => HttpMocks.get(posts),

  /**
   * 게시글 검색 API 모킹
   */
  searchPosts: (posts: PostEntity[]) => HttpMocks.get(posts),

  /**
   * 게시글 좋아요 API 모킹
   */
  likePost: (post: PostEntity) =>
    HttpMocks.put({ ...post, likes: post.likes + 1 }),

  /**
   * 게시글 좋아요 취소 API 모킹
   */
  unlikePost: (post: PostEntity) =>
    HttpMocks.put({ ...post, likes: Math.max(0, post.likes - 1) }),

  /**
   * 에러 시나리오 모킹
   */
  errors: {
    /**
     * 게시글 없음 에러
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
      HttpMocks.error("Invalid post data", HttpStatus.UNPROCESSABLE_ENTITY),

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
