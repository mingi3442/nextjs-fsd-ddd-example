import { Comment, CommentFactory } from "../../core";
import { CommentDto } from "../../infrastructure/dto";
import { UserReference } from "../../types";
import { CommentFixtures } from "../fixtures";

/**
 * CommentFactory Tests
 * Verify CommentFactory creation methods using Given-When-Then pattern
 */
describe("CommentFactory", () => {
  let validUser: UserReference;
  let validPostId: string;
  let validBody: string;

  beforeEach(() => {
    // Given: Set up basic data needed for tests
    validUser = CommentFixtures.valid.basic.user;
    validPostId = "post-123";
    validBody = "This is a valid comment body.";
  });

  describe("createNew Method", () => {
    it("should create new Comment instance with default values", () => {
      // Given: Valid parameters for creating new comment
      const body = "This is a new comment";
      const postId = "post-456";

      // When: Call createNew method
      const comment = CommentFactory.createNew(body, postId, validUser);

      // Then: New Comment instance should be created with default values
      expect(comment).toBeInstanceOf(Comment);
      expect(comment.body).toBe(body);
      expect(comment.postId).toBe(postId);
      expect(comment.user).toEqual(validUser);
      expect(comment.likes).toBe(0);
      expect(comment.id).toBe("");
      expect(comment.createdAt).toBeTypeOf("number");
      expect(comment.updatedAt).toBeTypeOf("number");
    });

    it("should throw error when creating new Comment with invalid body", () => {
      // Given: Empty comment body
      const emptyBody = "";

      // When & Then: Error should occur when calling createNew with empty body
      expect(() => {
        CommentFactory.createNew(emptyBody, validPostId, validUser);
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when creating new Comment with invalid user", () => {
      // Given: Invalid user reference (empty username)
      const invalidUser: UserReference = {
        id: "user-123",
        username: "",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When & Then: Error should occur when calling createNew with invalid user
      expect(() => {
        CommentFactory.createNew(validBody, validPostId, invalidUser);
      }).toThrow("Username cannot be empty");
    });
  });

  describe("createFromDto Method", () => {
    it("should create Comment instance from valid CommentDto", () => {
      // Given: Valid CommentDto
      const dto: CommentDto = {
        id: "comment-123",
        body: "Comment from DTO",
        postId: "post-456",
        likes: 5,
        user: validUser,
        createdAt: 1640995200000,
        updatedAt: 1640995260000,
      };

      // When: Call createFromDto method
      const comment = CommentFactory.createFromDto(dto);

      // Then: Comment instance should be created correctly from DTO data
      expect(comment).toBeInstanceOf(Comment);
      expect(comment.id).toBe(dto.id);
      expect(comment.body).toBe(dto.body);
      expect(comment.postId).toBe(dto.postId);
      expect(comment.likes).toBe(dto.likes);
      expect(comment.user).toEqual(dto.user);
      expect(comment.createdAt).toBe(dto.createdAt);
      expect(comment.updatedAt).toBe(dto.updatedAt);
    });

    it("should handle CommentDto with undefined optional fields", () => {
      // Given: CommentDto with undefined optional fields
      const dtoWithUndefinedFields: CommentDto = {
        id: "comment-789",
        body: "Comment with undefined fields",
        postId: "post-123",
        likes: undefined as unknown as number,
        user: validUser,
        createdAt: undefined,
        updatedAt: undefined,
      };

      // When: Call createFromDto method
      const comment = CommentFactory.createFromDto(dtoWithUndefinedFields);

      // Then: Undefined fields should be set to default values
      expect(comment.likes).toBe(0);
      expect(comment.createdAt).toBeTypeOf("number");
      expect(comment.updatedAt).toBeTypeOf("number");
    });

    it("should throw error when creating Comment from DTO with invalid body", () => {
      // Given: CommentDto with empty body
      const dtoWithEmptyBody: CommentDto = {
        id: "comment-empty",
        body: "",
        postId: "post-123",
        likes: 0,
        user: validUser,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When & Then: Error should occur when calling createFromDto with empty body DTO
      expect(() => {
        CommentFactory.createFromDto(dtoWithEmptyBody);
      }).toThrow("Comment body cannot be empty");
    });
  });

  describe("Factory Methods Comparison", () => {
    it("should create different Comment instances between createNew and createFromDto", () => {
      // Given: Data for both factory methods
      const body = "Test comment body";
      const dto: CommentDto = {
        id: "comment-from-dto",
        body: body,
        postId: validPostId,
        likes: 5,
        user: validUser,
        createdAt: 1640995200000,
        updatedAt: 1640995260000,
      };

      // When: Create Comment with both factory methods
      const newComment = CommentFactory.createNew(body, validPostId, validUser);
      const dtoComment = CommentFactory.createFromDto(dto);

      // Then: Comment instances should have different characteristics
      expect(newComment.id).toBe("");
      expect(dtoComment.id).toBe("comment-from-dto");
      expect(newComment.likes).toBe(0);
      expect(dtoComment.likes).toBe(5);
      expect(newComment.body).toBe(body);
      expect(dtoComment.body).toBe(body);
    });
  });
});
