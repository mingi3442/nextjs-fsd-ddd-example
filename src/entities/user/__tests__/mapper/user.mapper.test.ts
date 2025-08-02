import { beforeEach, describe, expect, it } from "vitest";
import { User } from "../../core";
import { UserDto, UserProfileDto } from "../../infrastructure/dto";
import { UserMapper } from "../../mapper";

/**
 * User Mapper Tests
 * Verify all User mapper functionality using Given-When-Then pattern
 */
describe("User Mapper", () => {
  let validUser: User;
  let validUserDto: UserDto;
  let validUserProfileDto: UserProfileDto;

  beforeEach(() => {
    // Given: Set up valid test data for mapper tests
    validUser = new User(
      "user-123",
      "testuser",
      "https://example.com/avatar.jpg",
      25,
      "test@example.com"
    );

    validUserDto = {
      id: "user-123",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
    };

    validUserProfileDto = {
      id: "user-123",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "test@example.com",
    };
  });

  describe("toDto", () => {
    it("should convert User domain to UserDto when provided with valid User", () => {
      // Given: Valid User domain object
      const user = validUser;

      // When: Convert to DTO
      const result = UserMapper.toDto(user);

      // Then: Should return correct UserDto
      expect(result).toEqual({
        id: user.id,
        username: user.username,
        profileImage: user.profileImage,
      });
      expect(result).not.toHaveProperty("age");
      expect(result).not.toHaveProperty("email");
    });

    it("should handle User with empty profile image when converting to DTO", () => {
      // Given: User with empty profile image
      const userWithoutImage = new User(
        "user-123",
        "testuser",
        "",
        25,
        "test@example.com"
      );

      // When: Convert to DTO
      const result = UserMapper.toDto(userWithoutImage);

      // Then: Should return DTO with empty profile image
      expect(result.profileImage).toBe("");
      expect(result.id).toBe("user-123");
      expect(result.username).toBe("testuser");
    });
  });

  describe("toProfileDto", () => {
    it("should convert User domain to UserProfileDto when provided with valid User", () => {
      // Given: Valid User domain object
      const user = validUser;

      // When: Convert to profile DTO
      const result = UserMapper.toProfileDto(user);

      // Then: Should return complete UserProfileDto
      expect(result).toEqual({
        id: user.id,
        username: user.username,
        profileImage: user.profileImage,
        age: user.age,
        email: user.email,
      });
    });

    it("should handle User with zero age when converting to profile DTO", () => {
      // Given: User with zero age
      const userWithZeroAge = new User(
        "user-123",
        "testuser",
        "https://example.com/avatar.jpg",
        0,
        "test@example.com"
      );

      // When: Convert to profile DTO
      const result = UserMapper.toProfileDto(userWithZeroAge);

      // Then: Should return profile DTO with zero age
      expect(result.age).toBe(0);
      expect(result.id).toBe("user-123");
      expect(result.username).toBe("testuser");
      expect(result.email).toBe("test@example.com");
    });
  });

  describe("toDomain", () => {
    it("should convert UserDto to User domain when provided with valid DTO", () => {
      // Given: Valid UserDto
      const dto = validUserDto;

      // When: Convert to domain
      const result = UserMapper.toDomain(dto);

      // Then: Should return User domain with default values for missing fields
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(dto.id);
      expect(result.username).toBe(dto.username);
      expect(result.profileImage).toBe(dto.profileImage);
      expect(result.age).toBe(0); // Default value
      expect(result.email).toBe(""); // Default value
    });

    it("should handle null profileImage when converting DTO to domain", () => {
      // Given: UserDto with null profileImage
      const dtoWithNullImage: UserDto = {
        id: "user-123",
        username: "testuser",
        profileImage: null as unknown as string,
      };

      // When: Convert to domain
      const result = UserMapper.toDomain(dtoWithNullImage);

      // Then: Should use empty string as default
      expect(result.profileImage).toBe("");
      expect(result.id).toBe("user-123");
      expect(result.username).toBe("testuser");
    });
  });

  describe("toDomainFromProfile", () => {
    it("should convert UserProfileDto to User domain when provided with valid profile DTO", () => {
      // Given: Valid UserProfileDto
      const profileDto = validUserProfileDto;

      // When: Convert to domain
      const result = UserMapper.toDomainFromProfile(profileDto);

      // Then: Should return complete User domain object
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(profileDto.id);
      expect(result.username).toBe(profileDto.username);
      expect(result.profileImage).toBe(profileDto.profileImage);
      expect(result.age).toBe(profileDto.age);
      expect(result.email).toBe(profileDto.email);
    });

    it("should handle missing optional fields when converting profile DTO to domain", () => {
      // Given: UserProfileDto with missing optional fields
      const incompleteProfileDto: UserProfileDto = {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
        // age and email are missing
      };

      // When: Convert to domain
      const result = UserMapper.toDomainFromProfile(incompleteProfileDto);

      // Then: Should use default values for missing fields
      expect(result.id).toBe("user-123");
      expect(result.username).toBe("testuser");
      expect(result.profileImage).toBe("https://example.com/avatar.jpg");
      expect(result.age).toBe(0); // Default value
      expect(result.email).toBe(""); // Default value
    });

    it("should handle null values in optional fields when converting profile DTO to domain", () => {
      // Given: UserProfileDto with null optional fields
      const profileDtoWithNulls: UserProfileDto = {
        id: "user-123",
        username: "testuser",
        profileImage: "",
        age: null as unknown as number,
        email: null as unknown as string,
      };

      // When: Convert to domain
      const result = UserMapper.toDomainFromProfile(profileDtoWithNulls);

      // Then: Should use default values for null fields
      expect(result.id).toBe("user-123");
      expect(result.username).toBe("testuser");
      expect(result.profileImage).toBe("");
      expect(result.age).toBe(0); // Default value for null
      expect(result.email).toBe(""); // Default value for null
    });
  });
});
