import { UserEntity } from "@/entities/user/types/user.types";
import { MockService, ServiceMockFactory } from "@/shared/libs/__tests__";
import { vi } from "vitest";

/**
 * User Service 모킹
 */
export interface MockUserService extends MockService<UserEntity> {
  getUserProfile: ReturnType<typeof vi.fn>;
  updateUserProfile: ReturnType<typeof vi.fn>;
  updateEmail: ReturnType<typeof vi.fn>;
  updateUsername: ReturnType<typeof vi.fn>;
  checkUsernameAvailability: ReturnType<typeof vi.fn>;
  checkEmailAvailability: ReturnType<typeof vi.fn>;
}

export const UserServiceMocks = {
  /**
   * 기본 User Service 모킹 생성
   */
  create: (): MockUserService => ({
    ...ServiceMockFactory.createBasicMock<UserEntity>(),
    getUserProfile: vi.fn(),
    updateUserProfile: vi.fn(),
    updateEmail: vi.fn(),
    updateUsername: vi.fn(),
    checkUsernameAvailability: vi.fn(),
    checkEmailAvailability: vi.fn(),
  }),

  /**
   * 성공 시나리오 User Service 모킹
   */
  createSuccess: (
    mockUser: UserEntity,
    mockUsers: UserEntity[] = []
  ): MockUserService => ({
    ...ServiceMockFactory.createSuccessMock(mockUser, mockUsers),
    getUserProfile: vi.fn().mockResolvedValue(mockUser),
    updateUserProfile: vi.fn().mockResolvedValue(mockUser),
    updateEmail: vi.fn().mockResolvedValue(mockUser),
    updateUsername: vi.fn().mockResolvedValue(mockUser),
    checkUsernameAvailability: vi.fn().mockResolvedValue(true),
    checkEmailAvailability: vi.fn().mockResolvedValue(true),
  }),

  /**
   * 사용자 없음 시나리오 모킹
   */
  createNotFound: (): MockUserService => ({
    ...ServiceMockFactory.createNotFoundMock<UserEntity>(),
    getUserProfile: vi.fn().mockResolvedValue(null),
    updateUserProfile: vi.fn().mockRejectedValue(new Error("User not found")),
    updateEmail: vi.fn().mockRejectedValue(new Error("User not found")),
    updateUsername: vi.fn().mockRejectedValue(new Error("User not found")),
    checkUsernameAvailability: vi.fn().mockResolvedValue(true),
    checkEmailAvailability: vi.fn().mockResolvedValue(true),
  }),

  /**
   * 유효성 검증 실패 시나리오 모킹
   */
  createValidationError: (): MockUserService => ({
    ...ServiceMockFactory.createBasicMock<UserEntity>(),
    create: vi.fn().mockRejectedValue(new Error("Invalid user data")),
    updateEmail: vi.fn().mockRejectedValue(new Error("Invalid email format")),
    updateUsername: vi
      .fn()
      .mockRejectedValue(new Error("Invalid username format")),
    checkUsernameAvailability: vi.fn().mockResolvedValue(false),
    checkEmailAvailability: vi.fn().mockResolvedValue(false),
    getUserProfile: vi.fn(),
    updateUserProfile: vi.fn(),
    getById: vi.fn(),
    getAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }),

  /**
   * 에러 시나리오 User Service 모킹
   */
  createError: (
    error: Error = new Error("User Service Error")
  ): MockUserService => ({
    ...ServiceMockFactory.createErrorMock<UserEntity>(error),
    getUserProfile: vi.fn().mockRejectedValue(error),
    updateUserProfile: vi.fn().mockRejectedValue(error),
    updateEmail: vi.fn().mockRejectedValue(error),
    updateUsername: vi.fn().mockRejectedValue(error),
    checkUsernameAvailability: vi.fn().mockRejectedValue(error),
    checkEmailAvailability: vi.fn().mockRejectedValue(error),
  }),

  /**
   * 중복 검증 시나리오 모킹
   */
  createDuplicateScenario: (mockUser: UserEntity): MockUserService => ({
    ...ServiceMockFactory.createBasicMock<UserEntity>(),
    create: vi
      .fn()
      .mockRejectedValue(new Error("Username or email already exists")),
    getById: vi.fn().mockResolvedValue(mockUser),
    getAll: vi.fn().mockResolvedValue([mockUser]),
    update: vi.fn().mockResolvedValue(mockUser),
    delete: vi.fn().mockResolvedValue(undefined),
    getUserProfile: vi.fn().mockResolvedValue(mockUser),
    updateUserProfile: vi.fn().mockResolvedValue(mockUser),
    updateEmail: vi.fn().mockRejectedValue(new Error("Email already exists")),
    updateUsername: vi
      .fn()
      .mockRejectedValue(new Error("Username already exists")),
    checkUsernameAvailability: vi.fn().mockResolvedValue(false),
    checkEmailAvailability: vi.fn().mockResolvedValue(false),
  }),

  /**
   * 프로필 업데이트 특화 모킹
   */
  createProfileUpdateScenario: (mockUser: UserEntity): MockUserService => ({
    ...ServiceMockFactory.createBasicMock<UserEntity>(),
    create: vi.fn().mockResolvedValue(mockUser),
    getById: vi.fn().mockResolvedValue(mockUser),
    getAll: vi.fn().mockResolvedValue([mockUser]),
    update: vi.fn().mockResolvedValue(mockUser),
    delete: vi.fn().mockResolvedValue(undefined),
    getUserProfile: vi.fn().mockResolvedValue(mockUser),
    updateUserProfile: vi
      .fn()
      .mockImplementation(async (id: string, data: Partial<UserEntity>) => {
        if (id === mockUser.id) {
          return { ...mockUser, ...data };
        }
        throw new Error("User not found");
      }),
    updateEmail: vi
      .fn()
      .mockImplementation(async (id: string, email: string) => {
        if (id === mockUser.id) {
          return { ...mockUser, email };
        }
        throw new Error("User not found");
      }),
    updateUsername: vi
      .fn()
      .mockImplementation(async (id: string, username: string) => {
        if (id === mockUser.id) {
          return { ...mockUser, username };
        }
        throw new Error("User not found");
      }),
    checkUsernameAvailability: vi
      .fn()
      .mockImplementation(async (username: string) => {
        return username !== mockUser.username;
      }),
    checkEmailAvailability: vi
      .fn()
      .mockImplementation(async (email: string) => {
        return email !== mockUser.email;
      }),
  }),
};
