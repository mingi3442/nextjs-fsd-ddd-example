import { Comment, CommentFactory } from "../../core";
import { CommentDto } from "../../infrastructure/dto";
import { UserReference } from "../../types";

import { CommentFixtures } from "../fixtures/comment.fixtures";

/**
 * CommentFactory Tests
 * Verify all CommentFactory creation methods using Given-When-Then pattern
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
    it("should create new Comment instance when provided with valid parameters", () => {
      // Given: Valid parameters for creating new comment
      const body = "This is a new comment";
      const postId = "post-456";
      const user: UserReference = {
        id: "user-789",
        username: "newuser",
        profileImage: "https://example.com/new-avatar.jpg",
      };

      // When: Call createNew method
      const comment = CommentFactory.createNew(body, postId, user);

      // Then: New Comment instance should be created correctly
      expect(comment).toBeInstanceOf(Comment);
      expect(comment.body).toBe(body);
      expect(comment.postId).toBe(postId);
      expect(comment.user).toEqual({
        id: user.id,
        username: user.username,
        profileImage: user.profileImage,
      });
      expect(comment.likes).toBe(0); // New comment starts with 0 likes
      expect(comment.id).toBe(""); // New comment starts with empty ID
    });

    it("should set default values correctly when creating new Comment", () => {
      // Given: New comment creation parameters
      const body = "New comment body";
      const postId = "post-123";
      const user = validUser;

      // When: Call createNew method
      const comment = CommentFactory.createNew(body, postId, user);

      // Then: Default values should be set correctly
      expect(comment.id).toBe(""); // Empty ID
      expect(comment.likes).toBe(0); // 0 likes
      expect(comment.createdAt).toBeTypeOf("number");
      expect(comment.updatedAt).toBeTypeOf("number");
      expect(comment.createdAt).toBe(comment.updatedAt); // New comment has same created and updated time
    });

    it("should handle user without profile image when creating new Comment", () => {
      // Given: User without profile image
      const userWithoutImage: UserReference = {
        id: "user-123",
        username: "testuser",
        profileImage: undefined as unknown as string,
      };

      // When: Call createNew method
      const comment = CommentFactory.createNew(
        validBody,
        validPostId,
        userWithoutImage
      );

      // Then: Profile image should be set to empty string
      expect(comment.user.profileImage).toBe("");
    });

    it("should handle user with null profile image when creating new Comment", () => {
      // Given: User with null profile image
      const userWithNullImage: UserReference = {
        id: "user-123",
        username: "testuser",
        profileImage: null as unknown as string,
      };

      // When: Call createNew method
      const comment = CommentFactory.createNew(
        validBody,
        validPostId,
        userWithNullImage
      );

      // Then: Profile image should be set to empty string
      expect(comment.user.profileImage).toBe("");
    });

    it("should create Comment with current timestamp when creating new Comment", () => {
      // Given: Mock current time
      const mockTimestamp = 1640995200000;
      vi.spyOn(Date.prototype, "getTime").mockReturnValue(mockTimestamp);

      // When: Call createNew method
      const comment = CommentFactory.createNew(
        validBody,
        validPostId,
        validUser
      );

      // Then: Current timestamp should be set
      expect(comment.createdAt).toBe(mockTimestamp);
      expect(comment.updatedAt).toBe(mockTimestamp);
    });

    it("should throw error when creating new Comment with invalid body", () => {
      // Given: Empty comment body
      const emptyBody = "";

      // When & Then: Error should occur when calling createNew with empty body
      expect(() => {
        CommentFactory.createNew(emptyBody, validPostId, validUser);
      }).toThrow("Comment body cannot be empty");
    });

    it("should throw error when creating new Comment with too long body", () => {
      // Given: Comment body exceeding 100 characters
      const tooLongBody = "a".repeat(101);

      // When & Then: Error should occur when calling createNew with too long body
      expect(() => {
        CommentFactory.createNew(tooLongBody, validPostId, validUser);
      }).toThrow("Comment body cannot exceed 100 characters");
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

    it("should create multiple different Comment instances when called multiple times", () => {
      // Given: Data for creating multiple comments
      const comments: Comment[] = [];
      const count = 3;

      // When: Call createNew method multiple times
      for (let i = 0; i < count; i++) {
        const comment = CommentFactory.createNew(
          `Comment ${i + 1}`,
          `post-${i + 1}`,
          {
            id: `user-${i + 1}`,
            username: `user${i + 1}`,
            profileImage: `https://example.com/avatar${i + 1}.jpg`,
          }
        );
        comments.push(comment);
      }

      // Then: Different Comment instances should be created
      expect(comments).toHaveLength(count);
      comments.forEach((comment, index) => {
        expect(comment.body).toBe(`Comment ${index + 1}`);
        expect(comment.postId).toBe(`post-${index + 1}`);
        expect(comment.user.id).toBe(`user-${index + 1}`);
      });
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
        user: {
          id: "user-789",
          username: "dtouser",
          profileImage: "https://example.com/dto-avatar.jpg",
        },
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

    it("should handle CommentDto without optional fields", () => {
      // Given: CommentDto without optional fields
      const dtoWithoutOptionalFields: CommentDto = {
        id: "comment-456",
        body: "Comment without optional fields",
        postId: "post-789",
        likes: 2,
        user: validUser,
        // createdAt, updatedAt missing
      };

      // When: Call createFromDto method
      const comment = CommentFactory.createFromDto(dtoWithoutOptionalFields);

      // Then: Optional fields should be set to default values
      expect(comment.id).toBe(dtoWithoutOptionalFields.id);
      expect(comment.body).toBe(dtoWithoutOptionalFields.body);
      expect(comment.postId).toBe(dtoWithoutOptionalFields.postId);
      expect(comment.likes).toBe(dtoWithoutOptionalFields.likes);
      expect(comment.user).toEqual(dtoWithoutOptionalFields.user);
      expect(comment.createdAt).toBeTypeOf("number");
      expect(comment.updatedAt).toBeTypeOf("number");
    });

    it("should handle CommentDto with undefined optional fields", () => {
      // Given: CommentDto with undefined optional fields
      const dtoWithUndefinedFields: CommentDto = {
        id: "comment-789",
        body: "Comment with undefined fields",
        postId: "post-123",
        likes: 0,
        user: validUser,
        createdAt: undefined,
        updatedAt: undefined,
      };

      // When: Call createFromDto method
      const comment = CommentFactory.createFromDto(dtoWithUndefinedFields);

      // Then: Undefined fields should be set to current time
      expect(comment.createdAt).toBeTypeOf("number");
      expect(comment.updatedAt).toBeTypeOf("number");
      expect(comment.createdAt).toBeGreaterThan(0);
      expect(comment.updatedAt).toBeGreaterThan(0);
    });

    it("should handle CommentDto with zero likes", () => {
      // Given: CommentDto with 0 likes
      const dtoWithZeroLikes: CommentDto = {
        id: "comment-zero",
        body: "Comment with zero likes",
        postId: "post-123",
        likes: 0,
        user: validUser,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When: Call createFromDto method
      const comment = CommentFactory.createFromDto(dtoWithZeroLikes);

      // Then: 0 likes should be set correctly
      expect(comment.likes).toBe(0);
    });

    it("should handle CommentDto with undefined likes", () => {
      // Given: CommentDto with undefined likes
      const dtoWithUndefinedLikes: CommentDto = {
        id: "comment-undefined-likes",
        body: "Comment with undefined likes",
        postId: "post-123",
        likes: undefined as unknown as number,
        user: validUser,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When: Call createFromDto method
      const comment = CommentFactory.createFromDto(dtoWithUndefinedLikes);

      // Then: Likes should be set to 0
      expect(comment.likes).toBe(0);
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

    it("should throw error when creating Comment from DTO with too long body", () => {
      // Given: CommentDto with too long body
      const dtoWithLongBody: CommentDto = {
        id: "comment-long",
        body: "a".repeat(101),
        postId: "post-123",
        likes: 0,
        user: validUser,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When & Then: Error should occur when calling createFromDto with too long body DTO
      expect(() => {
        CommentFactory.createFromDto(dtoWithLongBody);
      }).toThrow("Comment body cannot exceed 100 characters");
    });

    it("should throw error when creating Comment from DTO with invalid user", () => {
      // Given: CommentDto with invalid user
      const dtoWithInvalidUser: CommentDto = {
        id: "comment-invalid-user",
        body: "Comment with invalid user",
        postId: "post-123",
        likes: 0,
        user: {
          id: "user-123",
          username: "", // Empty username
          profileImage: "https://example.com/avatar.jpg",
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When & Then: Error should occur when calling createFromDto with invalid user DTO
      expect(() => {
        CommentFactory.createFromDto(dtoWithInvalidUser);
      }).toThrow("Username cannot be empty");
    });

    it("should create multiple different Comment instances from different DTOs", () => {
      // Given: Array of multiple CommentDtos
      const dtos: CommentDto[] = [
        {
          id: "comment-1",
          body: "First comment from DTO",
          postId: "post-1",
          likes: 1,
          user: {
            id: "user-1",
            username: "user1",
            profileImage: "avatar1.jpg",
          },
          createdAt: 1640995200000,
          updatedAt: 1640995200000,
        },
        {
          id: "comment-2",
          body: "Second comment from DTO",
          postId: "post-2",
          likes: 2,
          user: {
            id: "user-2",
            username: "user2",
            profileImage: "avatar2.jpg",
          },
          createdAt: 1640995260000,
          updatedAt: 1640995260000,
        },
        {
          id: "comment-3",
          body: "Third comment from DTO",
          postId: "post-3",
          likes: 3,
          user: {
            id: "user-3",
            username: "user3",
            profileImage: "avatar3.jpg",
          },
          createdAt: 1640995320000,
          updatedAt: 1640995320000,
        },
      ];

      // When: Create Comment instances from each DTO
      const comments = dtos.map((dto) => CommentFactory.createFromDto(dto));

      // Then: Different Comment instances should be created correctly
      expect(comments).toHaveLength(dtos.length);
      comments.forEach((comment, index) => {
        const dto = dtos[index];
        expect(comment.id).toBe(dto.id);
        expect(comment.body).toBe(dto.body);
        expect(comment.postId).toBe(dto.postId);
        expect(comment.likes).toBe(dto.likes);
        expect(comment.user).toEqual(dto.user);
        expect(comment.createdAt).toBe(dto.createdAt);
        expect(comment.updatedAt).toBe(dto.updatedAt);
      });
    });
  });

  describe("Factory Methods Comparison", () => {
    it("should create different Comment instances between createNew and createFromDto", () => {
      // Given: Data for createNew and createFromDto
      const body = "Test comment body";
      const postId = "post-123";
      const user = validUser;

      const dto: CommentDto = {
        id: "comment-from-dto",
        body: body,
        postId: postId,
        likes: 5,
        user: user,
        createdAt: 1640995200000,
        updatedAt: 1640995260000,
      };

      // When: Create Comment with both factory methods
      const newComment = CommentFactory.createNew(body, postId, user);
      const dtoComment = CommentFactory.createFromDto(dto);

      // Then: Comment instances with different characteristics should be created
      expect(newComment.id).toBe(""); // createNew has empty ID
      expect(dtoComment.id).toBe("comment-from-dto"); // createFromDto has DTO's ID

      expect(newComment.likes).toBe(0); // createNew has 0 likes
      expect(dtoComment.likes).toBe(5); // createFromDto has DTO's likes count

      expect(newComment.body).toBe(body); // Body is the same
      expect(dtoComment.body).toBe(body);

      expect(newComment.user).toEqual(user); // User is the same
      expect(dtoComment.user).toEqual(user);
    });

    it("should handle edge cases consistently across both factory methods", () => {
      // Given: Edge case data (maximum length body)
      const maxLengthBody = "a".repeat(100);
      const postId = "post-123";
      const user = validUser;

      const dto: CommentDto = {
        id: "comment-max-length",
        body: maxLengthBody,
        postId: postId,
        likes: 0,
        user: user,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When: Create Comment with maximum length body using both factory methods
      const newComment = CommentFactory.createNew(maxLengthBody, postId, user);
      const dtoComment = CommentFactory.createFromDto(dto);

      // Then: Both methods should handle maximum length body correctly
      expect(newComment.body).toBe(maxLengthBody);
      expect(dtoComment.body).toBe(maxLengthBody);
      expect(newComment.body.length).toBe(100);
      expect(dtoComment.body.length).toBe(100);
    });

    it("should handle validation errors consistently across both factory methods", () => {
      // Given: Invalid data (too long body)
      const tooLongBody = "a".repeat(101);
      const postId = "post-123";
      const user = validUser;

      const dto: CommentDto = {
        id: "comment-too-long",
        body: tooLongBody,
        postId: postId,
        likes: 0,
        user: user,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When & Then: Both factory methods should throw the same error
      expect(() => {
        CommentFactory.createNew(tooLongBody, postId, user);
      }).toThrow("Comment body cannot exceed 100 characters");

      expect(() => {
        CommentFactory.createFromDto(dto);
      }).toThrow("Comment body cannot exceed 100 characters");
    });
  });

  describe("Value Object Integration", () => {
    it("should properly create value objects through createNew method", () => {
      // Given: New comment creation data
      const body = "Test comment with value objects";
      const postId = "post-123";
      const user: UserReference = {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      };

      // When: Call createNew method
      const comment = CommentFactory.createNew(body, postId, user);

      // Then: Value objects should be created correctly
      expect(comment.body).toBe(body); // CommentBody value object
      expect(comment.user).toEqual(user); // UserReferenceVO value object
    });

    it("should properly create value objects through createFromDto method", () => {
      // Given: DTO data
      const dto: CommentDto = {
        id: "comment-vo-test",
        body: "DTO comment with value objects",
        postId: "post-123",
        likes: 3,
        user: {
          id: "user-456",
          username: "dtouser",
          profileImage: "https://example.com/dto-avatar.jpg",
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When: Call createFromDto method
      const comment = CommentFactory.createFromDto(dto);

      // Then: Value objects should be created correctly
      expect(comment.body).toBe(dto.body); // CommentBody value object
      expect(comment.user).toEqual(dto.user); // UserReferenceVO value object
    });

    it("should validate data through value objects in both factory methods", () => {
      // Given: Invalid data for value object validation (empty username)
      const invalidUser: UserReference = {
        id: "user-123",
        username: "", // Empty username to trigger validation error
        profileImage: "https://example.com/avatar.jpg",
      };

      const dto: CommentDto = {
        id: "comment-invalid",
        body: "Valid body",
        postId: "post-123",
        likes: 0,
        user: invalidUser,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // When & Then: Both factory methods should throw error through value object validation
      expect(() => {
        CommentFactory.createNew("Valid body", "post-123", invalidUser);
      }).toThrow("Username cannot be empty");

      expect(() => {
        CommentFactory.createFromDto(dto);
      }).toThrow("Username cannot be empty");
    });
  });
});
