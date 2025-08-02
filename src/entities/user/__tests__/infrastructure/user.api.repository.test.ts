import { ApiClient } from "@/shared/api/api";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { User } from "../../core/user.domain";
import { UserProfileDto } from "../../infrastructure/dto";
import { UserApiRepository } from "../../infrastructure/repository/user.api.repository";
import { UserFixtures } from "../fixtures/user.fixtures";

/**
 * User API Repository Tests
 * Verify all User API repository functionality using Given-When-Then pattern
 */
describe("User API Repository", () => {
  let userApiRepository: UserApiRepository;
  let mockApiClient: ApiClient;
  let validUserProfileDto: UserProfileDto;

  beforeEach(() => {
    // Given: Set up mock API client and repository
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    } as unknown as ApiClient;

    userApiRepository = new UserApiRepository(mockApiClient);

    // Set up valid test data
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
    it("should return User domain object when API call succeeds", async () => {
      // Given: Mock API client returns valid user profile data
      const mockResponse = {
        data: validUserProfileDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User domain object
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(validUserProfileDto.id);
      expect(result.username).toBe(validUserProfileDto.username);
      expect(result.profileImage).toBe(validUserProfileDto.profileImage);
      expect(result.age).toBe(validUserProfileDto.age);
      expect(result.email).toBe(validUserProfileDto.email);
      expect(mockApiClient.get).toHaveBeenCalledWith("/users/me");
    });

    it("should call correct API endpoint when getting user profile", async () => {
      // Given: Mock API client returns valid response
      const mockResponse = {
        data: validUserProfileDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get user profile
      await userApiRepository.getUserProfile();

      // Then: Should call correct endpoint
      expect(mockApiClient.get).toHaveBeenCalledWith("/users/me");
      expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    });

    it("should handle user profile with missing optional fields", async () => {
      // Given: Mock API client returns user profile with missing optional fields
      const incompleteProfileDto: UserProfileDto = {
        id: "user-incomplete",
        username: "incomplete_user",
        profileImage: "https://example.com/avatar.jpg",
        // age and email are missing
      };
      const mockResponse = {
        data: incompleteProfileDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with default values for missing fields
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe("user-incomplete");
      expect(result.username).toBe("incomplete_user");
      expect(result.age).toBe(0); // Default value
      expect(result.email).toBe(""); // Default value
    });

    it("should handle user profile with null optional fields", async () => {
      // Given: Mock API client returns user profile with null optional fields
      const profileDtoWithNulls: UserProfileDto = {
        id: "user-nulls",
        username: "user_with_nulls",
        profileImage: "",
        age: null as unknown as number,
        email: null as unknown as string,
      };
      const mockResponse = {
        data: profileDtoWithNulls,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with default values for null fields
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe("user-nulls");
      expect(result.username).toBe("user_with_nulls");
      expect(result.age).toBe(0); // Default value for null
      expect(result.email).toBe(""); // Default value for null
    });

    it("should handle user profile with empty profile image", async () => {
      // Given: Mock API client returns user profile with empty profile image
      const profileDtoWithoutImage: UserProfileDto = {
        id: "user-no-image",
        username: "no_image_user",
        profileImage: "",
        age: 25,
        email: "noimage@example.com",
      };
      const mockResponse = {
        data: profileDtoWithoutImage,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with empty profile image
      expect(result).toBeInstanceOf(User);
      expect(result.profileImage).toBe("");
      expect(result.id).toBe("user-no-image");
      expect(result.username).toBe("no_image_user");
    });

    it("should handle API response with malformed data", async () => {
      // Given: Mock API client returns malformed response
      const malformedResponse = {
        data: {
          // Missing required fields
          username: "malformed_user",
          // id is missing
        },
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(malformedResponse);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should handle malformed data gracefully
      expect(result).toBeInstanceOf(User);
      expect(result.username).toBe("malformed_user");
      // Should handle missing id gracefully (depends on User constructor implementation)
    });

    it("should return User with undefined values when API call fails with network error", async () => {
      // Given: Mock API client throws network error
      const networkError = new Error("Network Error");
      vi.mocked(mockApiClient.get).mockRejectedValue(networkError);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with undefined/default values (adapter catches error and returns it as data)
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBeUndefined();
      expect(result.username).toBeUndefined();
      expect(result.age).toBe(0);
      expect(result.email).toBe("");
      expect(mockApiClient.get).toHaveBeenCalledWith("/users/me");
    });

    it("should return User with undefined values when API call fails with 404 error", async () => {
      // Given: Mock API client throws 404 error
      const notFoundError = new Error("User not found");
      notFoundError.name = "404";
      vi.mocked(mockApiClient.get).mockRejectedValue(notFoundError);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with undefined/default values (adapter catches error and returns it as data)
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBeUndefined();
      expect(result.username).toBeUndefined();
      expect(mockApiClient.get).toHaveBeenCalledWith("/users/me");
    });

    it("should return User with undefined values when API call fails with 401 unauthorized error", async () => {
      // Given: Mock API client throws 401 unauthorized error
      const unauthorizedError = new Error("Unauthorized");
      unauthorizedError.name = "401";
      vi.mocked(mockApiClient.get).mockRejectedValue(unauthorizedError);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with undefined/default values (adapter catches error and returns it as data)
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBeUndefined();
      expect(result.username).toBeUndefined();
      expect(mockApiClient.get).toHaveBeenCalledWith("/users/me");
    });

    it("should return User with undefined values when API call fails with 500 server error", async () => {
      // Given: Mock API client throws 500 server error
      const serverError = new Error("Internal Server Error");
      serverError.name = "500";
      vi.mocked(mockApiClient.get).mockRejectedValue(serverError);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with undefined/default values (adapter catches error and returns it as data)
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBeUndefined();
      expect(result.username).toBeUndefined();
      expect(mockApiClient.get).toHaveBeenCalledWith("/users/me");
    });

    it("should return User with undefined values when API timeout occurs", async () => {
      // Given: Mock API client throws timeout error
      const timeoutError = new Error("Request timeout");
      timeoutError.name = "TIMEOUT";
      vi.mocked(mockApiClient.get).mockRejectedValue(timeoutError);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with undefined/default values (adapter catches error and returns it as data)
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBeUndefined();
      expect(result.username).toBeUndefined();
      expect(mockApiClient.get).toHaveBeenCalledWith("/users/me");
    });
  });

  describe("Error Handling", () => {
    it("should log error when API call fails", async () => {
      // Given: Mock console.error and API client throws error
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const apiError = new Error("API Error");
      vi.mocked(mockApiClient.get).mockRejectedValue(apiError);

      // When: Try to get user profile
      try {
        await userApiRepository.getUserProfile();
      } catch {
        // Expected to throw
      }

      // Then: Should log the error (adapter logs first)
      expect(consoleSpy).toHaveBeenCalledWith("User Profile Error: ", apiError);

      // Cleanup
      consoleSpy.mockRestore();
    });

    it("should return User with undefined values when original error occurs", async () => {
      // Given: Mock API client throws specific error
      const originalError = new Error("Original API Error");
      originalError.name = "CUSTOM_ERROR";
      vi.mocked(mockApiClient.get).mockRejectedValue(originalError);

      // When: Get user profile
      const result = await userApiRepository.getUserProfile();

      // Then: Should return User with undefined/default values (adapter catches error and returns it as data)
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBeUndefined();
      expect(result.username).toBeUndefined();
    });
  });

  describe("Integration with Fixtures", () => {
    it("should correctly handle all valid fixture user data", async () => {
      // Given: All valid fixture data
      const fixtures = [
        UserFixtures.valid.basic,
        UserFixtures.valid.withoutImage,
        UserFixtures.valid.minAge,
        UserFixtures.valid.maxAge,
        UserFixtures.valid.specialChars,
      ];

      for (const fixture of fixtures) {
        // Given: Mock API client returns fixture data
        const profileDto: UserProfileDto = {
          id: fixture.id,
          username: fixture.username,
          profileImage: fixture.profileImage,
          age: fixture.age,
          email: fixture.email,
        };
        const mockResponse = {
          data: profileDto,
          status: 200,
          statusText: "OK",
          ok: true,
        };
        vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

        // When: Get user profile
        const result = await userApiRepository.getUserProfile();

        // Then: Should return correct User domain object
        expect(result).toBeInstanceOf(User);
        expect(result.id).toBe(fixture.id);
        expect(result.username).toBe(fixture.username);
        expect(result.profileImage).toBe(fixture.profileImage);
        expect(result.age).toBe(fixture.age);
        expect(result.email).toBe(fixture.email);
      }
    });

    it("should handle edge case fixture data correctly", async () => {
      // Given: Edge case fixture data
      const edgeFixtures = [
        UserFixtures.edge.minLengthUsername,
        UserFixtures.edge.maxLengthUsername,
        UserFixtures.edge.zeroAge,
        UserFixtures.edge.longEmail,
      ];

      for (const fixture of edgeFixtures) {
        // Given: Mock API client returns edge case data
        const profileDto: UserProfileDto = {
          id: fixture.id,
          username: fixture.username,
          profileImage: fixture.profileImage,
          age: fixture.age,
          email: fixture.email,
        };
        const mockResponse = {
          data: profileDto,
          status: 200,
          statusText: "OK",
          ok: true,
        };
        vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

        // When: Get user profile
        const result = await userApiRepository.getUserProfile();

        // Then: Should handle edge cases correctly
        expect(result).toBeInstanceOf(User);
        expect(result.id).toBe(fixture.id);
        expect(result.username).toBe(fixture.username);
        expect(result.age).toBe(fixture.age);
        expect(result.email).toBe(fixture.email);
      }
    });
  });

  describe("Performance and Concurrency", () => {
    it("should handle multiple concurrent API calls", async () => {
      // Given: Mock API client returns valid response
      const mockResponse = {
        data: validUserProfileDto,
        status: 200,
        statusText: "OK",
        ok: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue(mockResponse);

      // When: Make multiple concurrent calls
      const promises = Array.from({ length: 5 }, () =>
        userApiRepository.getUserProfile()
      );
      const results = await Promise.all(promises);

      // Then: Should handle all calls successfully
      expect(results).toHaveLength(5);
      results.forEach((result) => {
        expect(result).toBeInstanceOf(User);
        expect(result.id).toBe(validUserProfileDto.id);
      });
      expect(mockApiClient.get).toHaveBeenCalledTimes(5);
    });

    it("should handle mixed success and failure concurrent calls", async () => {
      // Given: Mock API client alternates between success and failure
      let callCount = 0;
      vi.mocked(mockApiClient.get).mockImplementation(() => {
        callCount++;
        if (callCount % 2 === 0) {
          return Promise.reject(new Error("API Error"));
        }
        return Promise.resolve({
          data: validUserProfileDto,
          status: 200,
          statusText: "OK",
          ok: true,
        });
      });

      // When: Make multiple concurrent calls
      const promises = Array.from({ length: 4 }, () =>
        userApiRepository.getUserProfile()
      );
      const results = await Promise.all(promises);

      // Then: Should handle mixed results correctly (all return User objects due to adapter behavior)
      expect(results).toHaveLength(4);
      expect(results[0]).toBeInstanceOf(User); // Success
      expect(results[1]).toBeInstanceOf(User); // Failure (adapter catches error, returns as data)
      expect(results[2]).toBeInstanceOf(User); // Success
      expect(results[3]).toBeInstanceOf(User); // Failure (adapter catches error, returns as data)

      // Verify that failed calls have undefined values
      expect(results[0].id).toBe(validUserProfileDto.id); // Success
      expect(results[1].id).toBeUndefined(); // Failure
      expect(results[2].id).toBe(validUserProfileDto.id); // Success
      expect(results[3].id).toBeUndefined(); // Failure
    });
  });
});
