import { MockRepository, RepositoryMockFactory } from "@/shared/libs/__tests__";
import { CommentEntity } from "../../types";

export interface MockCommentRepository extends MockRepository<CommentEntity> {
  getByPostId: ReturnType<typeof vi.fn>;
  getById: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
  like: ReturnType<typeof vi.fn>;
  unlike: ReturnType<typeof vi.fn>;
  findByPostId: ReturnType<typeof vi.fn>;
  findByUserId: ReturnType<typeof vi.fn>;
  countByPostId: ReturnType<typeof vi.fn>;
  incrementLikes: ReturnType<typeof vi.fn>;
  decrementLikes: ReturnType<typeof vi.fn>;
}

export const CommentRepositoryMocks = {
  create: (): MockCommentRepository => ({
    ...RepositoryMockFactory.createBasicMock<CommentEntity>(),
    getByPostId: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    like: vi.fn(),
    unlike: vi.fn(),
    findByPostId: vi.fn(),
    findByUserId: vi.fn(),
    countByPostId: vi.fn(),
    incrementLikes: vi.fn(),
    decrementLikes: vi.fn(),
  }),

  createSuccess: (
    mockComment: CommentEntity,
    mockComments: CommentEntity[] = []
  ): MockCommentRepository => ({
    ...RepositoryMockFactory.createSuccessMock(mockComment, mockComments),
    getByPostId: vi.fn().mockResolvedValue(mockComments),
    getById: vi.fn().mockResolvedValue(mockComment),
    create: vi.fn().mockResolvedValue(mockComment),
    like: vi.fn().mockResolvedValue(true),
    unlike: vi.fn().mockResolvedValue(true),
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

  createNotFound: (): MockCommentRepository => ({
    ...RepositoryMockFactory.createNotFoundMock<CommentEntity>(),
    getByPostId: vi.fn().mockResolvedValue([]),
    getById: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockResolvedValue(null),
    like: vi.fn().mockResolvedValue(false),
    unlike: vi.fn().mockResolvedValue(false),
    findByPostId: vi.fn().mockResolvedValue([]),
    findByUserId: vi.fn().mockResolvedValue([]),
    countByPostId: vi.fn().mockResolvedValue(0),
    incrementLikes: vi.fn().mockRejectedValue(new Error("Comment not found")),
    decrementLikes: vi.fn().mockRejectedValue(new Error("Comment not found")),
  }),

  createError: (
    error: Error = new Error("Comment Repository Error")
  ): MockCommentRepository => ({
    ...RepositoryMockFactory.createErrorMock<CommentEntity>(error),
    getByPostId: vi.fn().mockRejectedValue(error),
    getById: vi.fn().mockRejectedValue(error),
    create: vi.fn().mockRejectedValue(error),
    like: vi.fn().mockRejectedValue(error),
    unlike: vi.fn().mockRejectedValue(error),
    findByPostId: vi.fn().mockRejectedValue(error),
    findByUserId: vi.fn().mockRejectedValue(error),
    countByPostId: vi.fn().mockRejectedValue(error),
    incrementLikes: vi.fn().mockRejectedValue(error),
    decrementLikes: vi.fn().mockRejectedValue(error),
  }),

  createLikeScenario: (mockComment: CommentEntity): MockCommentRepository => ({
    ...RepositoryMockFactory.createBasicMock<CommentEntity>(),
    getByPostId: vi.fn().mockResolvedValue([mockComment]),
    getById: vi.fn().mockResolvedValue(mockComment),
    create: vi.fn().mockResolvedValue(mockComment),
    like: vi.fn().mockImplementation(async (id: string) => {
      return id === mockComment.id;
    }),
    unlike: vi.fn().mockImplementation(async (id: string) => {
      return id === mockComment.id;
    }),
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
  }),

  createPostCommentsScenario: (
    postId: string,
    mockComments: CommentEntity[]
  ): MockCommentRepository => ({
    ...RepositoryMockFactory.createBasicMock<CommentEntity>(),
    getByPostId: vi.fn().mockImplementation(async (id: string) => {
      return id === postId ? mockComments : [];
    }),
    getById: vi.fn().mockImplementation(async (id: string) => {
      return mockComments.find((comment) => comment.id === id) || null;
    }),
    create: vi.fn().mockResolvedValue(mockComments[0]),
    like: vi.fn().mockResolvedValue(true),
    unlike: vi.fn().mockResolvedValue(true),
    findByPostId: vi.fn().mockImplementation(async (id: string) => {
      return id === postId ? mockComments : [];
    }),
    findByUserId: vi.fn().mockResolvedValue([]),
    countByPostId: vi.fn().mockImplementation(async (id: string) => {
      return id === postId ? mockComments.length : 0;
    }),
    incrementLikes: vi.fn(),
    decrementLikes: vi.fn(),
  }),
};
