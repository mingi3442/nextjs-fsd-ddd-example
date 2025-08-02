import { beforeEach, describe, expect, it } from "vitest";
import { Post } from "../../core";
import { PostDto } from "../../infrastructure/dto";
import { PostMapper } from "../../mapper";
import { PostEntity, UserReference } from "../../types";

/**
 * Post Mapper Tests
 * Verify core Post mapper functionality using Given-When-Then pattern
 */
describe("Post Mapper", () => {
  let validPost: Post;
  let validPostDto: PostDto;
  let validPostEntity: PostEntity;
  let validUserReference: UserReference;

  beforeEach(() => {
    // Given: Set up valid test data for mapper tests
    validUserReference = {
      id: "user-123",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
    };

    const now = Date.now();
    validPost = new Post(
      "post-123",
      validUserReference,
      "Test Post Title",
      "Test post body content",
      "https://example.com/image.jpg",
      10,
      5,
      now,
      now
    );

    validPostDto = {
      id: "post-123",
      user: validUserReference,
      title: "Test Post Title",
      body: "Test post body content",
      image: "https://example.com/image.jpg",
      likes: 10,
      totalComments: 5,
      createdAt: now,
      updatedAt: now,
    };

    validPostEntity = {
      id: "post-123",
      user: validUserReference,
      title: "Test Post Title",
      body: "Test post body content",
      image: "https://example.com/image.jpg",
      likes: 10,
      totalComments: 5,
      createdAt: now,
      updatedAt: now,
    };
  });

  describe("toDto", () => {
    it("should convert Post domain to PostDto when provided with valid Post", () => {
      // Given: Valid Post domain object
      const post = validPost;

      // When: Convert to DTO
      const result = PostMapper.toDto(post);

      // Then: Should return correct PostDto
      expect(result).toEqual({
        id: post.id,
        user: post.user,
        title: post.title,
        body: post.body,
        image: post.image,
        likes: post.likes,
        totalComments: post.totalComments,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      });
    });

    it("should handle Post with empty image when converting to DTO", () => {
      // Given: Post with empty image
      const postWithoutImage = new Post(
        "post-123",
        validUserReference,
        "Test Title",
        "Test Body",
        "",
        5,
        2,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO
      const result = PostMapper.toDto(postWithoutImage);

      // Then: Should return DTO with empty image
      expect(result.image).toBe("");
      expect(result.id).toBe("post-123");
    });

    it("should handle Post with zero likes and comments when converting to DTO", () => {
      // Given: Post with zero likes and comments
      const postWithZeroStats = new Post(
        "post-zero",
        validUserReference,
        "Zero Stats Post",
        "This post has no likes or comments",
        "https://example.com/image.jpg",
        0,
        0,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO
      const result = PostMapper.toDto(postWithZeroStats);

      // Then: Should return DTO with zero values
      expect(result.likes).toBe(0);
      expect(result.totalComments).toBe(0);
    });
  });

  describe("toDomain", () => {
    it("should convert PostDto to Post domain when provided with valid DTO", () => {
      // Given: Valid PostDto
      const dto = validPostDto;

      // When: Convert to domain
      const result = PostMapper.toDomain(dto);

      // Then: Should return Post domain object
      expect(result).toBeInstanceOf(Post);
      expect(result.id).toBe(dto.id);
      expect(result.user).toEqual(dto.user);
      expect(result.title).toBe(dto.title);
      expect(result.body).toBe(dto.body);
      expect(result.image).toBe(dto.image);
      expect(result.likes).toBe(dto.likes);
      expect(result.totalComments).toBe(dto.totalComments);
      expect(result.createdAt).toBe(dto.createdAt);
      expect(result.updatedAt).toBe(dto.updatedAt);
    });

    it("should handle null image when converting DTO to domain", () => {
      // Given: PostDto with null image
      const dtoWithNullImage: PostDto = {
        ...validPostDto,
        image: null as unknown as string,
      };

      // When: Convert to domain
      const result = PostMapper.toDomain(dtoWithNullImage);

      // Then: Should use empty string as default
      expect(result.image).toBe("");
      expect(result.id).toBe(validPostDto.id);
    });
  });

  describe("fromEntity", () => {
    it("should convert PostEntity to Post domain when provided with valid entity", () => {
      // Given: Valid PostEntity
      const entity = validPostEntity;

      // When: Convert from entity
      const result = PostMapper.fromEntity(entity);

      // Then: Should return Post domain object
      expect(result).toBeInstanceOf(Post);
      expect(result.id).toBe(entity.id);
      expect(result.user).toEqual(entity.user);
      expect(result.title).toBe(entity.title);
      expect(result.body).toBe(entity.body);
      expect(result.image).toBe(entity.image);
      expect(result.likes).toBe(entity.likes);
      expect(result.totalComments).toBe(entity.totalComments);
      expect(result.createdAt).toBe(entity.createdAt);
      expect(result.updatedAt).toBe(entity.updatedAt);
    });
  });

  describe("fromEntityList", () => {
    it("should convert array of PostEntity to array of Post domain when provided with valid entities", () => {
      // Given: Array of valid PostEntity objects
      const entities = [validPostEntity];

      // When: Convert from entity list
      const result = PostMapper.fromEntityList(entities);

      // Then: Should return array of Post domain objects
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Post);
      expect(result[0].id).toBe(entities[0].id);
      expect(result[0].user).toEqual(entities[0].user);
    });

    it("should handle empty array when converting entity list", () => {
      // Given: Empty array of PostEntity
      const emptyEntities: PostEntity[] = [];

      // When: Convert from entity list
      const result = PostMapper.fromEntityList(emptyEntities);

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("toDomainList", () => {
    it("should convert array of PostDto to array of Post domain when provided with valid DTOs", () => {
      // Given: Array of valid PostDto objects
      const dtos = [validPostDto];

      // When: Convert to domain list
      const result = PostMapper.toDomainList(dtos);

      // Then: Should return array of Post domain objects
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Post);
      expect(result[0].id).toBe(dtos[0].id);
      expect(result[0].user).toEqual(dtos[0].user);
    });

    it("should handle empty array when converting DTO list", () => {
      // Given: Empty array of PostDto
      const emptyDtos: PostDto[] = [];

      // When: Convert to domain list
      const result = PostMapper.toDomainList(emptyDtos);

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("toDtoList", () => {
    it("should convert array of Post domain to array of PostDto when provided with valid Posts", () => {
      // Given: Array of valid Post domain objects
      const posts = [validPost];

      // When: Convert to DTO list
      const result = PostMapper.toDtoList(posts);

      // Then: Should return array of PostDto objects
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(posts[0].id);
      expect(result[0].user).toEqual(posts[0].user);
      expect(result[0].title).toBe(posts[0].title);
    });

    it("should handle empty array when converting Post list to DTO", () => {
      // Given: Empty array of Post domain objects
      const emptyPosts: Post[] = [];

      // When: Convert to DTO list
      const result = PostMapper.toDtoList(emptyPosts);

      // Then: Should return empty array
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
