import { MockRepository, RepositoryMockFactory } from "@/shared/libs/__tests__";
import { vi } from "vitest";
import { CommentEntity } from "../../types";

/**
 * Comment Repository 모킹
 */
export interface MockCommentRepository extends MockRepository<CommentEntity> {
  findByPostId: ReturnType<typeof vi.fn>;
  findByUserId: ReturnType<typeof vi.fn>;
  countByPostId: ReturnType<typeof vi.fn>;
  incrementLikes: ReturnType<typeof vi.fn>;
  decrementLikes: ReturnType<typeof vi.fn>;
}

export const CommentRepositoryMocks = {
  /**
   * 기본 Comment Repository 모킹 생성
   */
  create: (): MockCommentRepository => ({
    ...RepositoryMockFactory.createBasicMock<CommentEntity>(),
    findByPostId: vi.fn(),
    findByUserId: vi.fn(),
    countByPostId: vi.fn(),
    incrementLikes: vi.fn(),
    decrementLikes: vi.fn(),
  }),

  /**
   * 성공 시나리오 Comment Repository 모킹
   */
  createSuccess: (
    mockComment: CommentEntity,
    mockComments: CommentEntity[] = []
  ): MockCommentRepository => ({
    ...RepositoryMockFactory.createSuccessMock(mockComment, mockComments),
    findByPostId: vi.fn().mockResolvedValue(mockComments),
    findByUserId: vi.fn().mockResolvedValue(mockComments),
    countByPostId: vi.fn().mockResolvedValue(mockComments.length),
    incrementLikes: vi
      .fn()
      .mockResolvedValue({ ...mockComment, likes: mockComment.likes + 1 }),
    decrementLikes: vi.fn().mockResolvedValue({
      ...mockComment,
      likes: Math.max(0, mockComment.likes - 1),
    }),
  }),

  /**
   * 댓글 없음 시나리오 모킹
   */
  createNotFound: (): MockCommentRepository => ({
    ...RepositoryMockFactory.createNotFoundMock<CommentEntity>(),
    findByPostId: vi.fn().mockResolvedValue([]),
    findByUserId: vi.fn().mockResolvedValue([]),
    countByPostId: vi.fn().mockResolvedValue(0),
    incrementLikes: vi.fn().mockRejectedValue(new Error("Comment not found")),
    decrementLikes: vi.fn().mockRejectedValue(new Error("Comment not found")),
  }),

  /**
   * 에러 시나리오 Comment Repository 모킹
   */
  createError: (
    error: Error = new Error("Comment Repository Error")
  ): MockCommentRepository => ({
    ...RepositoryMockFactory.createErrorMock<CommentEntity>(error),
    findByPostId: vi.fn().mockRejectedValue(error),
    findByUserId: vi.fn().mockRejectedValue(error),
    countByPostId: vi.fn().mockRejectedValue(error),
    incrementLikes: vi.fn().mockRejectedValue(error),
    decrementLikes: vi.fn().mockRejectedValue(error),
  }),

  /**
   * 좋아요 기능 특화 모킹
   */
  createLikeScenario: (mockComment: CommentEntity): MockCommentRepository => ({
    ...RepositoryMockFactory.createBasicMock<CommentEntity>(),
    findById: vi.fn().mockResolvedValue(mockComment),
    findAll: vi.fn().mockResolvedValue([mockComment]),
    findByPostId: vi.fn().mockResolvedValue([mockComment]),
    findByUserId: vi.fn().mockResolvedValue([mockComment]),
    countByPostId: vi.fn().mockResolvedValue(1),
    incrementLikes: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockComment.id) {
        return { ...mockComment, likes: mockComment.likes + 1 };
      }
      throw new Error("Comment not found");
    }),
    decrementLikes: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockComment.id) {
        return { ...mockComment, likes: Math.max(0, mockComment.likes - 1) };
      }
      throw new Error("Comment not found");
    }),
    save: vi.fn().mockResolvedValue(mockComment),
    update: vi.fn().mockResolvedValue(mockComment),
    delete: vi.fn().mockResolvedValue(undefined),
  }),

  /**
   * 게시글별 댓글 조회 특화 모킹
   */
  createPostCommentsScenario: (
    postId: string,
    mockComments: CommentEntity[]
  ): MockCommentRepository => ({
    ...RepositoryMockFactory.createBasicMock<CommentEntity>(),
    findById: vi.fn().mockImplementation(async (id: string) => {
      return mockComments.find((comment) => comment.id === id) || null;
    }),
    findAll: vi.fn().mockResolvedValue(mockComments),
    findByPostId: vi.fn().mockImplementation(async (id: string) => {
      return id === postId ? mockComments : [];
    }),
    findByUserId: vi.fn().mockResolvedValue([]),
    countByPostId: vi.fn().mockImplementation(async (id: string) => {
      return id === postId ? mockComments.length : 0;
    }),
    incrementLikes: vi.fn(),
    decrementLikes: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }),
};
