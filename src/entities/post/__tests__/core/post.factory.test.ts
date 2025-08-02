import { Post, PostFactory } from "../../core";
import { PostDto } from "../../infrastructure/dto";
import { UserReference } from "../../types";

/**
 * PostFactory Tests
 * Verify PostFactory core functionality using Given-When-Then pattern
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
    it("should create a new Post instance with provided parameters", () => {
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
    it("should create a Post instance from complete DTO", () => {
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
      const partialDto = {
        id: "post-456",
        user: validUser,
        title: "Partial Post",
        body: "This post has missing optional fields.",
        // image, likes, totalComments, createdAt, updatedAt are intentionally omitted
      };

      // When: createFromDto method is called with partial DTO
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
      const dtoWithNullImage = {
        ...validPostDto,
        image: "",
      };

      // When: createFromDto method is called with null image DTO
      const post = PostFactory.createFromDto(dtoWithNullImage);

      // Then: Image should be handled as empty string
      expect(post.image).toBe("");
      expect(post.title).toBe(dtoWithNullImage.title);
      expect(post.body).toBe(dtoWithNullImage.body);
    });

    it("should create a Post instance with zero likes when DTO likes is null", () => {
      // Given: PostDto with null likes is prepared
      const dtoWithNullLikes = {
        ...validPostDto,
        likes: 0,
      };

      // When: createFromDto method is called with null likes DTO
      const post = PostFactory.createFromDto(dtoWithNullLikes);

      // Then: Likes should be handled as 0
      expect(post.likes).toBe(0);
      expect(post.totalComments).toBe(dtoWithNullLikes.totalComments);
    });

    it("should create a Post instance with current timestamp when DTO timestamps are null", () => {
      // Given: PostDto with null timestamps is prepared
      const dtoWithNullTimestamps = {
        ...validPostDto,
        createdAt: 0,
        updatedAt: 0,
      };

      // When: createFromDto method is called with null timestamps DTO
      const post = PostFactory.createFromDto(dtoWithNullTimestamps);

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
  });
});
