import { CommentEntity } from "@/entities/comment/types";
import { MockService, ServiceMockFactory } from "@/shared/libs/__tests__";
import { vi } from "vitest";

export interface MockCommentService extends MockService<CommentEntity> {
  getCommentsByPost: ReturnType<typeof vi.fn>;
  likeComment: ReturnType<typeof vi.fn>;
  unlikeComment: ReturnType<typeof vi.fn>;
}

export const CommentServiceMocks = {
  create: (): MockCommentService => ({
    ...ServiceMockFactory.createBasicMock<CommentEntity>(),
    getCommentsByPost: vi.fn(),
    likeComment: vi.fn(),
    unlikeComment: vi.fn(),
  }),

  createSuccess: (
    mockComment: CommentEntity,
    mockComments: CommentEntity[] = []
  ): MockCommentService => ({
    ...ServiceMockFactory.createSuccessMock(mockComment, mockComments),
    getCommentsByPost: vi.fn().mockResolvedValue(mockComments),
    likeComment: vi.fn().mockResolvedValue(mockComment),
    unlikeComment: vi.fn().mockResolvedValue(mockComment),
  }),

  createError: (
    error: Error = new Error("Comment Service Error")
  ): MockCommentService => ({
    ...ServiceMockFactory.createErrorMock<CommentEntity>(error),
    getCommentsByPost: vi.fn().mockRejectedValue(error),
    likeComment: vi.fn().mockRejectedValue(error),
    unlikeComment: vi.fn().mockRejectedValue(error),
  }),
};
