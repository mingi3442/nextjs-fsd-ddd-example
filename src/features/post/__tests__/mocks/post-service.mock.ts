import { PostEntity } from "@/entities/post/types";
import { MockService, ServiceMockFactory } from "@/shared/libs/__tests__";
import { vi } from "vitest";

export interface MockPostService extends MockService<PostEntity> {
  likePost: ReturnType<typeof vi.fn>;
  unlikePost: ReturnType<typeof vi.fn>;
  searchPosts: ReturnType<typeof vi.fn>;
}

export const PostServiceMocks = {
  create: (): MockPostService => ({
    ...ServiceMockFactory.createBasicMock<PostEntity>(),
    likePost: vi.fn(),
    unlikePost: vi.fn(),
    searchPosts: vi.fn(),
  }),

  createSuccess: (
    mockPost: PostEntity,
    mockPosts: PostEntity[] = []
  ): MockPostService => ({
    ...ServiceMockFactory.createSuccessMock(mockPost, mockPosts),
    likePost: vi.fn().mockResolvedValue(mockPost),
    unlikePost: vi.fn().mockResolvedValue(mockPost),
    searchPosts: vi.fn().mockResolvedValue(mockPosts),
  }),

  createError: (
    error: Error = new Error("Post Service Error")
  ): MockPostService => ({
    ...ServiceMockFactory.createErrorMock<PostEntity>(error),
    likePost: vi.fn().mockRejectedValue(error),
    unlikePost: vi.fn().mockRejectedValue(error),
    searchPosts: vi.fn().mockRejectedValue(error),
  }),
};
