import { PostEntity } from "@/entities/post/types";
import { MockService, ServiceMockFactory } from "@/shared/libs/__tests__";
import { vi } from "vitest";

/**
 * Post Service 모킹
 */
export interface MockPostService extends MockService<PostEntity> {
  getPostsByUser: ReturnType<typeof vi.fn>;
  getPopularPosts: ReturnType<typeof vi.fn>;
  likePost: ReturnType<typeof vi.fn>;
  unlikePost: ReturnType<typeof vi.fn>;
  updatePostTitle: ReturnType<typeof vi.fn>;
  updatePostBody: ReturnType<typeof vi.fn>;
  searchPosts: ReturnType<typeof vi.fn>;
}

export const PostServiceMocks = {
  /**
   * 기본 Post Service 모킹 생성
   */
  create: (): MockPostService => ({
    ...ServiceMockFactory.createBasicMock<PostEntity>(),
    getPostsByUser: vi.fn(),
    getPopularPosts: vi.fn(),
    likePost: vi.fn(),
    unlikePost: vi.fn(),
    updatePostTitle: vi.fn(),
    updatePostBody: vi.fn(),
    searchPosts: vi.fn(),
  }),

  /**
   * 성공 시나리오 Post Service 모킹
   */
  createSuccess: (
    mockPost: PostEntity,
    mockPosts: PostEntity[] = []
  ): MockPostService => ({
    ...ServiceMockFactory.createSuccessMock(mockPost, mockPosts),
    getPostsByUser: vi.fn().mockResolvedValue(mockPosts),
    getPopularPosts: vi.fn().mockResolvedValue(mockPosts),
    likePost: vi
      .fn()
      .mockResolvedValue({ ...mockPost, likes: mockPost.likes + 1 }),
    unlikePost: vi.fn().mockResolvedValue({
      ...mockPost,
      likes: Math.max(0, mockPost.likes - 1),
    }),
    updatePostTitle: vi.fn().mockResolvedValue(mockPost),
    updatePostBody: vi.fn().mockResolvedValue(mockPost),
    searchPosts: vi.fn().mockResolvedValue(mockPosts),
  }),

  /**
   * 게시글 없음 시나리오 모킹
   */
  createNotFound: (): MockPostService => ({
    ...ServiceMockFactory.createNotFoundMock<PostEntity>(),
    getPostsByUser: vi.fn().mockResolvedValue([]),
    getPopularPosts: vi.fn().mockResolvedValue([]),
    searchPosts: vi.fn().mockResolvedValue([]),
    likePost: vi.fn().mockRejectedValue(new Error("Post not found")),
    unlikePost: vi.fn().mockRejectedValue(new Error("Post not found")),
    updatePostTitle: vi.fn().mockRejectedValue(new Error("Post not found")),
    updatePostBody: vi.fn().mockRejectedValue(new Error("Post not found")),
  }),

  /**
   * 에러 시나리오 Post Service 모킹
   */
  createError: (
    error: Error = new Error("Post Service Error")
  ): MockPostService => ({
    ...ServiceMockFactory.createErrorMock<PostEntity>(error),
    getPostsByUser: vi.fn().mockRejectedValue(error),
    getPopularPosts: vi.fn().mockRejectedValue(error),
    likePost: vi.fn().mockRejectedValue(error),
    unlikePost: vi.fn().mockRejectedValue(error),
    updatePostTitle: vi.fn().mockRejectedValue(error),
    updatePostBody: vi.fn().mockRejectedValue(error),
    searchPosts: vi.fn().mockRejectedValue(error),
  }),

  /**
   * 좋아요 기능 특화 모킹
   */
  createLikeScenario: (mockPost: PostEntity): MockPostService => ({
    ...ServiceMockFactory.createBasicMock<PostEntity>(),
    create: vi.fn().mockResolvedValue(mockPost),
    getById: vi.fn().mockResolvedValue(mockPost),
    getAll: vi.fn().mockResolvedValue([mockPost]),
    update: vi.fn().mockResolvedValue(mockPost),
    delete: vi.fn().mockResolvedValue(undefined),
    getPostsByUser: vi.fn().mockResolvedValue([mockPost]),
    getPopularPosts: vi.fn().mockResolvedValue([mockPost]),
    searchPosts: vi.fn().mockResolvedValue([mockPost]),
    updatePostTitle: vi.fn().mockResolvedValue(mockPost),
    updatePostBody: vi.fn().mockResolvedValue(mockPost),
    likePost: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockPost.id) {
        return { ...mockPost, likes: mockPost.likes + 1 };
      }
      throw new Error("Post not found");
    }),
    unlikePost: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockPost.id) {
        return { ...mockPost, likes: Math.max(0, mockPost.likes - 1) };
      }
      throw new Error("Post not found");
    }),
  }),

  /**
   * 검색 기능 특화 모킹
   */
  createSearchScenario: (allPosts: PostEntity[]): MockPostService => ({
    ...ServiceMockFactory.createBasicMock<PostEntity>(),
    create: vi.fn(),
    getById: vi.fn(),
    getAll: vi.fn().mockResolvedValue(allPosts),
    update: vi.fn(),
    delete: vi.fn(),
    getPostsByUser: vi.fn().mockImplementation(async (userId: string) => {
      return allPosts.filter((post) => post.user.id === userId);
    }),
    getPopularPosts: vi.fn().mockImplementation(async () => {
      return allPosts.sort((a, b) => b.likes - a.likes).slice(0, 10);
    }),
    searchPosts: vi.fn().mockImplementation(async (query: string) => {
      return allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
    }),
    likePost: vi.fn(),
    unlikePost: vi.fn(),
    updatePostTitle: vi.fn(),
    updatePostBody: vi.fn(),
  }),

  /**
   * 사용자별 게시글 조회 특화 모킹
   */
  createUserPostsScenario: (
    userId: string,
    userPosts: PostEntity[]
  ): MockPostService => ({
    ...ServiceMockFactory.createBasicMock<PostEntity>(),
    create: vi.fn(),
    getById: vi.fn(),
    getAll: vi.fn().mockResolvedValue(userPosts),
    update: vi.fn(),
    delete: vi.fn(),
    getPostsByUser: vi.fn().mockImplementation(async (id: string) => {
      return id === userId ? userPosts : [];
    }),
    getPopularPosts: vi.fn().mockResolvedValue([]),
    searchPosts: vi.fn().mockResolvedValue([]),
    likePost: vi.fn(),
    unlikePost: vi.fn(),
    updatePostTitle: vi.fn(),
    updatePostBody: vi.fn(),
  }),
};
