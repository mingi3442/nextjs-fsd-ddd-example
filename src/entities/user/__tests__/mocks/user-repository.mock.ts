import { MockRepository, RepositoryMockFactory } from "@/shared/libs/__tests__";
import { UserEntity } from "../../types";

/**
 * User Repository 모킹
 */
export interface MockUserRepository extends MockRepository<UserEntity> {
  getUserProfile: ReturnType<typeof vi.fn>;
  findByUsername: ReturnType<typeof vi.fn>;
  findByEmail: ReturnType<typeof vi.fn>;
  existsByUsername: ReturnType<typeof vi.fn>;
  existsByEmail: ReturnType<typeof vi.fn>;
}

export const UserRepositoryMocks = {
  /**
   * 기본 User Repository 모킹 생성
   */
  create: (): MockUserRepository => ({
    ...RepositoryMockFactory.createBasicMock<UserEntity>(),
    getUserProfile: vi.fn(),
    findByUsername: vi.fn(),
    findByEmail: vi.fn(),
    existsByUsername: vi.fn(),
    existsByEmail: vi.fn(),
  }),

  /**
   * 성공 시나리오 User Repository 모킹
   */
  createSuccess: (
    mockUser: UserEntity,
    mockUsers: UserEntity[] = []
  ): MockUserRepository => ({
    ...RepositoryMockFactory.createSuccessMock(mockUser, mockUsers),
    getUserProfile: vi.fn().mockResolvedValue(mockUser),
    findByUsername: vi.fn().mockResolvedValue(mockUser),
    findByEmail: vi.fn().mockResolvedValue(mockUser),
    existsByUsername: vi.fn().mockResolvedValue(true),
    existsByEmail: vi.fn().mockResolvedValue(true),
  }),

  /**
   * 사용자 없음 시나리오 모킹
   */
  createNotFound: (): MockUserRepository => ({
    ...RepositoryMockFactory.createNotFoundMock<UserEntity>(),
    getUserProfile: vi.fn().mockResolvedValue(null),
    findByUsername: vi.fn().mockResolvedValue(null),
    findByEmail: vi.fn().mockResolvedValue(null),
    existsByUsername: vi.fn().mockResolvedValue(false),
    existsByEmail: vi.fn().mockResolvedValue(false),
  }),

  /**
   * 에러 시나리오 User Repository 모킹
   */
  createError: (
    error: Error = new Error("User Repository Error")
  ): MockUserRepository => ({
    ...RepositoryMockFactory.createErrorMock<UserEntity>(error),
    getUserProfile: vi.fn().mockRejectedValue(error),
    findByUsername: vi.fn().mockRejectedValue(error),
    findByEmail: vi.fn().mockRejectedValue(error),
    existsByUsername: vi.fn().mockRejectedValue(error),
    existsByEmail: vi.fn().mockRejectedValue(error),
  }),

  /**
   * 중복 사용자 시나리오 모킹 (사용자명/이메일 중복)
   */
  createDuplicate: (mockUser: UserEntity): MockUserRepository => ({
    ...RepositoryMockFactory.createBasicMock<UserEntity>(),
    getUserProfile: vi.fn().mockResolvedValue(mockUser),
    findById: vi.fn().mockResolvedValue(mockUser),
    findAll: vi.fn().mockResolvedValue([mockUser]),
    findByUsername: vi.fn().mockResolvedValue(mockUser),
    findByEmail: vi.fn().mockResolvedValue(mockUser),
    existsByUsername: vi.fn().mockResolvedValue(true),
    existsByEmail: vi.fn().mockResolvedValue(true),
    save: vi
      .fn()
      .mockRejectedValue(new Error("Username or email already exists")),
    update: vi.fn().mockResolvedValue(mockUser),
    delete: vi.fn().mockResolvedValue(undefined),
  }),
};
