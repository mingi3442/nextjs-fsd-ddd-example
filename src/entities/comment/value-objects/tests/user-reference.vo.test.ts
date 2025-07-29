import { BaseError } from "@/shared/libs/errors/base-error";
import { UserReference } from "../../types";
import { UserReferenceVO } from "../../value-objects/user-reference.vo";

/**
 * UserReferenceVO Value Object Tests
 * Verify all UserReferenceVO value object functionality using Given-When-Then pattern
 */
describe("UserReferenceVO Value Object", () => {
  describe("Constructor and Validation", () => {
    it("should create UserReferenceVO instance when provided with valid user reference", () => {
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

    it("should create UserReferenceVO instance with special characters in username", () => {
      // Given: User reference with special characters in username
      const userRefWithSpecialChars: UserReference = {
        id: "user-789",
        username: "user_name-123",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When: Create UserReferenceVO instance
      const userRefVO = new UserReferenceVO(userRefWithSpecialChars);

      // Then: Should be created correctly with special characters in username
      expect(userRefVO.username).toBe(userRefWithSpecialChars.username);
    });

    it("should create UserReferenceVO instance with long username", () => {
      // Given: User reference with long username
      const userRefWithLongUsername: UserReference = {
        id: "user-long",
        username: "very_long_username_that_might_be_used_in_some_systems",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When: Create UserReferenceVO instance
      const userRefVO = new UserReferenceVO(userRefWithLongUsername);

      // Then: Should be created correctly with long username
      expect(userRefVO.username).toBe(userRefWithLongUsername.username);
    });

    it("should throw error when creating UserReferenceVO with null value", () => {
      // Given: Null value
      const nullValue = null as unknown as UserReference;

      // When & Then: Error should occur when creating UserReferenceVO with null value
      expect(() => {
        new UserReferenceVO(nullValue);
      }).toThrow("User reference cannot be null or undefined");
    });

    it("should throw error when creating UserReferenceVO with undefined value", () => {
      // Given: Undefined value
      const undefinedValue = undefined as unknown as UserReference;

      // When & Then: Error should occur when creating UserReferenceVO with undefined value
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

      // When & Then: Error should occur when creating UserReferenceVO with non-string ID
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

      // When & Then: Error should occur when creating UserReferenceVO with empty username
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

      // When & Then: Error should occur when creating UserReferenceVO with whitespace-only username
      expect(() => {
        new UserReferenceVO(userRefWithWhitespaceUsername);
      }).toThrow("Username cannot be empty");
    });
  });

  describe("Getter Methods", () => {
    let userRefVO: UserReferenceVO;
    let originalUserRef: UserReference;

    beforeEach(() => {
      // Given: Set up UserReferenceVO instance for testing
      originalUserRef = {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      };
      userRefVO = new UserReferenceVO(originalUserRef);
    });

    it("should return correct id when id getter is called", () => {
      // When: Call id getter
      const id = userRefVO.id;

      // Then: Correct id should be returned
      expect(id).toBe(originalUserRef.id);
    });

    it("should return correct username when username getter is called", () => {
      // When: Call username getter
      const username = userRefVO.username;

      // Then: Correct username should be returned
      expect(username).toBe(originalUserRef.username);
    });

    it("should return correct profileImage when profileImage getter is called", () => {
      // When: Call profileImage getter
      const profileImage = userRefVO.profileImage;

      // Then: Correct profileImage should be returned
      expect(profileImage).toBe(originalUserRef.profileImage);
    });

    it("should return consistent values across multiple getter calls", () => {
      // When: Call getters multiple times
      const id1 = userRefVO.id;
      const id2 = userRefVO.id;
      const username1 = userRefVO.username;
      const username2 = userRefVO.username;
      const profileImage1 = userRefVO.profileImage;
      const profileImage2 = userRefVO.profileImage;

      // Then: All calls should return consistent values
      expect(id1).toBe(id2);
      expect(username1).toBe(username2);
      expect(profileImage1).toBe(profileImage2);
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

    it("should handle empty profile image in toDTO method", () => {
      // Given: UserReferenceVO with empty profile image
      const userRefWithEmptyImage: UserReference = {
        id: "user-empty",
        username: "emptyimage",
        profileImage: "",
      };
      const userRefVO = new UserReferenceVO(userRefWithEmptyImage);

      // When: Call toDTO method
      const dto = userRefVO.toDTO();

      // Then: Empty profile image should be included correctly in DTO
      expect(dto.profileImage).toBe("");
      expect(dto).toEqual(userRefWithEmptyImage);
    });

    it("should maintain data integrity in toDTO conversion", () => {
      // Given: UserReferenceVO with complex data
      const complexUserRef: UserReference = {
        id: "user-complex-123",
        username: "complex_user-name",
        profileImage:
          "https://cdn.example.com/users/complex_user-name/avatar.png?v=123",
      };
      const userRefVO = new UserReferenceVO(complexUserRef);

      // When: Call toDTO method
      const dto = userRefVO.toDTO();

      // Then: Complex data should be converted correctly
      expect(dto.id).toBe(complexUserRef.id);
      expect(dto.username).toBe(complexUserRef.username);
      expect(dto.profileImage).toBe(complexUserRef.profileImage);
    });

    it("should return immutable DTO object", () => {
      // Given: UserReferenceVO instance
      const userRef: UserReference = {
        id: "user-immutable",
        username: "immutableuser",
        profileImage: "https://example.com/immutable.jpg",
      };
      const userRefVO = new UserReferenceVO(userRef);

      // When: Call toDTO method multiple times
      const dto1 = userRefVO.toDTO();
      const dto2 = userRefVO.toDTO();

      // Then: New object should be returned each time
      expect(dto1).not.toBe(dto2); // Different reference
      expect(dto1).toEqual(dto2); // Same value
    });
  });

  describe("Immutability", () => {
    it("should be immutable after creation", () => {
      // Given: UserReferenceVO instance
      const originalUserRef: UserReference = {
        id: "user-immutable",
        username: "immutableuser",
        profileImage: "https://example.com/immutable.jpg",
      };
      const userRefVO = new UserReferenceVO(originalUserRef);

      // When: Access internal value and attempt to modify
      const internalValue = userRefVO.value;

      // Then: Internal value should not be changed
      expect(userRefVO.id).toBe(originalUserRef.id);
      expect(userRefVO.username).toBe(originalUserRef.username);
      expect(userRefVO.profileImage).toBe(originalUserRef.profileImage);
      expect(internalValue).toEqual(originalUserRef);
    });

    it("should maintain immutability when accessed multiple times", () => {
      // Given: UserReferenceVO instance
      const userRef: UserReference = {
        id: "user-multiple",
        username: "multipleaccess",
        profileImage: "https://example.com/multiple.jpg",
      };
      const userRefVO = new UserReferenceVO(userRef);

      // When: Access value multiple times
      const firstAccess = userRefVO.value;
      const secondAccess = userRefVO.toDTO();
      const thirdAccess = userRefVO.value;

      // Then: Consistent value should be returned for all accesses
      expect(firstAccess).toEqual(userRef);
      expect(secondAccess).toEqual(userRef);
      expect(thirdAccess).toEqual(userRef);
      expect(firstAccess).toEqual(secondAccess);
      expect(secondAccess).toEqual(thirdAccess);
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

      // Then: Value objects with same data should be considered equal
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

      // Then: Value objects with different data should be considered different
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

    it("should return false when comparing UserReferenceVO with undefined", () => {
      // Given: UserReferenceVO instance and undefined
      const userRef: UserReference = {
        id: "user-undefined-test",
        username: "undefinedtest",
        profileImage: "https://example.com/undefined.jpg",
      };
      const userRefVO = new UserReferenceVO(userRef);

      // When: Compare with undefined
      const isEqual = userRefVO.equals(undefined as unknown as UserReferenceVO);

      // Then: Comparison with undefined should return false
      expect(isEqual).toBe(false);
    });

    it("should return true when comparing same UserReferenceVO instance with itself", () => {
      // Given: UserReferenceVO instance
      const userRef: UserReference = {
        id: "user-self",
        username: "selftest",
        profileImage: "https://example.com/self.jpg",
      };
      const userRefVO = new UserReferenceVO(userRef);

      // When: Compare with itself
      const isEqual = userRefVO.equals(userRefVO);

      // Then: Comparison with itself should return true
      expect(isEqual).toBe(true);
    });

    it("should handle partial differences in comparison", () => {
      // Given: UserReferenceVO instances with partial field differences
      const baseUserRef: UserReference = {
        id: "user-base",
        username: "baseuser",
        profileImage: "https://example.com/base.jpg",
      };

      const userRefWithDifferentId = { ...baseUserRef, id: "user-different" };
      const userRefWithDifferentUsername = {
        ...baseUserRef,
        username: "differentuser",
      };
      const userRefWithDifferentImage = {
        ...baseUserRef,
        profileImage: "https://example.com/different.jpg",
      };

      const baseVO = new UserReferenceVO(baseUserRef);
      const differentIdVO = new UserReferenceVO(userRefWithDifferentId);
      const differentUsernameVO = new UserReferenceVO(
        userRefWithDifferentUsername
      );
      const differentImageVO = new UserReferenceVO(userRefWithDifferentImage);

      // When: Compare each one
      const idComparison = baseVO.equals(differentIdVO);
      const usernameComparison = baseVO.equals(differentUsernameVO);
      const imageComparison = baseVO.equals(differentImageVO);

      // Then: All comparisons should return false
      expect(idComparison).toBe(false);
      expect(usernameComparison).toBe(false);
      expect(imageComparison).toBe(false);
    });
  });

  describe("Value-based Comparison", () => {
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
      expect(referenceEqual).toBe(false); // Different object reference
      expect(valueEqual).toBe(true); // Same value
    });

    it("should maintain consistent equality across multiple comparisons", () => {
      // Given: Multiple UserReferenceVO instances with same data
      const userRef: UserReference = {
        id: "user-consistent",
        username: "consistentuser",
        profileImage: "https://example.com/consistent.jpg",
      };
      const userRefVO1 = new UserReferenceVO(userRef);
      const userRefVO2 = new UserReferenceVO({ ...userRef });
      const userRefVO3 = new UserReferenceVO({ ...userRef });

      // When: Compare in multiple combinations
      const comparison1 = userRefVO1.equals(userRefVO2);
      const comparison2 = userRefVO2.equals(userRefVO3);
      const comparison3 = userRefVO1.equals(userRefVO3);

      // Then: All comparisons should return consistent results
      expect(comparison1).toBe(true);
      expect(comparison2).toBe(true);
      expect(comparison3).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should throw BaseError with correct type when validation fails", () => {
      // Given: Invalid user reference data
      const invalidUserRef: UserReference = {
        id: "user-123",
        username: "",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When & Then: BaseError type error should occur
      expect(() => {
        new UserReferenceVO(invalidUserRef);
      }).toThrow(BaseError);
    });

    it("should provide meaningful error messages for different validation failures", () => {
      // Given: Various invalid user reference data
      const nullUserRef = null as unknown as UserReference;
      const undefinedUserRef = undefined as unknown as UserReference;
      const nonStringIdUserRef: UserReference = {
        id: 123 as unknown as string,
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      };
      const emptyUsernameUserRef: UserReference = {
        id: "user-123",
        username: "",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When & Then: Appropriate error messages should occur for each case
      expect(() => new UserReferenceVO(nullUserRef)).toThrow(
        "User reference cannot be null or undefined"
      );
      expect(() => new UserReferenceVO(undefinedUserRef)).toThrow(
        "User reference cannot be null or undefined"
      );
      expect(() => new UserReferenceVO(nonStringIdUserRef)).toThrow(
        "User ID must be a string"
      );
      expect(() => new UserReferenceVO(emptyUsernameUserRef)).toThrow(
        "Username cannot be empty"
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle user reference with minimum valid data", () => {
      // Given: User reference with minimum valid data
      const minimalUserRef: UserReference = {
        id: "1",
        username: "a",
        profileImage: "",
      };

      // When: Create UserReferenceVO instance
      const userRefVO = new UserReferenceVO(minimalUserRef);

      // Then: Should be created correctly with minimal data
      expect(userRefVO.id).toBe("1");
      expect(userRefVO.username).toBe("a");
      expect(userRefVO.profileImage).toBe("");
    });

    it("should handle user reference with very long data", () => {
      // Given: User reference with very long data
      const longDataUserRef: UserReference = {
        id: "user-" + "a".repeat(100),
        username: "username-" + "b".repeat(100),
        profileImage: "https://example.com/" + "c".repeat(100) + ".jpg",
      };

      // When: Create UserReferenceVO instance
      const userRefVO = new UserReferenceVO(longDataUserRef);

      // Then: Should be created correctly with long data
      expect(userRefVO.id).toBe(longDataUserRef.id);
      expect(userRefVO.username).toBe(longDataUserRef.username);
      expect(userRefVO.profileImage).toBe(longDataUserRef.profileImage);
    });

    it("should handle user reference with special URL characters in profile image", () => {
      // Given: User reference with special URL characters in profile image
      const specialUrlUserRef: UserReference = {
        id: "user-special-url",
        username: "specialurl",
        profileImage:
          "https://example.com/avatar.jpg?v=123&size=large&format=webp",
      };

      // When: Create UserReferenceVO instance
      const userRefVO = new UserReferenceVO(specialUrlUserRef);

      // Then: Should be created correctly with special URL characters in profile image
      expect(userRefVO.profileImage).toBe(specialUrlUserRef.profileImage);
    });

    it("should handle user reference with unicode characters in username", () => {
      // Given: User reference with unicode characters in username
      const unicodeUserRef: UserReference = {
        id: "user-unicode",
        username: "사용자名前пользователь",
        profileImage: "https://example.com/unicode.jpg",
      };

      // When: Create UserReferenceVO instance
      const userRefVO = new UserReferenceVO(unicodeUserRef);

      // Then: Should be created correctly with unicode characters in username
      expect(userRefVO.username).toBe(unicodeUserRef.username);
    });
  });
});
