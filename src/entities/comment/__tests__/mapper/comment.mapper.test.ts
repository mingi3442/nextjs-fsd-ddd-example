import { beforeEach, describe, expect, it, vi } from "vitest";
import { Comment } from "../../core/comment.domain";
import { CommentDto } from "../../infrastructure/dto";
import { CommentMapper } from "../../mapper/comment.mapper";
import { CommentEntity, UserReference } from "../../types";
import { CommentFixtures } from "../fixtures/comment.fixtures";

/**
 * Comment Mapper Tests
 * Verify all Comment mapper functionality using Given-When-Then pattern
 */
describe("Comment Mapper", () => {
  let validComment: Comment;
  let validCommentDto: CommentDto;
  let validCommentEntity: CommentEntity;
  let validUserReference: UserReference;

  beforeEach(() => {
    // Given: Set up valid test data for mapper tests
    const commentData = CommentFixtures.valid.basic;

    validUserReference = {
      id: commentData.user.id,
      username: commentData.user.username,
      profileImage: commentData.user.profileImage,
    };

    validComment = new Comment(
      commentData.id,
      commentData.body,
      validUserReference,
      commentData.postId,
      commentData.likes,
      commentData.createdAt,
      commentData.updatedAt
    );

    validCommentDto = {
      id: commentData.id,
      body: commentData.body,
      postId: commentData.postId,
      user: validUserReference,
      likes: commentData.likes,
      createdAt: commentData.createdAt,
      updatedAt: commentData.updatedAt,
    };

    validCommentEntity = {
      id: commentData.id,
      body: commentData.body,
      postId: commentData.postId,
      user: validUserReference,
      likes: commentData.likes,
      createdAt: commentData.createdAt,
      updatedAt: commentData.updatedAt,
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
      expect(result.body).toBe("Comment with no likes");
    });

    it("should handle Comment with UserReference without profile image when converting to DTO", () => {
      // Given: Comment with user without profile image
      const userWithoutImage: UserReference = {
        id: "user-no-image",
        username: "no_image_user",
        profileImage: "",
      };

      const commentWithUserNoImage = new Comment(
        "comment-no-image",
        "Comment from user without image",
        userWithoutImage,
        "post-123",
        2,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO
      const result = CommentMapper.toDto(commentWithUserNoImage);

      // Then: Should return DTO with empty profile image
      expect(result.user.profileImage).toBe("");
      expect(result.user.username).toBe("no_image_user");
      expect(result.body).toBe("Comment from user without image");
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
        // createdAt and updatedAt are missing
      };

      // When: Convert to domain
      const result = CommentMapper.toDomain(incompleteDto);

      // Then: Should use default values for missing fields
      expect(result.id).toBe("comment-incomplete");
      expect(result.body).toBe("Incomplete comment");
      expect(result.user).toEqual(validUserReference);
      expect(result.likes).toBe(0); // Default value
      expect(result.createdAt).toBeGreaterThan(0); // Should use current time
      expect(result.updatedAt).toBeGreaterThan(0); // Should use current time
    });

    it("should handle null values in optional fields when converting DTO to domain", () => {
      // Given: CommentDto with null optional fields
      const dtoWithNulls: CommentDto = {
        id: "comment-nulls",
        body: "Comment with nulls",
        postId: "post-123",
        user: validUserReference,
        likes: null as unknown as number,
        createdAt: null as unknown as number,
        updatedAt: null as unknown as number,
      };

      // When: Convert to domain
      const result = CommentMapper.toDomain(dtoWithNulls);

      // Then: Should use default values for null fields
      expect(result.id).toBe("comment-nulls");
      expect(result.body).toBe("Comment with nulls");
      expect(result.likes).toBe(0); // Default value for null
      expect(result.createdAt).toBeGreaterThan(0); // Should use current time
      expect(result.updatedAt).toBeGreaterThan(0); // Should use current time
    });

    it("should convert postId to string when converting DTO to domain", () => {
      // Given: CommentDto with numeric postId
      const dtoWithNumericPostId: CommentDto = {
        ...validCommentDto,
        postId: 123 as unknown as string,
      };

      // When: Convert to domain
      const result = CommentMapper.toDomain(dtoWithNumericPostId);

      // Then: Should convert postId to string
      expect(result.postId).toBe("123");
      expect(typeof result.postId).toBe("string");
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

    it("should handle CommentEntity with missing optional fields when converting to domain", () => {
      // Given: CommentEntity with missing optional fields
      const entityWithMissingFields: CommentEntity = {
        id: "comment-missing",
        body: "Comment with missing fields",
        postId: "post-123",
        user: validUserReference,
        likes: undefined as unknown as number,
        // createdAt and updatedAt are missing
        updateBody: vi.fn(),
        like: vi.fn(),
        unlike: vi.fn(),
        createdAt: 0,
        updatedAt: 0,
      };

      // When: Convert from entity
      const result = CommentMapper.fromEntity(entityWithMissingFields);

      // Then: Should use default values for missing fields
      expect(result.id).toBe("comment-missing");
      expect(result.body).toBe("Comment with missing fields");
      expect(result.likes).toBe(0); // Default value
      expect(result.createdAt).toBeGreaterThan(0); // Should use current time
      expect(result.updatedAt).toBeGreaterThan(0); // Should use current time
    });

    it("should convert postId to string when converting entity to domain", () => {
      // Given: CommentEntity with numeric postId
      const entityWithNumericPostId: CommentEntity = {
        ...validCommentEntity,
        postId: 456 as unknown as string,
      };

      // When: Convert from entity
      const result = CommentMapper.fromEntity(entityWithNumericPostId);

      // Then: Should convert postId to string
      expect(result.postId).toBe("456");
      expect(typeof result.postId).toBe("string");
    });
  });

  describe("toDomainList", () => {
    it("should convert array of CommentDto to array of Comment domain when provided with valid DTOs", () => {
      // Given: Array of valid CommentDto objects
      const dtos = CommentFixtures.multiple.map((fixture) => ({
        id: fixture.id,
        body: fixture.body,
        postId: fixture.postId,
        user: fixture.user,
        likes: fixture.likes,
        createdAt: fixture.createdAt,
        updatedAt: fixture.updatedAt,
      }));

      // When: Convert to domain list
      const result = CommentMapper.toDomainList(dtos);

      // Then: Should return array of Comment domain objects
      expect(result).toHaveLength(dtos.length);
      result.forEach((comment, index) => {
        expect(comment).toBeInstanceOf(Comment);
        expect(comment.id).toBe(dtos[index].id);
        expect(comment.body).toBe(dtos[index].body);
        expect(comment.user).toEqual(dtos[index].user);
        expect(comment.postId).toBe(dtos[index].postId);
      });
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

    it("should handle array with mixed valid and incomplete DTOs", () => {
      // Given: Array with mixed DTO completeness
      const mixedDtos: CommentDto[] = [
        validCommentDto,
        {
          id: "comment-incomplete",
          body: "Incomplete comment",
          postId: "post-123",
          user: validUserReference,
          likes: undefined as unknown as number,
        },
      ];

      // When: Convert to domain list
      const result = CommentMapper.toDomainList(mixedDtos);

      // Then: Should handle both complete and incomplete DTOs
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(validCommentDto.id);
      expect(result[0].likes).toBe(validCommentDto.likes);
      expect(result[1].id).toBe("comment-incomplete");
      expect(result[1].likes).toBe(0); // Default value
    });
  });

  describe("fromEntityList", () => {
    it("should convert array of CommentEntity to array of Comment domain when provided with valid entities", () => {
      // Given: Array of valid CommentEntity objects
      const entities = CommentFixtures.multiple.map((fixture) => ({
        id: fixture.id,
        body: fixture.body,
        postId: fixture.postId,
        user: fixture.user,
        likes: fixture.likes,
        createdAt: fixture.createdAt,
        updatedAt: fixture.updatedAt,
        updateBody: vi.fn(),
        like: vi.fn(),
        unlike: vi.fn(),
      }));

      // When: Convert from entity list
      const result = CommentMapper.fromEntityList(entities);

      // Then: Should return array of Comment domain objects
      expect(result).toHaveLength(entities.length);
      result.forEach((comment, index) => {
        expect(comment).toBeInstanceOf(Comment);
        expect(comment.id).toBe(entities[index].id);
        expect(comment.body).toBe(entities[index].body);
        expect(comment.user).toEqual(entities[index].user);
        expect(comment.postId).toBe(entities[index].postId);
      });
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
      const comments = CommentFixtures.multiple.map(
        (fixture) =>
          new Comment(
            fixture.id,
            fixture.body,
            fixture.user,
            fixture.postId,
            fixture.likes,
            fixture.createdAt,
            fixture.updatedAt
          )
      );

      // When: Convert to DTO list
      const result = CommentMapper.toDtoList(comments);

      // Then: Should return array of CommentDto objects
      expect(result).toHaveLength(comments.length);
      result.forEach((dto, index) => {
        expect(dto.id).toBe(comments[index].id);
        expect(dto.body).toBe(comments[index].body);
        expect(dto.user).toEqual(comments[index].user);
        expect(dto.postId).toBe(comments[index].postId);
        expect(dto.likes).toBe(comments[index].likes);
        expect(dto.createdAt).toBe(comments[index].createdAt);
        expect(dto.updatedAt).toBe(comments[index].updatedAt);
      });
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

  describe("UserReference Mapping", () => {
    it("should correctly map UserReference in nested objects", () => {
      // Given: Comment with complex UserReference
      const complexUserRef: UserReference = {
        id: "user-complex",
        username: "complex_user.123",
        profileImage: "https://example.com/complex@avatar.jpg",
      };

      const commentWithComplexUser = new Comment(
        "comment-complex",
        "Comment with complex user reference",
        complexUserRef,
        "post-123",
        5,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO and back to domain
      const dto = CommentMapper.toDto(commentWithComplexUser);
      const domainFromDto = CommentMapper.toDomain(dto);

      // Then: Should preserve UserReference structure
      expect(dto.user).toEqual(complexUserRef);
      expect(domainFromDto.user).toEqual(complexUserRef);
      expect(domainFromDto.user.username).toBe("complex_user.123");
      expect(domainFromDto.user.profileImage).toBe(
        "https://example.com/complex@avatar.jpg"
      );
    });

    it("should handle UserReference with special characters", () => {
      // Given: Comment with UserReference having special characters
      const userRefWithSpecialChars: UserReference = {
        id: "user-special",
        username: "user@name!",
        profileImage: "https://example.com/special#avatar.jpg",
      };

      const commentWithSpecialUser = new Comment(
        "comment-special",
        "Comment from user with special chars",
        userRefWithSpecialChars,
        "post-123",
        1,
        Date.now(),
        Date.now()
      );

      // When: Convert through all mapping methods
      const dto = CommentMapper.toDto(commentWithSpecialUser);
      const entity: CommentEntity = {
        ...dto,
        createdAt: dto.createdAt || Date.now(),
        updatedAt: dto.updatedAt || Date.now(),
        updateBody: vi.fn(),
        like: vi.fn(),
        unlike: vi.fn(),
      };
      const domainFromEntity = CommentMapper.fromEntity(entity);

      // Then: Should preserve special characters
      expect(dto.user.username).toBe("user@name!");
      expect(dto.user.profileImage).toBe(
        "https://example.com/special#avatar.jpg"
      );
      expect(domainFromEntity.user.username).toBe("user@name!");
      expect(domainFromEntity.user.profileImage).toBe(
        "https://example.com/special#avatar.jpg"
      );
    });
  });

  describe("Value Object Integration", () => {
    it("should handle comment body as value object concept", () => {
      // Given: Comment with various body content types
      const commentsWithDifferentBodies = [
        new Comment(
          "c1",
          "Short",
          validUserReference,
          "post-123",
          0,
          Date.now(),
          Date.now()
        ),
        new Comment(
          "c2",
          "A".repeat(100),
          validUserReference,
          "post-123",
          0,
          Date.now(),
          Date.now()
        ),
        new Comment(
          "c3",
          "Comment with emojis 😊🎉",
          validUserReference,
          "post-123",
          0,
          Date.now(),
          Date.now()
        ),
        new Comment(
          "c4",
          "Comment with special chars @#$%",
          validUserReference,
          "post-123",
          0,
          Date.now(),
          Date.now()
        ),
      ];

      commentsWithDifferentBodies.forEach((comment) => {
        // When: Convert to DTO and back to domain
        const dto = CommentMapper.toDto(comment);
        const domainFromDto = CommentMapper.toDomain(dto);

        // Then: Should preserve body content integrity
        expect(dto.body).toBe(comment.body);
        expect(domainFromDto.body).toBe(comment.body);
      });
    });

    it("should handle timestamp value objects correctly", () => {
      // Given: Comment with specific timestamp values
      const createdTime = 1640995200000; // Fixed timestamp
      const updatedTime = 1641081600000; // Different timestamp

      const commentWithTimestamps = new Comment(
        "comment-timestamps",
        "Comment with specific timestamps",
        validUserReference,
        "post-123",
        3,
        createdTime,
        updatedTime
      );

      // When: Convert to DTO and back to domain
      const dto = CommentMapper.toDto(commentWithTimestamps);
      const domainFromDto = CommentMapper.toDomain(dto);

      // Then: Should preserve timestamp values
      expect(dto.createdAt).toBe(createdTime);
      expect(dto.updatedAt).toBe(updatedTime);
      expect(domainFromDto.createdAt).toBe(createdTime);
      expect(domainFromDto.updatedAt).toBe(updatedTime);
    });
  });

  describe("Edge Cases", () => {
    it("should handle Comment with maximum likes", () => {
      // Given: Comment with maximum likes
      const commentWithMaxLikes = new Comment(
        "comment-max-likes",
        "Comment with maximum likes",
        validUserReference,
        "post-123",
        Number.MAX_SAFE_INTEGER,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO and back to domain
      const dto = CommentMapper.toDto(commentWithMaxLikes);
      const domainFromDto = CommentMapper.toDomain(dto);

      // Then: Should handle large numbers correctly
      expect(dto.likes).toBe(Number.MAX_SAFE_INTEGER);
      expect(domainFromDto.likes).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("should handle Comment with maximum allowed body length", () => {
      // Given: Comment with maximum allowed body length (100 characters)
      const maxLengthBody = "A".repeat(100); // Exactly 100 characters

      const commentWithMaxBody = new Comment(
        "comment-max-body",
        maxLengthBody,
        validUserReference,
        "post-123",
        2,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO and back to domain
      const dto = CommentMapper.toDto(commentWithMaxBody);
      const domainFromDto = CommentMapper.toDomain(dto);

      // Then: Should preserve maximum length body content
      expect(dto.body).toBe(maxLengthBody);
      expect(domainFromDto.body).toBe(maxLengthBody);
      expect(dto.body.length).toBe(100);
    });

    it("should handle Comment with same creation and update timestamps", () => {
      // Given: Comment with same timestamps (never edited)
      const sameTimestamp = Date.now();

      const neverEditedComment = new Comment(
        "comment-never-edited",
        "This comment was never edited",
        validUserReference,
        "post-123",
        1,
        sameTimestamp,
        sameTimestamp
      );

      // When: Convert to DTO
      const dto = CommentMapper.toDto(neverEditedComment);

      // Then: Should preserve same timestamp values
      expect(dto.createdAt).toBe(sameTimestamp);
      expect(dto.updatedAt).toBe(sameTimestamp);
      expect(dto.createdAt).toBe(dto.updatedAt);
    });
  });

  describe("Integration with Fixtures", () => {
    it("should correctly convert all valid fixture data", () => {
      // Given: All valid fixture data
      const fixtures = [
        CommentFixtures.valid.basic,
        CommentFixtures.valid.withoutUserImage,
        CommentFixtures.valid.popularComment,
        CommentFixtures.valid.maxLengthComment,
        CommentFixtures.valid.minLengthComment,
      ];

      fixtures.forEach((fixture) => {
        // When: Create domain object and convert through mappers
        const comment = new Comment(
          fixture.id,
          fixture.body,
          fixture.user,
          fixture.postId,
          fixture.likes,
          fixture.createdAt,
          fixture.updatedAt
        );

        const dto = CommentMapper.toDto(comment);
        const entity: CommentEntity = {
          ...dto,
          createdAt: dto.createdAt || Date.now(),
          updatedAt: dto.updatedAt || Date.now(),
          updateBody: vi.fn(),
          like: vi.fn(),
          unlike: vi.fn(),
        };
        const domainFromDto = CommentMapper.toDomain(dto);
        const domainFromEntity = CommentMapper.fromEntity(entity);

        // Then: Should maintain data integrity through conversions
        expect(dto.id).toBe(fixture.id);
        expect(dto.body).toBe(fixture.body);
        expect(dto.user).toEqual(fixture.user);
        expect(dto.postId).toBe(fixture.postId);
        expect(domainFromDto.id).toBe(fixture.id);
        expect(domainFromDto.body).toBe(fixture.body);
        expect(domainFromDto.user).toEqual(fixture.user);
        expect(domainFromEntity.id).toBe(fixture.id);
        expect(domainFromEntity.body).toBe(fixture.body);
        expect(domainFromEntity.user).toEqual(fixture.user);
      });
    });
  });
});
