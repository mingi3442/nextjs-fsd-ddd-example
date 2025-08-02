import {
  MockUserRepository,
  UserFixtures,
  UserProfileDto,
  UserRepository,
  UserRepositoryMocks,
} from "@/entities/user";
import { BaseError } from "@/shared/libs/errors";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserService } from "../../services/user.service";

/**
 * User Service Tests
 * Tests for the UserService implementation
 */
describe("UserService", () => {
  let mockUserRepository: MockUserRepository;
  let userService: ReturnType<typeof UserService>;
  let validUserProfileDto: UserProfileDto;

  beforeEach(() => {
    mockUserRepository = UserRepositoryMocks.create();
    vi.clearAllMocks();
    userService = UserService(mockUserRepository as unknown as UserRepository);

    const userData = UserFixtures.valid.basic;
    validUserProfileDto = {
      id: userData.id,
      username: userData.username,
      profileImage: userData.profileImage,
      age: userData.age,
      email: userData.email,
    };
  });

  describe("getUserProfile", () => {
    it("should return user profile when repository returns valid data", async () => {
      // Given
      mockUserRepository.getUserProfile.mockResolvedValue(validUserProfileDto);

      // When
      const result = await userService.getUserProfile();

      // Then
      expect(result).toEqual(validUserProfileDto);
      expect(mockUserRepository.getUserProfile).toHaveBeenCalledTimes(1);
    });

    it("should throw NotFoundError when repository returns null", async () => {
      // Given
      mockUserRepository.getUserProfile.mockResolvedValue(null);

      // When & Then
      await expect(userService.getUserProfile()).rejects.toThrow(BaseError);
      await expect(userService.getUserProfile()).rejects.toThrow(
        "User with ID current not found"
      );
    });

    it("should throw NotFoundError when repository returns undefined", async () => {
      // Given
      mockUserRepository.getUserProfile.mockResolvedValue(undefined);

      // When & Then
      await expect(userService.getUserProfile()).rejects.toThrow(BaseError);
      await expect(userService.getUserProfile()).rejects.toThrow(
        "User with ID current not found"
      );
    });

    it("should re-throw BaseError when repository throws BaseError", async () => {
      // Given
      const baseError = BaseError.unauthorized("User", "123", "access");
      mockUserRepository.getUserProfile.mockRejectedValue(baseError);

      // When & Then
      await expect(userService.getUserProfile()).rejects.toThrow(baseError);
    });

    it("should wrap generic error in BaseError", async () => {
      // Given
      const genericError = new Error("Database connection failed");
      mockUserRepository.getUserProfile.mockRejectedValue(genericError);

      // When & Then
      await expect(userService.getUserProfile()).rejects.toThrow(BaseError);
      await expect(userService.getUserProfile()).rejects.toThrow(
        "Failed to fetch user profile"
      );
    });

    it("should log errors to console", async () => {
      // Given
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const error = new Error("Repository error");
      mockUserRepository.getUserProfile.mockRejectedValue(error);

      // When
      try {
        await userService.getUserProfile();
      } catch {
        // Expected to throw
      }

      // Then
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching user profile:",
        error
      );

      consoleSpy.mockRestore();
    });
  });
});
