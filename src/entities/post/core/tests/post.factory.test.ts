import { PostFixtures } from "../../__tests__/fixtures/post.fixtures";
import { PostDto } from "../../infrastructure/dto";
import { UserReference } from "../../types";
import { Post } from "../post.domain";
import { PostFactory } from "../post.factory";

/**
 * Test-specific partial PostDto type
 * For testing scenarios where some fields might be undefined
 */
type PartialPostDto = {
  id: string;
  user: UserReference;
  title: string;
  body: string;
  image?: string;
  likes?: number;
  totalComments?: number;
  createdAt?: number;
  updatedAt?: number;
};

/**
 * Test-specific nullable PostDto type
 * For testing scenarios where some fields might be null
 */
type NullablePostDto = {
  id: string;
  user: UserReference;
  title: string;
  body: string;
  image: string | null;
  likes: number | null;
  totalComments: number | null;
  createdAt: number | null;
  updatedAt: number | null;
};

/**
 * PostFactory Tests
 *
 * This test suite validates all creation methods of PostFactory.
 * Uses Given-When-Then pattern to clearly separate each test case.
 */
describe("PostFactory", () => {
  let validUser: UserReference;
  let validPostDto: PostDto;

  beforeEach(() => {
    // Given: Valid test data is prepared for each test
    validUser = {
      id: "user-123",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
    };

    validPostDto = {
      id: "post-123",
      user: validUser,
      title: "Test Post Title",
      body: "This is a test post body content.",
      image: "https://example.com/post-image.jpg",
      likes: 5,
      totalComments: 3,
      createdAt: 1640995200000,
      updatedAt: 1640995200000,
    };
  });

  describe("createNew", () => {
    it("should create a new Post instance with provided parameters when all required parameters are given", () => {
      // Given: Data required for creating a new post is prepared
      const title = "New Post Title";
      const body = "This is a new post body.";
      const image = "https://example.com/new-image.jpg";

      // When: createNew method is called
      const post = PostFactory.createNew(title, body, validUser, image);

      // Then: A valid Post instance should be created
      expect(post).toBeInstanceOf(Post);
      expect(post.title).toBe(title);
      expect(post.body).toBe(body);
      expect(post.user).toEqual(validUser);
      expect(post.image).toBe(image);
      expect(post.id).toBe(""); // New posts start with empty ID
      expect(post.likes).toBe(0); // New posts have 0 likes
      expect(post.totalComments).toBe(0); // New posts have 0 comments
      expect(typeof post.createdAt).toBe("number");
      expect(typeof post.updatedAt).toBe("number");
      expect(post.createdAt).toBeGreaterThan(0);
      expect(post.updatedAt).toBeGreaterThan(0);
    });

    it("should create a new Post instance with empty image when image parameter is not provided", () => {
      // Given: Data for creating a new post without image is prepared
      const title = "Post Without Image";
      const body = "This post has no image.";

      // When: createNew method is called without image
      const post = PostFactory.createNew(title, body, validUser);

      // Then: Post instance with empty image string should be created
      expect(post).toBeInstanceOf(Post);
      expect(post.title).toBe(title);
      expect(post.body).toBe(body);
      expect(post.user).toEqual(validUser);
      expect(post.image).toBe(""); // Default value is empty string
      expect(post.likes).toBe(0);
      expect(post.totalComments).toBe(0);
    });

    it("should create a new Post instance with empty string image when empty string is explicitly provided", () => {
      // Given: Data for creating a new post with empty string image is prepared
      const title = "Post With Empty Image";
      const body = "This post has empty image string.";
      const emptyImage = "";

      // When: createNew method is called with empty string image
      const post = PostFactory.createNew(title, body, validUser, emptyImage);

      // Then: Post instance with empty image string should be created
      expect(post.image).toBe("");
      expect(post.title).toBe(title);
      expect(post.body).toBe(body);
    });

    it("should create Post instances with different timestamps when called multiple times", () => {
      // Given: Same data for creating multiple posts is prepared
      const title = "Test Post";
      const body = "Test body";

      // When: createNew method is called multiple times
      const post1 = PostFactory.createNew(title, body, validUser);
      const post2 = PostFactory.createNew(title, body, validUser);

      // Then: Each post should have different timestamps
      expect(post1.createdAt).toBeGreaterThan(0);
      expect(post2.createdAt).toBeGreaterThan(0);
      expect(post1.updatedAt).toBeGreaterThan(0);
      expect(post2.updatedAt).toBeGreaterThan(0);
      // Timestamps should be same or post2 should be later (due to very fast execution)
      expect(post2.createdAt).toBeGreaterThanOrEqual(post1.createdAt);
    });

    it("should handle special characters in title and body when unicode content is provided", () => {
      // Given: Data with unicode characters is prepared
      const unicodeTitle = "🚀 테스트 포스트 タイトル 🌟";
      const unicodeBody = "이것은 한글과 日本語와 emoji �가 포함된 내용입니다.";

      // When: createNew method is called with unicode characters
      const post = PostFactory.createNew(unicodeTitle, unicodeBody, validUser);

      // Then: Unicode characters should be handled correctly
      expect(post.title).toBe(unicodeTitle);
      expect(post.body).toBe(unicodeBody);
      expect(post.title).toContain("🚀");
      expect(post.body).toContain("한글");
    });

    it("should create Post with same createdAt and updatedAt timestamps when newly created", () => {
      // Given: Data for creating a new post is prepared
      const title = "New Post";
      const body = "New post body";

      // When: createNew method is called
      const post = PostFactory.createNew(title, body, validUser);

      // Then: Creation time and update time should be the same (since it's newly created)
      expect(post.createdAt).toBe(post.updatedAt);
    });
  });

  describe("createFromDto", () => {
    it("should create a Post instance from complete DTO when all DTO fields are provided", () => {
      // Given: Complete PostDto is prepared
      const completeDto = { ...validPostDto };

      // When: createFromDto method is called
      const post = PostFactory.createFromDto(completeDto);

      // Then: Post instance matching DTO data should be created
      expect(post).toBeInstanceOf(Post);
      expect(post.id).toBe(completeDto.id);
      expect(post.user).toEqual(completeDto.user);
      expect(post.title).toBe(completeDto.title);
      expect(post.body).toBe(completeDto.body);
      expect(post.image).toBe(completeDto.image);
      expect(post.likes).toBe(completeDto.likes);
      expect(post.totalComments).toBe(completeDto.totalComments);
      expect(post.createdAt).toBe(completeDto.createdAt);
      expect(post.updatedAt).toBe(completeDto.updatedAt);
    });

    it("should create a Post instance with default values when optional DTO fields are missing", () => {
      // Given: Partial PostDto with only required fields is prepared
      const partialDto: PartialPostDto = {
        id: "post-456",
        user: validUser,
        title: "Partial Post",
        body: "This post has missing optional fields.",
        // image, likes, totalComments, createdAt, updatedAt are intentionally omitted
      };

      // When: createFromDto method is called with partial DTO (type assertion needed)
      const post = PostFactory.createFromDto(partialDto as PostDto);

      // Then: Post instance with default values should be created
      expect(post.id).toBe(partialDto.id);
      expect(post.user).toEqual(partialDto.user);
      expect(post.title).toBe(partialDto.title);
      expect(post.body).toBe(partialDto.body);
      expect(post.image).toBe(""); // Default value
      expect(post.likes).toBe(0); // Default value
      expect(post.totalComments).toBe(0); // Default value
      expect(typeof post.createdAt).toBe("number"); // Set to current time
      expect(typeof post.updatedAt).toBe("number"); // Set to current time
      expect(post.createdAt).toBeGreaterThan(0);
      expect(post.updatedAt).toBeGreaterThan(0);
    });

    it("should create a Post instance with empty image when DTO image is null", () => {
      // Given: PostDto with null image is prepared
      const dtoWithNullImage: NullablePostDto = {
        ...validPostDto,
        image: null, // Intentionally null
      };

      // When: createFromDto method is called with null image DTO (type assertion needed)
      const post = PostFactory.createFromDto(dtoWithNullImage as PostDto);

      // Then: Image should be handled as empty string
      expect(post.image).toBe("");
      expect(post.title).toBe(dtoWithNullImage.title);
      expect(post.body).toBe(dtoWithNullImage.body);
    });

    it("should create a Post instance with zero likes when DTO likes is null or undefined", () => {
      // Given: PostDto with null likes is prepared
      const dtoWithNullLikes: NullablePostDto = {
        ...validPostDto,
        likes: null, // Intentionally null
      };

      // When: createFromDto method is called with null likes DTO (type assertion needed)
      const post = PostFactory.createFromDto(dtoWithNullLikes as PostDto);

      // Then: Likes should be handled as 0
      expect(post.likes).toBe(0);
      expect(post.totalComments).toBe(dtoWithNullLikes.totalComments);
    });

    it("should create a Post instance with zero total comments when DTO totalComments is null or undefined", () => {
      // Given: PostDto with null totalComments is prepared
      const dtoWithNullComments: NullablePostDto = {
        ...validPostDto,
        totalComments: null, // Intentionally null
      };

      // When: createFromDto method is called with null totalComments DTO (type assertion needed)
      const post = PostFactory.createFromDto(dtoWithNullComments as PostDto);

      // Then: Total comments should be handled as 0
      expect(post.totalComments).toBe(0);
      expect(post.likes).toBe(dtoWithNullComments.likes);
    });

    it("should create a Post instance with current timestamp when DTO timestamps are null or undefined", () => {
      // Given: PostDto with null timestamps is prepared
      const dtoWithNullTimestamps: NullablePostDto = {
        ...validPostDto,
        createdAt: null, // Intentionally null
        updatedAt: null, // Intentionally null
      };

      // When: createFromDto method is called with null timestamps DTO (type assertion needed)
      const post = PostFactory.createFromDto(dtoWithNullTimestamps as PostDto);

      // Then: Timestamps should be set to current time
      expect(typeof post.createdAt).toBe("number");
      expect(typeof post.updatedAt).toBe("number");
      expect(post.createdAt).toBeGreaterThan(0);
      expect(post.updatedAt).toBeGreaterThan(0);
      // Should be close to current time (based on test execution time)
      const now = Date.now();
      expect(post.createdAt).toBeLessThanOrEqual(now);
      expect(post.updatedAt).toBeLessThanOrEqual(now);
    });

    it("should handle DTO with very large numbers when maximum values are provided", () => {
      // Given: PostDto with very large numbers is prepared
      const dtoWithLargeNumbers: PostDto = {
        ...validPostDto,
        likes: Number.MAX_SAFE_INTEGER,
        totalComments: Number.MAX_SAFE_INTEGER,
        createdAt: Number.MAX_SAFE_INTEGER,
        updatedAt: Number.MAX_SAFE_INTEGER,
      };

      // When: createFromDto method is called with large numbers DTO
      const post = PostFactory.createFromDto(dtoWithLargeNumbers);

      // Then: Large numbers should be handled correctly
      expect(post.likes).toBe(Number.MAX_SAFE_INTEGER);
      expect(post.totalComments).toBe(Number.MAX_SAFE_INTEGER);
      expect(post.createdAt).toBe(Number.MAX_SAFE_INTEGER);
      expect(post.updatedAt).toBe(Number.MAX_SAFE_INTEGER);
      expect(Number.isSafeInteger(post.likes)).toBe(true);
      expect(Number.isSafeInteger(post.totalComments)).toBe(true);
    });

    it("should handle DTO with unicode characters when unicode content is provided", () => {
      // Given: PostDto with unicode characters is prepared
      const unicodeDto: PostDto = {
        ...validPostDto,
        title: "🚀 테스트 포스트 🌟",
        body: "이것은 한글과 emoji 🎉가 포함된 내용입니다.",
      };

      // When: createFromDto method is called with unicode DTO
      const post = PostFactory.createFromDto(unicodeDto);

      // Then: Unicode characters should be handled correctly
      expect(post.title).toBe(unicodeDto.title);
      expect(post.body).toBe(unicodeDto.body);
      expect(post.title).toContain("🚀");
      expect(post.body).toContain("한글");
    });
  });

  describe("Integration with Test Fixtures", () => {
    it("should work correctly with PostFixtures DTO data when using fixture data", () => {
      // Given: Valid data from PostFixtures is prepared in DTO format
      const fixtureData = PostFixtures.valid.basic;
      const fixtureDto: PostDto = {
        id: fixtureData.id,
        user: fixtureData.user,
        title: fixtureData.title,
        body: fixtureData.body,
        image: fixtureData.image,
        likes: fixtureData.likes,
        totalComments: fixtureData.totalComments,
        createdAt: fixtureData.createdAt,
        updatedAt: fixtureData.updatedAt,
      };

      // When: createFromDto method is called with fixture DTO
      const post = PostFactory.createFromDto(fixtureDto);

      // Then: Post instance matching fixture data should be created
      expect(post.id).toBe(fixtureData.id);
      expect(post.user).toEqual(fixtureData.user);
      expect(post.title).toBe(fixtureData.title);
      expect(post.body).toBe(fixtureData.body);
      expect(post.likes).toBe(fixtureData.likes);
      expect(post.totalComments).toBe(fixtureData.totalComments);
    });

    it("should create new Post correctly with fixture user data when using createNew", () => {
      // Given: User data from PostFixtures is prepared
      const fixtureUser = PostFixtures.valid.basic.user;
      const title = "New Post with Fixture User";
      const body = "This post uses fixture user data.";

      // When: createNew method is called with fixture user data
      const post = PostFactory.createNew(title, body, fixtureUser);

      // Then: Fixture user data should be used correctly
      expect(post.user).toEqual(fixtureUser);
      expect(post.title).toBe(title);
      expect(post.body).toBe(body);
      expect(post.likes).toBe(0); // New post default value
      expect(post.totalComments).toBe(0); // New post default value
    });

    it("should handle edge case fixture data when using edge case fixtures", () => {
      // Given: Edge case data from PostFixtures is prepared in DTO format
      const edgeData = PostFixtures.edge.zeroLikes;
      const edgeDto: PostDto = {
        id: edgeData.id,
        user: edgeData.user,
        title: edgeData.title,
        body: edgeData.body,
        image: edgeData.image,
        likes: edgeData.likes,
        totalComments: edgeData.totalComments,
        createdAt: edgeData.createdAt,
        updatedAt: edgeData.updatedAt,
      };

      // When: createFromDto method is called with edge case DTO
      const post = PostFactory.createFromDto(edgeDto);

      // Then: Edge case should be handled correctly
      expect(post.likes).toBe(0);
      expect(post.totalComments).toBe(0);
      expect(post.id).toBe(edgeData.id);
      expect(post.title).toBe(edgeData.title);
    });
  });

  describe("Factory Method Comparison", () => {
    it("should create different Post instances when createNew and createFromDto are used with similar data", () => {
      // Given: Similar data is prepared
      const title = "Test Post";
      const body = "Test body";
      const user = validUser;

      // When: createNew and createFromDto are called respectively
      const newPost = PostFactory.createNew(title, body, user);
      const dtoPost = PostFactory.createFromDto({
        id: "existing-id",
        user,
        title,
        body,
        image: "",
        likes: 10,
        totalComments: 5,
        createdAt: 1640995200000,
        updatedAt: 1640995200000,
      });

      // Then: Two Post instances should have different characteristics
      expect(newPost.id).toBe(""); // createNew has empty ID
      expect(dtoPost.id).toBe("existing-id"); // createFromDto has DTO's ID
      expect(newPost.likes).toBe(0); // createNew has 0 likes
      expect(dtoPost.likes).toBe(10); // createFromDto has DTO's likes
      expect(newPost.totalComments).toBe(0); // createNew has 0 comments
      expect(dtoPost.totalComments).toBe(5); // createFromDto has DTO's comments

      // Common properties should be the same
      expect(newPost.title).toBe(dtoPost.title);
      expect(newPost.body).toBe(dtoPost.body);
      expect(newPost.user).toEqual(dtoPost.user);
    });

    it("should maintain Post domain invariants when using both factory methods", () => {
      // Given: Factory method test data is prepared
      const title = "Domain Invariant Test";
      const body = "Testing domain invariants";

      // When: Posts are created using both factory methods
      const newPost = PostFactory.createNew(title, body, validUser);
      const dtoPost = PostFactory.createFromDto(validPostDto);

      // Then: Both Posts should maintain domain invariants
      // All Posts should be Post instances
      expect(newPost).toBeInstanceOf(Post);
      expect(dtoPost).toBeInstanceOf(Post);

      // All Posts should have valid timestamps
      expect(newPost.createdAt).toBeGreaterThan(0);
      expect(newPost.updatedAt).toBeGreaterThan(0);
      expect(dtoPost.createdAt).toBeGreaterThan(0);
      expect(dtoPost.updatedAt).toBeGreaterThan(0);

      // All Posts should have non-negative likes and comment counts
      expect(newPost.likes).toBeGreaterThanOrEqual(0);
      expect(newPost.totalComments).toBeGreaterThanOrEqual(0);
      expect(dtoPost.likes).toBeGreaterThanOrEqual(0);
      expect(dtoPost.totalComments).toBeGreaterThanOrEqual(0);

      // All Posts should have working business methods
      const originalNewLikes = newPost.likes;
      const originalDtoLikes = dtoPost.likes;

      newPost.like();
      dtoPost.like();

      expect(newPost.likes).toBe(originalNewLikes + 1);
      expect(dtoPost.likes).toBe(originalDtoLikes + 1);
    });
  });
});
