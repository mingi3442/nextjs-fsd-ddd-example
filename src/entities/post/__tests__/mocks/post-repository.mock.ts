import { MockRepository, RepositoryMockFactory } from "@/shared/libs/__tests__";
import { PostEntity } from "../../types";

export interface MockPostRepository extends MockRepository<PostEntity> {
  getAll: ReturnType<typeof vi.fn>;
  getById: ReturnType<typeof vi.fn>;
  search: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
  like: ReturnType<typeof vi.fn>;
  unlike: ReturnType<typeof vi.fn>;
  findByUserId: ReturnType<typeof vi.fn>;
  findByTitle: ReturnType<typeof vi.fn>;
  findPopular: ReturnType<typeof vi.fn>;
  incrementLikes: ReturnType<typeof vi.fn>;
  decrementLikes: ReturnType<typeof vi.fn>;
}

export const PostRepositoryMocks = {
  create: (): MockPostRepository => ({
    ...RepositoryMockFactory.createBasicMock<PostEntity>(),
    getAll: vi.fn(),
    getById: vi.fn(),
    search: vi.fn(),
    create: vi.fn(),
    like: vi.fn(),
    unlike: vi.fn(),
    findByUserId: vi.fn(),
    findByTitle: vi.fn(),
    findPopular: vi.fn(),
    incrementLikes: vi.fn(),
    decrementLikes: vi.fn(),
  }),

  createSuccess: (
    mockPost: PostEntity,
    mockPosts: PostEntity[] = []
  ): MockPostRepository => ({
    ...RepositoryMockFactory.createSuccessMock(mockPost, mockPosts),
    getAll: vi.fn().mockResolvedValue(mockPosts),
    getById: vi.fn().mockResolvedValue(mockPost),
    search: vi.fn().mockResolvedValue(mockPosts),
    create: vi.fn().mockResolvedValue(mockPost),
    like: vi.fn().mockResolvedValue(true),
    unlike: vi.fn().mockResolvedValue(true),
    findByUserId: vi.fn().mockResolvedValue(mockPosts),
    findByTitle: vi.fn().mockResolvedValue(mockPosts),
    findPopular: vi.fn().mockResolvedValue(mockPosts),
    incrementLikes: vi
      .fn()
      .mockResolvedValue({ ...mockPost, likes: mockPost.likes + 1 }),
    decrementLikes: vi.fn().mockResolvedValue({
      ...mockPost,
      likes: Math.max(0, mockPost.likes - 1),
    }),
  }),

  createNotFound: (): MockPostRepository => ({
    ...RepositoryMockFactory.createNotFoundMock<PostEntity>(),
    getAll: vi.fn().mockResolvedValue([]),
    getById: vi.fn().mockResolvedValue(null),
    search: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue(null),
    like: vi.fn().mockRejectedValue(new Error("Post not found")),
    unlike: vi.fn().mockRejectedValue(new Error("Post not found")),
    findByUserId: vi.fn().mockResolvedValue([]),
    findByTitle: vi.fn().mockResolvedValue([]),
    findPopular: vi.fn().mockResolvedValue([]),
    incrementLikes: vi.fn().mockRejectedValue(new Error("Post not found")),
    decrementLikes: vi.fn().mockRejectedValue(new Error("Post not found")),
  }),

  createError: (
    error: Error = new Error("Post Repository Error")
  ): MockPostRepository => ({
    ...RepositoryMockFactory.createErrorMock<PostEntity>(error),
    getAll: vi.fn().mockRejectedValue(error),
    getById: vi.fn().mockRejectedValue(error),
    search: vi.fn().mockRejectedValue(error),
    create: vi.fn().mockRejectedValue(error),
    like: vi.fn().mockRejectedValue(error),
    unlike: vi.fn().mockRejectedValue(error),
    findByUserId: vi.fn().mockRejectedValue(error),
    findByTitle: vi.fn().mockRejectedValue(error),
    findPopular: vi.fn().mockRejectedValue(error),
    incrementLikes: vi.fn().mockRejectedValue(error),
    decrementLikes: vi.fn().mockRejectedValue(error),
  }),

  createLikeScenario: (mockPost: PostEntity): MockPostRepository => ({
    ...RepositoryMockFactory.createBasicMock<PostEntity>(),
    getAll: vi.fn().mockResolvedValue([mockPost]),
    getById: vi.fn().mockResolvedValue(mockPost),
    search: vi.fn().mockResolvedValue([mockPost]),
    create: vi.fn().mockResolvedValue(mockPost),
    like: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockPost.id) {
        return true;
      }
      throw new Error("Post not found");
    }),
    unlike: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockPost.id) {
        return true;
      }
      throw new Error("Post not found");
    }),
    findById: vi.fn().mockResolvedValue(mockPost),
    findAll: vi.fn().mockResolvedValue([mockPost]),
    findByUserId: vi.fn().mockResolvedValue([mockPost]),
    findByTitle: vi.fn().mockResolvedValue([mockPost]),
    findPopular: vi.fn().mockResolvedValue([mockPost]),
    incrementLikes: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockPost.id) {
        return { ...mockPost, likes: mockPost.likes + 1 };
      }
      throw new Error("Post not found");
    }),
    decrementLikes: vi.fn().mockImplementation(async (id: string) => {
      if (id === mockPost.id) {
        return { ...mockPost, likes: Math.max(0, mockPost.likes - 1) };
      }
      throw new Error("Post not found");
    }),
    save: vi.fn().mockResolvedValue(mockPost),
    update: vi.fn().mockResolvedValue(mockPost),
    delete: vi.fn().mockResolvedValue(undefined),
  }),
};
