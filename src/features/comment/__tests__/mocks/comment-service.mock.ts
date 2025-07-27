import { CommentEntity } from "@/entities/comment/types";
import { MockService, ServiceMockFactory } from "@/shared/libs/__tests__";
import { vi } from "vitest";

/**
 * Comment Service 모킹
 */
export interface MockCommentService extends MockService<CommentEntity> {
  getCommentsByPost: ReturnType<typeof vi.fn>;
  getCommentsByUser: ReturnType<typeof vi.fn>;
  likeComment: ReturnType<typeof vi.fn>;
  unlikeComment: ReturnType<typeof vi.fn>;
  updateCommentBody: ReturnType<typeof vi.fn>;
  getCommentCount: ReturnType<typeof vi.fn>;
}

export const CommentServiceMocks = {
  /**
   * 기본 Comment Service 모킹 생성
   */
  create: (): MockCommentService => ({
    ...ServiceMockFactory.createBasicMock<CommentEntity>(),
    getCommentsByPost: vi.fn(),
    getCommentsByUser: vi.fn(),
    likeComment: vi.fn(),
    unlikeComment: vi.fn(),
    updateCommentBody: vi.fn(),
    getCommentCount: vi.fn(),
  }),

  /**
   * 성공 시나리오 Comment Service 모킹
   */
  createSuccess: (
    mockComment: CommentEntity,
    mockComments: CommentEntity[] = []
  ): MockCommentService => ({
    ...ServiceMockFactory.createSuccessMock(mockComment, mockComments),
    getCommentsByPost: vi.fn().mockResolvedValue(mockComments),
    getCommentsByUser: vi.fn().mockResolvedValue(mockComments),
    likeComment: vi
      .fn()
      .mockResolvedValue({ ...mockComment, likes: mockComment.likes + 1 }),
    unlikeComment: vi.fn().mockResolvedValue({
      ...mockComment,
      likes: Math.max(0, mockComment.likes - 1),
    }),
    updateCommentBody: vi.fn().mockResolvedValue(mockComment),
    getCommentCount: vi.fn().mockResolvedValue(mockComments.length),
  }),

  /**
   * 댓글 없음 시나리오 모킹
   */
  createNotFound: (): MockCommentService => ({
    ...ServiceMockFactory.createNotFoundMock<CommentEntity>(),
    getCommentsByPost: vi.fn().mockResolvedValue([]),
    getCommentsByUser: vi.fn().mockResolvedValue([]),
    getCommentCount: vi.fn().mockResolvedValue(0),
    likeComment: vi.fn().mockRejectedValue(new Error("Comment not found")),
    unlikeComment: vi.fn().mockRejectedValue(new Error("Comment not found")),
    updateCommentBody: vi
      .fn()
      .mockRejectedValue(new Error("Comment not found")),
  }),

  /**
   * 에러 시나리오 Comment Service 모킹
   */
  createError: (
    error: Error = new Error("Comment Service Error")
  ): MockCommentService => ({
    ...ServiceMockFactory.createErrorMock<CommentEntity>(error),
    getCommentsByPost: vi.fn().mockRejectedValue(error),
    getCommentsByUser: vi.fn().mockRejectedValue(error),
    likeComment: vi.fn().mockRejectedValue(error),
    unlikeComment: vi.fn().mockRejectedValue(error),
    updateCommentBody: vi.fn().mockRejectedValue(error),
    getCommentCount: vi.fn().mockRejectedValue(error),
  }),

  /**
   * 좋아요 기능 특화 모킹
   */
  createLikeScenario: (mockComment: CommentEntity): MockCommentService => ({
    ...ServiceMockFactory.createBasicMock<CommentEntity>(),
    create: vi.fn().mockResolvedValue(mockComment),
    getById: vi.fn().mockResolvedValue(mockComment),
    getAll: vi.fn().mockResolvedValue([mockComment]),
    update: vi.fn().mockResolvedValue(mockComment),
    delete: vi.fn().mockResolvedValue(undefined),
    getCommentsByPost: vi.fn().mockResolvedValue([mockComment]),
    getCommentsByUser: vi.fn().mockResolvedValue([mockComment]),
    getCommentCount: vi.fn().mockResolvedValue(1),
    updateCommentBody: vi.fn().mockResolvedValue(mockComment),
    likeComment: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockComment.id) {
        return { ...mockComment, likes: mockComment.likes + 1 };
      }
      throw new Error("Comment not found");
    }),
    unlikeComment: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockComment.id) {
        return { ...mockComment, likes: Math.max(0, mockComment.likes - 1) };
      }
      throw new Error("Comment not found");
    }),
  }),

  /**
   * 게시글별 댓글 조회 특화 모킹
   */
  createPostCommentsScenario: (
    postId: string,
    postComments: CommentEntity[]
  ): MockCommentService => ({
    ...ServiceMockFactory.createBasicMock<CommentEntity>(),
    create: vi.fn(),
    getById: vi.fn(),
    getAll: vi.fn().mockResolvedValue(postComments),
    update: vi.fn(),
    delete: vi.fn(),
    getCommentsByPost: vi.fn().mockImplementation(async (id: string) => {
      return id === postId ? postComments : [];
    }),
    getCommentsByUser: vi.fn().mockResolvedValue([]),
    getCommentCount: vi.fn().mockImplementation(async (id: string) => {
      return id === postId ? postComments.length : 0;
    }),
    likeComment: vi.fn(),
    unlikeComment: vi.fn(),
    updateCommentBody: vi.fn(),
  }),

  /**
   * 사용자별 댓글 조회 특화 모킹
   */
  createUserCommentsScenario: (
    userId: string,
    userComments: CommentEntity[]
  ): MockCommentService => ({
    ...ServiceMockFactory.createBasicMock<CommentEntity>(),
    create: vi.fn(),
    getById: vi.fn(),
    getAll: vi.fn().mockResolvedValue(userComments),
    update: vi.fn(),
    delete: vi.fn(),
    getCommentsByPost: vi.fn().mockResolvedValue([]),
    getCommentsByUser: vi.fn().mockImplementation(async (id: string) => {
      return id === userId ? userComments : [];
    }),
    getCommentCount: vi.fn().mockResolvedValue(0),
    likeComment: vi.fn(),
    unlikeComment: vi.fn(),
    updateCommentBody: vi.fn(),
  }),

  /**
   * 댓글 수정 특화 모킹
   */
  createUpdateScenario: (mockComment: CommentEntity): MockCommentService => ({
    ...ServiceMockFactory.createBasicMock<CommentEntity>(),
    create: vi.fn().mockResolvedValue(mockComment),
    getById: vi.fn().mockResolvedValue(mockComment),
    getAll: vi.fn().mockResolvedValue([mockComment]),
    update: vi.fn().mockResolvedValue(mockComment),
    delete: vi.fn().mockResolvedValue(undefined),
    getCommentsByPost: vi.fn().mockResolvedValue([mockComment]),
    getCommentsByUser: vi.fn().mockResolvedValue([mockComment]),
    getCommentCount: vi.fn().mockResolvedValue(1),
    likeComment: vi.fn().mockResolvedValue(mockComment),
    unlikeComment: vi.fn().mockResolvedValue(mockComment),
    updateCommentBody: vi
      .fn()
      .mockImplementation(async (id: string, body: string) => {
        if (id === mockComment.id) {
          return { ...mockComment, body, updatedAt: Date.now() };
        }
        throw new Error("Comment not found");
      }),
  }),
};
