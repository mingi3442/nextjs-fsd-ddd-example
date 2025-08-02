import { beforeEach, describe, expect, it, vi } from "vitest";
import { Comment } from "../../core";
import { CommentDto } from "../../infrastructure/dto";
import { CommentMapper } from "../../mapper";
import { CommentEntity, UserReference } from "../../types";

/**
 * Comment Mapper Tests
 * Verify core Comment mapper functionality using Given-When-Then pattern
 */
describe("Comment Mapper", () => {
  let validComment: Comment;
  let validCommentDto: CommentDto;
  let validCommentEntity: CommentEntity;
  let validUserReference: UserReference;

  beforeEach(() => {
    // Given: Set up valid test data for mapper tests
    validUserReference = {
      id: "user-123",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
    };

    const now = Date.now();
    validComment = new Comment(
      "comment-123",
      "Test comment body",
      validUserReference,
      "post-123",
      5,
      now,
      now
    );

    validCommentDto = {
      id: "comment-123",
      body: "Test comment body",
      postId: "post-123",
      user: validUserReference,
      likes: 5,
      createdAt: now,
      updatedAt: now,
    };

    validCommentEntity = {
      id: "comment-123",
      body: "Test comment body",
      postId: "post-123",
      user: validUserReference,
      likes: 5,
      createdAt: now,
      updatedAt: now,
      updateBody: vi.fn(),
      like: vi.fn(),
      unlike: vi.fn(),
    };
  });

  describe("toDto", () => {
    it("should convert Comment domain to CommentDto when provided with valid Comment", () => {
      // Given: Valid Comment domain object
      const comment = validComment;

      // When: Convert to DTO
      const result = CommentMapper.toDto(comment);

      // Then: Should return correct CommentDto
      expect(result).toEqual({
        id: comment.id,
        body: comment.body,
        postId: comment.postId,
        user: comment.user,
        likes: comment.likes,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      });
    });

    it("should handle Comment with zero likes when converting to DTO", () => {
      // Given: Comment with zero likes
      const commentWithZeroLikes = new Comment(
        "comment-zero",
        "Comment with no likes",
        validUserReference,
        "post-123",
        0,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO
      const result = CommentMapper.toDto(commentWithZeroLikes);

      // Then: Should return DTO with zero likes
      expect(result.likes).toBe(0);
      expect(result.id).toBe("comment-zero");
    });
  });

  describe("toDomain", () => {
    it("should convert CommentDto to Comment domain when provided with valid DTO", () => {
      // Given: Valid CommentDto
      const dto = validCommentDto;

      // When: Convert to domain
      const result = CommentMapper.toDomain(dto);

      // Then: Should return Comment domain object
      expect(result).toBeInstanceOf(Comment);
      expect(result.id).toBe(dto.id);
      expect(result.body).toBe(dto.body);
      expect(result.user).toEqual(dto.user);
      expect(result.postId).toBe(dto.postId);
      expect(result.likes).toBe(dto.likes);
      expect(result.createdAt).toBe(dto.createdAt);
      expect(result.updatedAt).toBe(dto.updatedAt);
    });

    it("should handle missing optional fields when converting DTO to domain", () => {
      // Given: CommentDto with missing optional fields
      const incompleteDto: CommentDto = {
        id: "comment-incomplete",
        body: "Incomplete comment",
        postId: "post-123",
        user: validUserReference,
        likes: undefined as unknown as number,
      };

      // When: Convert to domain
      const result = CommentMapper.toDomain(incompleteDto);

      // Then: Should use default values for missing fields
      expect(result.id).toBe("comment-incomplete");
      expect(result.body).toBe("Incomplete comment");
      expect(result.likes).toBe(0); // Default value
      expect(result.createdAt).toBeGreaterThan(0);
      expect(result.updatedAt).toBeGreaterThan(0);
    });
  });

  describe("fromEntity", () => {
    it("should convert CommentEntity to Comment domain when provided with valid entity", () => {
      // Given: Valid CommentEntity
      const entity = validCommentEntity;

      // When: Convert from entity
      const result = CommentMapper.fromEntity(entity);

      // Then: Should return Comment domain object
      expect(result).toBeInstanceOf(Comment);
      expect(result.id).toBe(entity.id);
      expect(result.body).toBe(entity.body);
      expect(result.user).toEqual(entity.user);
      expect(result.postId).toBe(entity.postId);
      expect(result.likes).toBe(entity.likes);
      expect(result.createdAt).toBe(entity.createdAt);
      expect(result.updatedAt).toBe(entity.updatedAt);
    });
  });

  describe("toDomainList", () => {
    it("should convert array of CommentDto to array of Comment domain when provided with valid DTOs", () => {
      // Given: Array of valid CommentDto objects
      const dtos = [validCommentDto];

      // When: Convert to domain list
      const result = CommentMapper.toDomainList(dtos);

      // Then: Should return array of Comment domain objects
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Comment);
      expect(result[0].id).toBe(dtos[0].id);
      expect(result[0].body).toBe(dtos[0].body);
    });

    it("should handle empty array when converting DTO list", () => {
      // Given: Empty array of CommentDto
      const emptyDtos: CommentDto[] = [];

      // When: Convert to domain list
      const result = CommentMapper.toDomainList(emptyDtos);

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("fromEntityList", () => {
    it("should convert array of CommentEntity to array of Comment domain when provided with valid entities", () => {
      // Given: Array of valid CommentEntity objects
      const entities = [validCommentEntity];

      // When: Convert from entity list
      const result = CommentMapper.fromEntityList(entities);

      // Then: Should return array of Comment domain objects
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Comment);
      expect(result[0].id).toBe(entities[0].id);
      expect(result[0].body).toBe(entities[0].body);
    });

    it("should handle empty array when converting entity list", () => {
      // Given: Empty array of CommentEntity
      const emptyEntities: CommentEntity[] = [];

      // When: Convert from entity list
      const result = CommentMapper.fromEntityList(emptyEntities);

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("toDtoList", () => {
    it("should convert array of Comment domain to array of CommentDto when provided with valid Comments", () => {
      // Given: Array of valid Comment domain objects
      const comments = [validComment];

      // When: Convert to DTO list
      const result = CommentMapper.toDtoList(comments);

      // Then: Should return array of CommentDto objects
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(comments[0].id);
      expect(result[0].body).toBe(comments[0].body);
      expect(result[0].user).toEqual(comments[0].user);
    });

    it("should handle empty array when converting Comment list to DTO", () => {
      // Given: Empty array of Comment domain objects
      const emptyComments: Comment[] = [];

      // When: Convert to DTO list
      const result = CommentMapper.toDtoList(emptyComments);

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
