import { BaseError } from "@/shared/libs/errors";
import { User } from "../../core";

describe("User Domain", () => {
  describe("Constructor", () => {
    it("should create user instance when provided with valid data", () => {
      // Given: Valid user data is provided
      const id = "user-123";
      const username = "testuser";
      const profileImage = "https://example.com/avatar.jpg";
      const age = 25;
      const email = "test@example.com";

      // When: User instance is created with valid data
      const user = new User(id, username, profileImage, age, email);

      // Then: User instance should be created with correct properties
      expect(user.id).toBe(id);
      expect(user.username).toBe(username);
      expect(user.profileImage).toBe(profileImage);
      expect(user.age).toBe(age);
      expect(user.email).toBe(email);
    });

    it("should create user instance with edge case values", () => {
      // Given: Edge case user data (zero age, empty image)
      const id = "user-edge";
      const username = "usr";
      const profileImage = "";
      const age = 0;
      const email = "edge@example.com";

      // When: User instance is created with edge case data
      const user = new User(id, username, profileImage, age, email);

      // Then: User instance should be created successfully
      expect(user.id).toBe(id);
      expect(user.username).toBe(username);
      expect(user.profileImage).toBe(profileImage);
      expect(user.age).toBe(age);
      expect(user.email).toBe(email);
    });
  });

  describe("updateEmail", () => {
    it("should update email when provided with valid email format", () => {
      // Given: User instance with initial email
      const user = new User(
        "user-123",
        "testuser",
        "https://example.com/avatar.jpg",
        25,
        "initial@example.com"
      );
      const newEmail = "newemail@example.com";

      // When: updateEmail is called with valid email
      user.updateEmail(newEmail);

      // Then: Email should be updated to the new value
      expect(user.email).toBe(newEmail);
    });

    it("should throw BaseError when provided with invalid email format", () => {
      // Given: User instance and invalid email
      const user = new User(
        "user-123",
        "testuser",
        "https://example.com/avatar.jpg",
        25,
        "initial@example.com"
      );
      const invalidEmail = "invalid-email";

      // When: updateEmail is called with invalid email
      // Then: Should throw BaseError
      expect(() => user.updateEmail(invalidEmail)).toThrow(BaseError);
      expect(() => user.updateEmail(invalidEmail)).toThrow(
        "Invalid email format"
      );
    });

    it("should not modify email when update fails", () => {
      // Given: User instance with original email
      const originalEmail = "original@example.com";
      const user = new User(
        "user-123",
        "testuser",
        "https://example.com/avatar.jpg",
        25,
        originalEmail
      );
      const invalidEmail = "invalid-email";

      // When: updateEmail is called with invalid email and fails
      try {
        user.updateEmail(invalidEmail);
      } catch {
        // Expected to throw
      }

      // Then: Original email should remain unchanged
      expect(user.email).toBe(originalEmail);
    });
  });

  describe("updateUsername", () => {
    it("should update username when provided with valid format", () => {
      // Given: User instance with initial username
      const user = new User(
        "user-123",
        "olduser",
        "https://example.com/avatar.jpg",
        25,
        "test@example.com"
      );
      const newUsername = "newuser123";

      // When: updateUsername is called with valid username
      user.updateUsername(newUsername);

      // Then: Username should be updated to the new value
      expect(user.username).toBe(newUsername);
    });

    it("should throw BaseError when provided with invalid username format", () => {
      // Given: User instance and invalid username
      const user = new User(
        "user-123",
        "olduser",
        "https://example.com/avatar.jpg",
        25,
        "test@example.com"
      );
      const invalidUsername = "ab"; // Too short

      // When: updateUsername is called with invalid username
      // Then: Should throw BaseError
      expect(() => user.updateUsername(invalidUsername)).toThrow(BaseError);
      expect(() => user.updateUsername(invalidUsername)).toThrow(
        "Invalid username format"
      );
    });

    it("should not modify username when update fails", () => {
      // Given: User instance with original username
      const originalUsername = "originaluser";
      const user = new User(
        "user-123",
        originalUsername,
        "https://example.com/avatar.jpg",
        25,
        "test@example.com"
      );
      const invalidUsername = "ab"; // Too short

      // When: updateUsername is called with invalid username and fails
      try {
        user.updateUsername(invalidUsername);
      } catch {
        // Expected to throw
      }

      // Then: Original username should remain unchanged
      expect(user.username).toBe(originalUsername);
    });
  });
});
