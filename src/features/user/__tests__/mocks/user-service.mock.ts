import { UserEntity } from "@/entities/user/types/user.types";
import { MockService, ServiceMockFactory } from "@/shared/libs/__tests__";
import { vi } from "vitest";

export interface MockUserService extends MockService<UserEntity> {
  getUserProfile: ReturnType<typeof vi.fn>;
  updateUserProfile: ReturnType<typeof vi.fn>;
}

export const UserServiceMocks = {
  create: (): MockUserService => ({
    ...ServiceMockFactory.createBasicMock<UserEntity>(),
    getUserProfile: vi.fn(),
    updateUserProfile: vi.fn(),
  }),

  createSuccess: (
    mockUser: UserEntity,
    mockUsers: UserEntity[] = []
  ): MockUserService => ({
    ...ServiceMockFactory.createSuccessMock(mockUser, mockUsers),
    getUserProfile: vi.fn().mockResolvedValue(mockUser),
    updateUserProfile: vi.fn().mockResolvedValue(mockUser),
  }),

  createError: (
    error: Error = new Error("User Service Error")
  ): MockUserService => ({
    ...ServiceMockFactory.createErrorMock<UserEntity>(error),
    getUserProfile: vi.fn().mockRejectedValue(error),
    updateUserProfile: vi.fn().mockRejectedValue(error),
  }),
};
