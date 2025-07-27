/**
 * Comment 엔티티 테스트 유틸리티 통합 내보내기
 */

// Fixtures
export {
  CommentFixtures,
  createCommentFixture,
  createCommentsForPost,
  createCommentsForUser,
  createMultipleCommentFixtures,
  createRandomCommentFixture,
} from "./fixtures/comment.fixtures";

// Repository Mocks
export { CommentRepositoryMocks } from "./mocks/comment-repository.mock";

export type { MockCommentRepository } from "./mocks/comment-repository.mock";

// API Mocks
export { CommentApiMocks } from "./mocks/comment-api.mock";
