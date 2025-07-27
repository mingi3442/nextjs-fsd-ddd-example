/**
 * Post 엔티티 테스트 유틸리티 통합 내보내기
 */

// Fixtures
export {
  PostFixtures,
  createMultiplePostFixtures,
  createPostFixture,
  createPostsForUser,
  createRandomPostFixture,
} from "./fixtures/post.fixtures";

// Repository Mocks
export { PostRepositoryMocks } from "./mocks/post-repository.mock";

export type { MockPostRepository } from "./mocks/post-repository.mock";

// API Mocks
export { PostApiMocks } from "./mocks/post-api.mock";
