import { UserReference } from "../../types";
import { UserReferenceVO } from "../../value-objects";

/**
 * UserReferenceVO Value Object Tests
 * Verify UserReferenceVO value object core functionality using Given-When-Then pattern
 */
describe("UserReferenceVO Value Object", () => {
  describe("Constructor and Validation", () => {
    it("should create UserReferenceVO instance with valid user reference", () => {
      // Given: Valid user reference data
      const validUserRef: UserReference = {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When: Create UserReferenceVO instance
      const userRefVO = new UserReferenceVO(validUserRef);

      // Then: UserReferenceVO instance should be created correctly
      expect(userRefVO).toBeInstanceOf(UserReferenceVO);
      expect(userRefVO.id).toBe(validUserRef.id);
      expect(userRefVO.username).toBe(validUserRef.username);
      expect(userRefVO.profileImage).toBe(validUserRef.profileImage);
      expect(userRefVO.value).toEqual(validUserRef);
    });

    it("should create UserReferenceVO instance with empty profile image", () => {
      // Given: User reference with empty profile image
      const userRefWithEmptyImage: UserReference = {
        id: "user-456",
        username: "noimage",
        profileImage: "",
      };

      // When: Create UserReferenceVO instance
      const userRefVO = new UserReferenceVO(userRefWithEmptyImage);

      // Then: Should be created correctly with empty profile image
      expect(userRefVO.profileImage).toBe("");
      expect(userRefVO.id).toBe(userRefWithEmptyImage.id);
      expect(userRefVO.username).toBe(userRefWithEmptyImage.username);
    });

    it("should throw error when creating UserReferenceVO with null value", () => {
      // Given: Null value
      const nullValue = null as unknown as UserReference;

      // When & Then: Error should occur with null value
      expect(() => {
        new UserReferenceVO(nullValue);
      }).toThrow("User reference cannot be null or undefined");
    });

    it("should throw error when creating UserReferenceVO with undefined value", () => {
      // Given: Undefined value
      const undefinedValue = undefined as unknown as UserReference;

      // When & Then: Error should occur with undefined value
      expect(() => {
        new UserReferenceVO(undefinedValue);
      }).toThrow("User reference cannot be null or undefined");
    });

    it("should throw error when creating UserReferenceVO with non-string id", () => {
      // Given: User reference with non-string ID
      const userRefWithNonStringId: UserReference = {
        id: 123 as unknown as string,
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When & Then: Error should occur with non-string ID
      expect(() => {
        new UserReferenceVO(userRefWithNonStringId);
      }).toThrow("User ID must be a string");
    });

    it("should throw error when creating UserReferenceVO with empty username", () => {
      // Given: User reference with empty username
      const userRefWithEmptyUsername: UserReference = {
        id: "user-123",
        username: "",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When & Then: Error should occur with empty username
      expect(() => {
        new UserReferenceVO(userRefWithEmptyUsername);
      }).toThrow("Username cannot be empty");
    });

    it("should throw error when creating UserReferenceVO with whitespace-only username", () => {
      // Given: User reference with whitespace-only username
      const userRefWithWhitespaceUsername: UserReference = {
        id: "user-123",
        username: "   \n\t   ",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When & Then: Error should occur with whitespace-only username
      expect(() => {
        new UserReferenceVO(userRefWithWhitespaceUsername);
      }).toThrow("Username cannot be empty");
    });
  });

  describe("toDTO Method", () => {
    it("should return correct DTO when toDTO method is called", () => {
      // Given: UserReferenceVO instance
      const originalUserRef: UserReference = {
        id: "user-456",
        username: "dtouser",
        profileImage: "https://example.com/dto-avatar.jpg",
      };
      const userRefVO = new UserReferenceVO(originalUserRef);

      // When: Call toDTO method
      const dto = userRefVO.toDTO();

      // Then: Correct DTO object should be returned
      expect(dto).toEqual(originalUserRef);
      expect(dto.id).toBe(originalUserRef.id);
      expect(dto.username).toBe(originalUserRef.username);
      expect(dto.profileImage).toBe(originalUserRef.profileImage);
    });

    it("should return new object instance when toDTO method is called", () => {
      // Given: UserReferenceVO instance
      const originalUserRef: UserReference = {
        id: "user-789",
        username: "newobject",
        profileImage: "https://example.com/new-avatar.jpg",
      };
      const userRefVO = new UserReferenceVO(originalUserRef);

      // When: Call toDTO method
      const dto = userRefVO.toDTO();

      // Then: New object instance should be returned (different reference)
      expect(dto).not.toBe(originalUserRef); // Different reference
      expect(dto).toEqual(originalUserRef); // Same value
    });
  });

  describe("Equality Comparison", () => {
    it("should return true when comparing UserReferenceVO instances with same data", () => {
      // Given: Two UserReferenceVO instances with same data
      const userRef: UserReference = {
        id: "user-same",
        username: "sameuser",
        profileImage: "https://example.com/same.jpg",
      };
      const userRefVO1 = new UserReferenceVO(userRef);
      const userRefVO2 = new UserReferenceVO(userRef);

      // When: Compare using equals method
      const isEqual = userRefVO1.equals(userRefVO2);

      // Then: Value objects with same data should be equal
      expect(isEqual).toBe(true);
    });

    it("should return false when comparing UserReferenceVO instances with different data", () => {
      // Given: Two UserReferenceVO instances with different data
      const userRef1: UserReference = {
        id: "user-1",
        username: "user1",
        profileImage: "https://example.com/user1.jpg",
      };
      const userRef2: UserReference = {
        id: "user-2",
        username: "user2",
        profileImage: "https://example.com/user2.jpg",
      };
      const userRefVO1 = new UserReferenceVO(userRef1);
      const userRefVO2 = new UserReferenceVO(userRef2);

      // When: Compare using equals method
      const isEqual = userRefVO1.equals(userRefVO2);

      // Then: Value objects with different data should not be equal
      expect(isEqual).toBe(false);
    });

    it("should return false when comparing UserReferenceVO with null", () => {
      // Given: UserReferenceVO instance and null
      const userRef: UserReference = {
        id: "user-null-test",
        username: "nulltest",
        profileImage: "https://example.com/null.jpg",
      };
      const userRefVO = new UserReferenceVO(userRef);

      // When: Compare with null
      const isEqual = userRefVO.equals(null as unknown as UserReferenceVO);

      // Then: Comparison with null should return false
      expect(isEqual).toBe(false);
    });

    it("should demonstrate value-based equality rather than reference equality", () => {
      // Given: Two separate UserReferenceVO instances with same data
      const userRef: UserReference = {
        id: "user-value-test",
        username: "valuetest",
        profileImage: "https://example.com/value.jpg",
      };
      const userRefVO1 = new UserReferenceVO(userRef);
      const userRefVO2 = new UserReferenceVO({ ...userRef }); // New object

      // When: Perform reference comparison and value comparison
      const referenceEqual = userRefVO1 === userRefVO2;
      const valueEqual = userRefVO1.equals(userRefVO2);

      // Then: Reference should be different but value should be same
      expect(referenceEqual).toBe(false);
      expect(valueEqual).toBe(true);
    });
  });
});
