import { beforeEach, describe, expect, it } from "vitest";
import { Post } from "../../core/post.domain";
import { PostDto } from "../../infrastructure/dto";
import { PostMapper } from "../../mapper/post.mapper";
import { PostEntity, UserReference } from "../../types";
import { PostFixtures } from "../fixtures/post.fixtures";

/**
 * Post Mapper Tests
 * Verify all Post mapper functionality using Given-When-Then pattern
 */
describe("Post Mapper", () => {
  let validPost: Post;
  let validPostDto: PostDto;
  let validPostEntity: PostEntity;
  let validUserReference: UserReference;

  beforeEach(() => {
    // Given: Set up valid test data for mapper tests
    const postData = PostFixtures.valid.basic;

    validUserReference = {
      id: postData.user.id,
      username: postData.user.username,
      profileImage: postData.user.profileImage,
    };

    validPost = new Post(
      postData.id,
      validUserReference,
      postData.title,
      postData.body,
      postData.image,
      postData.likes,
      postData.totalComments,
      postData.createdAt,
      postData.updatedAt
    );

    validPostDto = {
      id: postData.id,
      user: validUserReference,
      title: postData.title,
      body: postData.body,
      image: postData.image,
      likes: postData.likes,
      totalComments: postData.totalComments,
      createdAt: postData.createdAt,
      updatedAt: postData.updatedAt,
    };

    validPostEntity = {
      id: postData.id,
      user: validUserReference,
      title: postData.title,
      body: postData.body,
      image: postData.image,
      likes: postData.likes,
      totalComments: postData.totalComments,
      createdAt: postData.createdAt,
      updatedAt: postData.updatedAt,
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
      expect(result.title).toBe("Test Title");
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
      expect(result.title).toBe("Zero Stats Post");
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
      expect(result.title).toBe(validPostDto.title);
    });

    it("should handle undefined image when converting DTO to domain", () => {
      // Given: PostDto with undefined image
      const dtoWithUndefinedImage: PostDto = {
        ...validPostDto,
        image: undefined as unknown as string,
      };

      // When: Convert to domain
      const result = PostMapper.toDomain(dtoWithUndefinedImage);

      // Then: Should use empty string as default
      expect(result.image).toBe("");
      expect(result.id).toBe(validPostDto.id);
      expect(result.title).toBe(validPostDto.title);
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

    it("should handle PostEntity with null image when converting to domain", () => {
      // Given: PostEntity with null image
      const entityWithNullImage: PostEntity = {
        ...validPostEntity,
        image: null as unknown as string,
      };

      // When: Convert from entity
      const result = PostMapper.fromEntity(entityWithNullImage);

      // Then: Should use empty string as default
      expect(result.image).toBe("");
      expect(result.id).toBe(validPostEntity.id);
      expect(result.title).toBe(validPostEntity.title);
    });
  });

  describe("fromEntityList", () => {
    it("should convert array of PostEntity to array of Post domain when provided with valid entities", () => {
      // Given: Array of valid PostEntity objects
      const entities = PostFixtures.multiple.map((fixture) => ({
        id: fixture.id,
        user: fixture.user,
        title: fixture.title,
        body: fixture.body,
        image: fixture.image,
        likes: fixture.likes,
        totalComments: fixture.totalComments,
        createdAt: fixture.createdAt,
        updatedAt: fixture.updatedAt,
      }));

      // When: Convert from entity list
      const result = PostMapper.fromEntityList(entities);

      // Then: Should return array of Post domain objects
      expect(result).toHaveLength(entities.length);
      result.forEach((post, index) => {
        expect(post).toBeInstanceOf(Post);
        expect(post.id).toBe(entities[index].id);
        expect(post.user).toEqual(entities[index].user);
        expect(post.title).toBe(entities[index].title);
      });
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
      const dtos = PostFixtures.multiple.map((fixture) => ({
        id: fixture.id,
        user: fixture.user,
        title: fixture.title,
        body: fixture.body,
        image: fixture.image,
        likes: fixture.likes,
        totalComments: fixture.totalComments,
        createdAt: fixture.createdAt,
        updatedAt: fixture.updatedAt,
      }));

      // When: Convert to domain list
      const result = PostMapper.toDomainList(dtos);

      // Then: Should return array of Post domain objects
      expect(result).toHaveLength(dtos.length);
      result.forEach((post, index) => {
        expect(post).toBeInstanceOf(Post);
        expect(post.id).toBe(dtos[index].id);
        expect(post.user).toEqual(dtos[index].user);
        expect(post.title).toBe(dtos[index].title);
      });
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
      const posts = PostFixtures.multiple.map(
        (fixture) =>
          new Post(
            fixture.id,
            fixture.user,
            fixture.title,
            fixture.body,
            fixture.image,
            fixture.likes,
            fixture.totalComments,
            fixture.createdAt,
            fixture.updatedAt
          )
      );

      // When: Convert to DTO list
      const result = PostMapper.toDtoList(posts);

      // Then: Should return array of PostDto objects
      expect(result).toHaveLength(posts.length);
      result.forEach((dto, index) => {
        expect(dto.id).toBe(posts[index].id);
        expect(dto.user).toEqual(posts[index].user);
        expect(dto.title).toBe(posts[index].title);
        expect(dto.body).toBe(posts[index].body);
        expect(dto.image).toBe(posts[index].image);
        expect(dto.likes).toBe(posts[index].likes);
        expect(dto.totalComments).toBe(posts[index].totalComments);
        expect(dto.createdAt).toBe(posts[index].createdAt);
        expect(dto.updatedAt).toBe(posts[index].updatedAt);
      });
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

  describe("UserReference Mapping", () => {
    it("should correctly map UserReference in nested objects", () => {
      // Given: Post with complex UserReference
      const complexUserRef: UserReference = {
        id: "user-complex",
        username: "complex_user.123",
        profileImage: "https://example.com/complex@avatar.jpg",
      };

      const postWithComplexUser = new Post(
        "post-complex",
        complexUserRef,
        "Post with Complex User",
        "This post has a complex user reference",
        "https://example.com/post.jpg",
        10,
        5,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO and back to domain
      const dto = PostMapper.toDto(postWithComplexUser);
      const domainFromDto = PostMapper.toDomain(dto);

      // Then: Should preserve UserReference structure
      expect(dto.user).toEqual(complexUserRef);
      expect(domainFromDto.user).toEqual(complexUserRef);
      expect(domainFromDto.user.username).toBe("complex_user.123");
      expect(domainFromDto.user.profileImage).toBe(
        "https://example.com/complex@avatar.jpg"
      );
    });

    it("should handle UserReference with empty profile image", () => {
      // Given: Post with UserReference having empty profile image
      const userRefWithoutImage: UserReference = {
        id: "user-no-image",
        username: "no_image_user",
        profileImage: "",
      };

      const postWithUserNoImage = new Post(
        "post-no-image",
        userRefWithoutImage,
        "Post from User Without Image",
        "This post is from a user without profile image",
        "https://example.com/post.jpg",
        3,
        1,
        Date.now(),
        Date.now()
      );

      // When: Convert through all mapping methods
      const dto = PostMapper.toDto(postWithUserNoImage);
      const entity: PostEntity = {
        ...dto,
      };
      const domainFromEntity = PostMapper.fromEntity(entity);

      // Then: Should preserve empty profile image
      expect(dto.user.profileImage).toBe("");
      expect(domainFromEntity.user.profileImage).toBe("");
    });
  });

  describe("Timestamp Handling", () => {
    it("should correctly handle timestamp conversion", () => {
      // Given: Post with specific timestamps
      const createdTime = 1640995200000; // Fixed timestamp
      const updatedTime = 1641081600000; // Different timestamp

      const postWithTimestamps = new Post(
        "post-timestamps",
        validUserReference,
        "Post with Timestamps",
        "This post has specific timestamps",
        "https://example.com/post.jpg",
        5,
        2,
        createdTime,
        updatedTime
      );

      // When: Convert to DTO and back to domain
      const dto = PostMapper.toDto(postWithTimestamps);
      const domainFromDto = PostMapper.toDomain(dto);

      // Then: Should preserve timestamp values
      expect(dto.createdAt).toBe(createdTime);
      expect(dto.updatedAt).toBe(updatedTime);
      expect(domainFromDto.createdAt).toBe(createdTime);
      expect(domainFromDto.updatedAt).toBe(updatedTime);
    });

    it("should handle same creation and update timestamps", () => {
      // Given: Post with same creation and update timestamps
      const sameTimestamp = Date.now();

      const postWithSameTimestamps = new Post(
        "post-same-time",
        validUserReference,
        "Never Updated Post",
        "This post was never updated",
        "https://example.com/post.jpg",
        1,
        0,
        sameTimestamp,
        sameTimestamp
      );

      // When: Convert to DTO
      const dto = PostMapper.toDto(postWithSameTimestamps);

      // Then: Should preserve same timestamp values
      expect(dto.createdAt).toBe(sameTimestamp);
      expect(dto.updatedAt).toBe(sameTimestamp);
      expect(dto.createdAt).toBe(dto.updatedAt);
    });
  });

  describe("Edge Cases", () => {
    it("should handle Post with maximum likes and comments", () => {
      // Given: Post with maximum values
      const postWithMaxValues = new Post(
        "post-max",
        validUserReference,
        "Post with Maximum Values",
        "This post has maximum likes and comments",
        "https://example.com/post.jpg",
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO and back to domain
      const dto = PostMapper.toDto(postWithMaxValues);
      const domainFromDto = PostMapper.toDomain(dto);

      // Then: Should handle large numbers correctly
      expect(dto.likes).toBe(Number.MAX_SAFE_INTEGER);
      expect(dto.totalComments).toBe(Number.MAX_SAFE_INTEGER);
      expect(domainFromDto.likes).toBe(Number.MAX_SAFE_INTEGER);
      expect(domainFromDto.totalComments).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("should handle Post with very long title and body", () => {
      // Given: Post with long content
      const longTitle = "A".repeat(200);
      const longBody = "B".repeat(1000);

      const postWithLongContent = new Post(
        "post-long",
        validUserReference,
        longTitle,
        longBody,
        "https://example.com/post.jpg",
        5,
        2,
        Date.now(),
        Date.now()
      );

      // When: Convert to DTO and back to domain
      const dto = PostMapper.toDto(postWithLongContent);
      const domainFromDto = PostMapper.toDomain(dto);

      // Then: Should preserve long content
      expect(dto.title).toBe(longTitle);
      expect(dto.body).toBe(longBody);
      expect(domainFromDto.title).toBe(longTitle);
      expect(domainFromDto.body).toBe(longBody);
    });
  });

  describe("Integration with Fixtures", () => {
    it("should correctly convert all valid fixture data", () => {
      // Given: All valid fixture data
      const fixtures = [
        PostFixtures.valid.basic,
        PostFixtures.valid.withoutImage,
        PostFixtures.valid.popularPost,
        PostFixtures.valid.longContent,
      ];

      fixtures.forEach((fixture) => {
        // When: Create domain object and convert through mappers
        const post = new Post(
          fixture.id,
          fixture.user,
          fixture.title,
          fixture.body,
          fixture.image,
          fixture.likes,
          fixture.totalComments,
          fixture.createdAt,
          fixture.updatedAt
        );

        const dto = PostMapper.toDto(post);
        const entity: PostEntity = { ...dto };
        const domainFromDto = PostMapper.toDomain(dto);
        const domainFromEntity = PostMapper.fromEntity(entity);

        // Then: Should maintain data integrity through conversions
        expect(dto.id).toBe(fixture.id);
        expect(dto.user).toEqual(fixture.user);
        expect(dto.title).toBe(fixture.title);
        expect(dto.body).toBe(fixture.body);
        expect(domainFromDto.id).toBe(fixture.id);
        expect(domainFromDto.user).toEqual(fixture.user);
        expect(domainFromEntity.id).toBe(fixture.id);
        expect(domainFromEntity.user).toEqual(fixture.user);
      });
    });
  });
});
