import { vi } from "vitest";
import { Comment } from "../../core";
import { UserReference } from "../../types";
import { CommentFixtures } from "../fixtures";

/**
 * Comment Domain Model Tests
 * Verify Comment entity core functionality using Given-When-Then pattern
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
    it("should create valid Comment instance with all properties", () => {
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

      // Then: Comment instance should be created with all properties
      expect(comment).toBeInstanceOf(Comment);
      expect(comment.id).toBe(id);
      expect(comment.body).toBe(validBody);
      expect(comment.user).toEqual(validUser);
      expect(comment.postId).toBe(validPostId);
      expect(comment.likes).toBe(likes);
      expect(comment.createdAt).toBe(validTimestamp);
      expect(comment.updatedAt).toBe(validTimestamp);
    });

    it("should set default likes to 0 when not provided", () => {
      // Given: Comment creation without likes parameter
      const id = "comment-123";

      // When: Create Comment instance without likes
      const comment = new Comment(
        id,
        validBody,
        validUser,
        validPostId,
        undefined,
        validTimestamp,
        validTimestamp
      );

      // Then: Likes should default to 0
      expect(comment.likes).toBe(0);
    });

    it("should throw error when body is empty", () => {
      // Given: Empty comment body
      const emptyBody = "";

      // When & Then: Error should occur with empty body
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

    it("should throw error when body exceeds maximum length", () => {
      // Given: Comment body exceeding 100 characters
      const tooLongBody = "a".repeat(101);

      // When & Then: Error should occur with too long body
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

    it("should throw error when user reference is invalid", () => {
      // Given: Invalid user reference with empty username
      const invalidUser: UserReference = {
        id: "user-123",
        username: "",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When & Then: Error should occur with invalid user
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

  describe("updateBody Method", () => {
    let comment: Comment;
    let originalTimestamp: number;

    beforeEach(() => {
      // Given: Set up Comment instance for testing
      originalTimestamp = Date.now() - 10000;
      comment = new Comment(
        "comment-123",
        "Original body",
        validUser,
        validPostId,
        0,
        originalTimestamp,
        originalTimestamp
      );
      vi.spyOn(Date, "now").mockReturnValue(Date.now());
    });

    it("should update body and updatedAt timestamp", () => {
      // Given: New valid comment body
      const newBody = "Updated comment body";
      const beforeUpdate = Date.now();

      // When: Call updateBody method
      comment.updateBody(newBody);

      // Then: Body and updatedAt should be updated, createdAt unchanged
      expect(comment.body).toBe(newBody);
      expect(comment.updatedAt).toBeGreaterThanOrEqual(beforeUpdate);
      expect(comment.createdAt).toBe(originalTimestamp);
    });

    it("should throw error when updating with empty body", () => {
      // Given: Empty comment body
      const emptyBody = "";

      // When & Then: Error should occur with empty body
      expect(() => {
        comment.updateBody(emptyBody);
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when updating with too long body", () => {
      // Given: Comment body exceeding 100 characters
      const tooLongBody = "a".repeat(101);

      // When & Then: Error should occur with too long body
      expect(() => {
        comment.updateBody(tooLongBody);
      }).toThrow("Comment body cannot exceed 100 characters");
    });
  });

  describe("like Method", () => {
    let comment: Comment;

    beforeEach(() => {
      // Given: Set up Comment instance for testing
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

    it("should increment likes count", () => {
      // Given: Current likes count
      const initialLikes = comment.likes;
      const userId = "user-456";

      // When: Call like method
      comment.like(userId);

      // Then: Likes count should increase by 1
      expect(comment.likes).toBe(initialLikes + 1);
    });

    it("should handle multiple likes correctly", () => {
      // Given: Initial likes count and multiple user IDs
      const initialLikes = comment.likes;
      const userIds = ["user-1", "user-2", "user-3"];

      // When: Call like method multiple times
      userIds.forEach((userId) => comment.like(userId));

      // Then: Likes count should increase by number of calls
      expect(comment.likes).toBe(initialLikes + userIds.length);
    });
  });

  describe("unlike Method", () => {
    let comment: Comment;

    beforeEach(() => {
      // Given: Set up Comment instance with likes
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

    it("should decrement likes count when likes > 0", () => {
      // Given: Current likes count (5)
      const initialLikes = comment.likes;
      const userId = "user-456";

      // When: Call unlike method
      comment.unlike(userId);

      // Then: Likes count should decrease by 1
      expect(comment.likes).toBe(initialLikes - 1);
    });

    it("should not decrement likes below zero", () => {
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

      // When: Call unlike method on comment with 0 likes
      commentWithZeroLikes.unlike(userId);

      // Then: Likes count should not go below 0
      expect(commentWithZeroLikes.likes).toBe(0);
    });

    it("should handle multiple unlikes correctly", () => {
      // Given: Initial likes count and multiple user IDs
      const initialLikes = comment.likes;
      const userIds = ["user-1", "user-2", "user-3"];

      // When: Call unlike method multiple times
      userIds.forEach((userId) => comment.unlike(userId));

      // Then: Likes count should decrease by number of calls
      expect(comment.likes).toBe(initialLikes - userIds.length);
    });
  });

  describe("Business Logic Validation", () => {
    it("should handle maximum length body correctly", () => {
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

      // Then: Maximum length body should be accepted
      expect(comment.body).toBe(maxLengthBody);
      expect(comment.body.length).toBe(100);
    });
  });
});
