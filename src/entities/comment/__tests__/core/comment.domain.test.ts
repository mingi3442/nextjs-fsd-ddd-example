import { vi } from "vitest";
import { Comment } from "../../core";
import { UserReference } from "../../types";
import { CommentFixtures } from "../fixtures";

/**
 * Comment Domain Model Tests
 * Verify all Comment entity functionality using Given-When-Then pattern
 */
describe("Comment Domain Model", () => {
  let validUser: UserReference;
  let validPostId: string;
  let validBody: string;
  let validTimestamp: number;

  beforeEach(() => {
    // Given: Set up basic data needed for tests
    validUser = CommentFixtures.valid.basic.user;
    validPostId = "post-123";
    validBody = "This is a valid comment body.";
    validTimestamp = Date.now();
  });

  describe("Constructor", () => {
    it("should create a valid Comment instance when provided with valid parameters", () => {
      // Given: Valid comment creation parameters
      const id = "comment-123";
      const likes = 5;

      // When: Create Comment instance
      const comment = new Comment(
        id,
        validBody,
        validUser,
        validPostId,
        likes,
        validTimestamp,
        validTimestamp
      );

      // Then: Comment instance should be created correctly
      expect(comment).toBeInstanceOf(Comment);
      expect(comment.id).toBe(id);
      expect(comment.body).toBe(validBody);
      expect(comment.user).toEqual(validUser);
      expect(comment.postId).toBe(validPostId);
      expect(comment.likes).toBe(likes);
      expect(comment.createdAt).toBe(validTimestamp);
      expect(comment.updatedAt).toBe(validTimestamp);
    });

    it("should create Comment with default likes value when likes parameter is not provided", () => {
      // Given: Situation where likes parameter is not provided
      const id = "comment-123";

      // When: Create Comment instance without likes
      const comment = new Comment(
        id,
        validBody,
        validUser,
        validPostId,
        undefined, // Use default likes value
        validTimestamp,
        validTimestamp
      );

      // Then: Likes should be set to default value 0
      expect(comment.likes).toBe(0);
    });

    it("should create CommentBody value object when constructing Comment", () => {
      // Given: Valid comment body text
      const commentBody = "Test comment body";

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        commentBody,
        validUser,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );

      // Then: CommentBody value object should be created correctly
      expect(comment.body).toBe(commentBody);
    });

    it("should create UserReferenceVO value object when constructing Comment", () => {
      // Given: Valid user reference data
      const userRef: UserReference = {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        validBody,
        userRef,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );

      // Then: UserReferenceVO value object should be created correctly
      expect(comment.user).toEqual(userRef);
    });

    it("should throw error when creating Comment with invalid body", () => {
      // Given: Empty comment body
      const emptyBody = "";

      // When & Then: Error should occur when creating Comment with empty body
      expect(() => {
        new Comment(
          "comment-123",
          emptyBody,
          validUser,
          validPostId,
          0,
          validTimestamp,
          validTimestamp
        );
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when creating Comment with too long body", () => {
      // Given: Comment body exceeding 100 characters
      const tooLongBody = "a".repeat(101);

      // When & Then: Error should occur when creating Comment with too long body
      expect(() => {
        new Comment(
          "comment-123",
          tooLongBody,
          validUser,
          validPostId,
          0,
          validTimestamp,
          validTimestamp
        );
      }).toThrow("Comment body cannot exceed 100 characters");
    });

    it("should throw error when creating Comment with invalid user reference", () => {
      // Given: Invalid user reference (empty username)
      const invalidUser: UserReference = {
        id: "user-123",
        username: "",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When & Then: Error should occur when creating Comment with invalid user reference
      expect(() => {
        new Comment(
          "comment-123",
          validBody,
          invalidUser,
          validPostId,
          0,
          validTimestamp,
          validTimestamp
        );
      }).toThrow("Username cannot be empty");
    });
  });

  describe("Getter Methods", () => {
    let comment: Comment;

    beforeEach(() => {
      // Given: Create Comment instance for testing
      comment = new Comment(
        "comment-123",
        validBody,
        validUser,
        validPostId,
        5,
        validTimestamp,
        validTimestamp
      );
    });

    it("should return correct id when id getter is called", () => {
      // When: Call id getter
      const id = comment.id;

      // Then: Correct id should be returned
      expect(id).toBe("comment-123");
    });

    it("should return correct postId when postId getter is called", () => {
      // When: Call postId getter
      const postId = comment.postId;

      // Then: Correct postId should be returned
      expect(postId).toBe(validPostId);
    });

    it("should return correct body when body getter is called", () => {
      // When: Call body getter
      const body = comment.body;

      // Then: Correct body should be returned
      expect(body).toBe(validBody);
    });

    it("should return correct user when user getter is called", () => {
      // When: Call user getter
      const user = comment.user;

      // Then: Correct user object should be returned
      expect(user).toEqual(validUser);
    });

    it("should return correct likes when likes getter is called", () => {
      // When: Call likes getter
      const likes = comment.likes;

      // Then: Correct likes count should be returned
      expect(likes).toBe(5);
    });

    it("should return correct createdAt when createdAt getter is called", () => {
      // When: Call createdAt getter
      const createdAt = comment.createdAt;

      // Then: Correct createdAt timestamp should be returned
      expect(createdAt).toBe(validTimestamp);
    });

    it("should return correct updatedAt when updatedAt getter is called", () => {
      // When: Call updatedAt getter
      const updatedAt = comment.updatedAt;

      // Then: Correct updatedAt timestamp should be returned
      expect(updatedAt).toBe(validTimestamp);
    });
  });

  describe("updateBody Method", () => {
    let comment: Comment;
    let originalTimestamp: number;

    beforeEach(() => {
      // Given: Set up Comment instance and original timestamp for testing
      originalTimestamp = Date.now() - 10000; // 10 seconds ago
      comment = new Comment(
        "comment-123",
        "Original body",
        validUser,
        validPostId,
        0,
        originalTimestamp,
        originalTimestamp
      );

      // Mock Date.now() to control update time
      vi.spyOn(Date, "now").mockReturnValue(Date.now());
    });

    it("should update body and updatedAt timestamp when updateBody is called with valid body", () => {
      // Given: New valid comment body
      const newBody = "Updated comment body";
      const beforeUpdate = Date.now();

      // When: Call updateBody method
      comment.updateBody(newBody);

      // Then: Body should be updated and updatedAt should be changed
      expect(comment.body).toBe(newBody);
      expect(comment.updatedAt).toBeGreaterThanOrEqual(beforeUpdate);
      expect(comment.createdAt).toBe(originalTimestamp); // createdAt should not change
    });

    it("should create new CommentBody value object when updateBody is called", () => {
      // Given: New comment body
      const newBody = "New comment body";

      // When: Call updateBody method
      comment.updateBody(newBody);

      // Then: New CommentBody value object should be created
      expect(comment.body).toBe(newBody);
    });

    it("should throw error when updateBody is called with empty body", () => {
      // Given: Empty comment body
      const emptyBody = "";

      // When & Then: Error should occur when calling updateBody with empty body
      expect(() => {
        comment.updateBody(emptyBody);
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when updateBody is called with too long body", () => {
      // Given: Comment body exceeding 100 characters
      const tooLongBody = "a".repeat(101);

      // When & Then: Error should occur when calling updateBody with too long body
      expect(() => {
        comment.updateBody(tooLongBody);
      }).toThrow("Comment body cannot exceed 100 characters");
    });

    it("should not change other properties when updateBody is called", () => {
      // Given: New comment body and original properties
      const newBody = "Updated body";
      const originalId = comment.id;
      const originalPostId = comment.postId;
      const originalUser = comment.user;
      const originalLikes = comment.likes;
      const originalCreatedAt = comment.createdAt;

      // When: Call updateBody method
      comment.updateBody(newBody);

      // Then: Other properties except body and updatedAt should not change
      expect(comment.id).toBe(originalId);
      expect(comment.postId).toBe(originalPostId);
      expect(comment.user).toEqual(originalUser);
      expect(comment.likes).toBe(originalLikes);
      expect(comment.createdAt).toBe(originalCreatedAt);
    });
  });

  describe("like Method", () => {
    let comment: Comment;
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      // Given: Set up Comment instance and console.log spy for testing
      comment = new Comment(
        "comment-123",
        validBody,
        validUser,
        validPostId,
        5,
        validTimestamp,
        validTimestamp
      );
      consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    });

    it("should increment likes count when like method is called", () => {
      // Given: Current likes count
      const initialLikes = comment.likes;
      const userId = "user-456";

      // When: Call like method
      comment.like(userId);

      // Then: Likes count should increase by 1
      expect(comment.likes).toBe(initialLikes + 1);
    });

    it("should log like action when like method is called", () => {
      // Given: User ID
      const userId = "user-456";

      // When: Call like method
      comment.like(userId);

      // Then: Like action should be logged
      expect(consoleSpy).toHaveBeenCalledWith(
        `User ${userId} liked the comment`
      );
    });

    it("should handle multiple likes correctly when like method is called multiple times", () => {
      // Given: Initial likes count and multiple user IDs
      const initialLikes = comment.likes;
      const userIds = ["user-1", "user-2", "user-3"];

      // When: Call like method multiple times
      userIds.forEach((userId) => comment.like(userId));

      // Then: Likes count should increase by the number of calls
      expect(comment.likes).toBe(initialLikes + userIds.length);
    });

    it("should not change other properties when like method is called", () => {
      // Given: Original properties
      const userId = "user-456";
      const originalId = comment.id;
      const originalBody = comment.body;
      const originalUser = comment.user;
      const originalPostId = comment.postId;
      const originalCreatedAt = comment.createdAt;
      const originalUpdatedAt = comment.updatedAt;

      // When: Call like method
      comment.like(userId);

      // Then: Other properties except likes should not change
      expect(comment.id).toBe(originalId);
      expect(comment.body).toBe(originalBody);
      expect(comment.user).toEqual(originalUser);
      expect(comment.postId).toBe(originalPostId);
      expect(comment.createdAt).toBe(originalCreatedAt);
      expect(comment.updatedAt).toBe(originalUpdatedAt);
    });
  });

  describe("unlike Method", () => {
    let comment: Comment;
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      // Given: Set up Comment instance with 5 likes and console.log spy
      comment = new Comment(
        "comment-123",
        validBody,
        validUser,
        validPostId,
        5,
        validTimestamp,
        validTimestamp
      );
      consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    });

    it("should decrement likes count when unlike method is called and likes > 0", () => {
      // Given: Current likes count (5)
      const initialLikes = comment.likes;
      const userId = "user-456";

      // When: Call unlike method
      comment.unlike(userId);

      // Then: Likes count should decrease by 1
      expect(comment.likes).toBe(initialLikes - 1);
    });

    it("should log unlike action when unlike method is called", () => {
      // Given: User ID
      const userId = "user-456";

      // When: Call unlike method
      comment.unlike(userId);

      // Then: Unlike action should be logged
      expect(consoleSpy).toHaveBeenCalledWith(
        `User ${userId} unliked the comment`
      );
    });

    it("should not decrement likes below zero when unlike method is called on comment with 0 likes", () => {
      // Given: Comment instance with 0 likes
      const commentWithZeroLikes = new Comment(
        "comment-zero",
        validBody,
        validUser,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );
      const userId = "user-456";

      // When: Call unlike method
      commentWithZeroLikes.unlike(userId);

      // Then: Likes count should not go below 0
      expect(commentWithZeroLikes.likes).toBe(0);
    });

    it("should still log unlike action even when likes is 0", () => {
      // Given: Comment instance with 0 likes
      const commentWithZeroLikes = new Comment(
        "comment-zero",
        validBody,
        validUser,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );
      const userId = "user-456";

      // When: Call unlike method
      commentWithZeroLikes.unlike(userId);

      // Then: Unlike action should still be logged
      expect(consoleSpy).toHaveBeenCalledWith(
        `User ${userId} unliked the comment`
      );
    });

    it("should handle multiple unlikes correctly when unlike method is called multiple times", () => {
      // Given: Initial likes count and multiple user IDs
      const initialLikes = comment.likes; // 5
      const userIds = ["user-1", "user-2", "user-3"];

      // When: Call unlike method multiple times
      userIds.forEach((userId) => comment.unlike(userId));

      // Then: Likes count should decrease by the number of calls
      expect(comment.likes).toBe(initialLikes - userIds.length);
    });

    it("should not change other properties when unlike method is called", () => {
      // Given: Original properties
      const userId = "user-456";
      const originalId = comment.id;
      const originalBody = comment.body;
      const originalUser = comment.user;
      const originalPostId = comment.postId;
      const originalCreatedAt = comment.createdAt;
      const originalUpdatedAt = comment.updatedAt;

      // When: Call unlike method
      comment.unlike(userId);

      // Then: Other properties except likes should not change
      expect(comment.id).toBe(originalId);
      expect(comment.body).toBe(originalBody);
      expect(comment.user).toEqual(originalUser);
      expect(comment.postId).toBe(originalPostId);
      expect(comment.createdAt).toBe(originalCreatedAt);
      expect(comment.updatedAt).toBe(originalUpdatedAt);
    });
  });

  describe("Value Objects Integration", () => {
    it("should properly integrate with CommentBody value object", () => {
      // Given: Valid comment body text
      const bodyText = "Test comment with value object";

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        bodyText,
        validUser,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );

      // Then: CommentBody value object should be integrated correctly
      expect(comment.body).toBe(bodyText);
    });

    it("should properly integrate with UserReferenceVO value object", () => {
      // Given: Valid user reference
      const userRef: UserReference = {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        validBody,
        userRef,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );

      // Then: UserReferenceVO value object should be integrated correctly
      expect(comment.user).toEqual(userRef);
    });

    it("should validate data through value objects during construction", () => {
      // Given: Invalid data (empty body and null user)
      const emptyBody = "";
      const nullUser = null as unknown as UserReference;

      // When & Then: Error should occur through value object validation
      expect(() => {
        new Comment(
          "comment-123",
          emptyBody,
          validUser,
          validPostId,
          0,
          validTimestamp,
          validTimestamp
        );
      }).toThrow("Comment body cannot be empty");

      expect(() => {
        new Comment(
          "comment-123",
          validBody,
          nullUser,
          validPostId,
          0,
          validTimestamp,
          validTimestamp
        );
      }).toThrow("User reference cannot be null or undefined");
    });
  });

  describe("Edge Cases", () => {
    it("should handle maximum length comment body correctly", () => {
      // Given: Comment body with exactly 100 characters
      const maxLengthBody = "a".repeat(100);

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        maxLengthBody,
        validUser,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );

      // Then: Maximum length body should be handled correctly
      expect(comment.body).toBe(maxLengthBody);
      expect(comment.body.length).toBe(100);
    });

    it("should handle special characters in comment body", () => {
      // Given: Comment body with special characters
      const specialCharBody = "Comment with special chars: @#$%^&*()!";

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        specialCharBody,
        validUser,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );

      // Then: Special characters should be handled correctly
      expect(comment.body).toBe(specialCharBody);
    });

    it("should handle emojis in comment body", () => {
      // Given: Comment body with emojis
      const emojiBody = "Great post! 👍😊🎉";

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        emojiBody,
        validUser,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );

      // Then: Emojis should be handled correctly
      expect(comment.body).toBe(emojiBody);
    });

    it("should handle user without profile image", () => {
      // Given: User without profile image
      const userWithoutImage: UserReference = {
        id: "user-123",
        username: "testuser",
        profileImage: "",
      };

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        validBody,
        userWithoutImage,
        validPostId,
        0,
        validTimestamp,
        validTimestamp
      );

      // Then: User without profile image should be handled correctly
      expect(comment.user.profileImage).toBe("");
    });

    it("should handle very large likes count", () => {
      // Given: Very large likes count
      const largeLikesCount = Number.MAX_SAFE_INTEGER;

      // When: Create Comment instance
      const comment = new Comment(
        "comment-123",
        validBody,
        validUser,
        validPostId,
        largeLikesCount,
        validTimestamp,
        validTimestamp
      );

      // Then: Large likes count should be handled correctly
      expect(comment.likes).toBe(largeLikesCount);
    });
  });
});
