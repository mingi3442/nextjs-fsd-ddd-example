import { Post } from "../../core";
import { UserReference } from "../../types";

/**
 * Post Domain Model Tests
 * Verify Post domain object core functionality using Given-When-Then pattern
 */
describe("Post Domain Model", () => {
  let validPostData: {
    id: string;
    user: UserReference;
    title: string;
    body: string;
    image: string;
    likes: number;
    totalComments: number;
    createdAt: number;
    updatedAt: number;
  };

  beforeEach(() => {
    // Given: Valid post data is prepared for each test
    validPostData = {
      id: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      },
      title: "Test Post Title",
      body: "This is a test post body content.",
      image: "https://example.com/post-image.jpg",
      likes: 5,
      totalComments: 3,
      createdAt: 1640995200000,
      updatedAt: 1640995200000,
    };
  });

  describe("Constructor", () => {
    it("should create a Post instance with valid data", () => {
      // Given: Valid post data is prepared
      const {
        id,
        user,
        title,
        body,
        image,
        likes,
        totalComments,
        createdAt,
        updatedAt,
      } = validPostData;

      // When: Post instance is created
      const post = new Post(
        id,
        user,
        title,
        body,
        image,
        likes,
        totalComments,
        createdAt,
        updatedAt
      );

      // Then: Post instance should be created correctly
      expect(post).toBeInstanceOf(Post);
      expect(post.id).toBe(id);
      expect(post.user).toEqual(user);
      expect(post.title).toBe(title);
      expect(post.body).toBe(body);
      expect(post.image).toBe(image);
      expect(post.likes).toBe(likes);
      expect(post.totalComments).toBe(totalComments);
      expect(post.createdAt).toBe(createdAt);
      expect(post.updatedAt).toBe(updatedAt);
    });

    it("should create a Post instance with empty image", () => {
      // Given: Post data with empty image string is prepared
      const postDataWithoutImage = { ...validPostData, image: "" };
      const {
        id,
        user,
        title,
        body,
        image,
        likes,
        totalComments,
        createdAt,
        updatedAt,
      } = postDataWithoutImage;

      // When: Post instance is created
      const post = new Post(
        id,
        user,
        title,
        body,
        image,
        likes,
        totalComments,
        createdAt,
        updatedAt
      );

      // Then: Image should be set to empty string
      expect(post.image).toBe("");
      expect(post.title).toBe(title);
      expect(post.body).toBe(body);
    });

    it("should create a Post instance with zero likes", () => {
      // Given: Post data with zero likes is prepared
      const postDataWithZeroLikes = { ...validPostData, likes: 0 };
      const {
        id,
        user,
        title,
        body,
        image,
        likes,
        totalComments,
        createdAt,
        updatedAt,
      } = postDataWithZeroLikes;

      // When: Post instance is created
      const post = new Post(
        id,
        user,
        title,
        body,
        image,
        likes,
        totalComments,
        createdAt,
        updatedAt
      );

      // Then: Likes should be set to 0
      expect(post.likes).toBe(0);
      expect(post.totalComments).toBe(totalComments);
    });
  });

  describe("Business Methods", () => {
    let post: Post;

    beforeEach(() => {
      // Given: Test Post instance is prepared
      const {
        id,
        user,
        title,
        body,
        image,
        likes,
        totalComments,
        createdAt,
        updatedAt,
      } = validPostData;
      post = new Post(
        id,
        user,
        title,
        body,
        image,
        likes,
        totalComments,
        createdAt,
        updatedAt
      );
    });

    describe("updateTitle", () => {
      it("should update title and updatedAt timestamp", () => {
        // Given: Post instance and new title are prepared
        const newTitle = "Updated Post Title";
        const originalUpdatedAt = post.updatedAt;

        // When: updateTitle method is called
        post.updateTitle(newTitle);

        // Then: Title and update time should be updated
        expect(post.title).toBe(newTitle);
        expect(post.updatedAt).toBeGreaterThan(originalUpdatedAt);
      });

      it("should not affect other properties when title is updated", () => {
        // Given: Post instance and new title are prepared
        const newTitle = "New Title";
        const originalBody = post.body;
        const originalLikes = post.likes;
        const originalId = post.id;

        // When: updateTitle method is called
        post.updateTitle(newTitle);

        // Then: Other properties should not be changed
        expect(post.body).toBe(originalBody);
        expect(post.likes).toBe(originalLikes);
        expect(post.id).toBe(originalId);
        expect(post.totalComments).toBe(validPostData.totalComments);
      });
    });

    describe("updateBody", () => {
      it("should update body and updatedAt timestamp", () => {
        // Given: Post instance and new body are prepared
        const newBody = "This is the updated post body content.";
        const originalUpdatedAt = post.updatedAt;

        // When: updateBody method is called
        post.updateBody(newBody);

        // Then: Body and update time should be updated
        expect(post.body).toBe(newBody);
        expect(post.updatedAt).toBeGreaterThan(originalUpdatedAt);
      });

      it("should not affect other properties when body is updated", () => {
        // Given: Post instance and new body are prepared
        const newBody = "New body content";
        const originalTitle = post.title;
        const originalLikes = post.likes;
        const originalId = post.id;

        // When: updateBody method is called
        post.updateBody(newBody);

        // Then: Other properties should not be changed
        expect(post.title).toBe(originalTitle);
        expect(post.likes).toBe(originalLikes);
        expect(post.id).toBe(originalId);
        expect(post.totalComments).toBe(validPostData.totalComments);
      });
    });

    describe("like", () => {
      it("should increment likes count by 1", () => {
        // Given: Post instance is prepared
        const originalLikes = post.likes;

        // When: like method is called
        post.like();

        // Then: Likes count should be incremented by 1
        expect(post.likes).toBe(originalLikes + 1);
      });

      it("should increment likes from 0 to 1 when post has no likes initially", () => {
        // Given: Post instance with zero likes is prepared
        const postWithZeroLikes = new Post(
          validPostData.id,
          validPostData.user,
          validPostData.title,
          validPostData.body,
          validPostData.image,
          0, // 0 likes
          validPostData.totalComments,
          validPostData.createdAt,
          validPostData.updatedAt
        );

        // When: like method is called
        postWithZeroLikes.like();

        // Then: Likes count should become 1
        expect(postWithZeroLikes.likes).toBe(1);
      });

      it("should not affect other properties when like is called", () => {
        // Given: Post instance is prepared
        const originalTitle = post.title;
        const originalBody = post.body;
        const originalUpdatedAt = post.updatedAt;

        // When: like method is called
        post.like();

        // Then: Other properties should not be changed
        expect(post.title).toBe(originalTitle);
        expect(post.body).toBe(originalBody);
        expect(post.updatedAt).toBe(originalUpdatedAt); // like does not change updatedAt
      });
    });

    describe("unlike", () => {
      it("should decrement likes count by 1 when likes > 0", () => {
        // Given: Post instance with likes is prepared
        const originalLikes = post.likes; // 5 likes

        // When: unlike method is called
        post.unlike();

        // Then: Likes count should be decremented by 1
        expect(post.likes).toBe(originalLikes - 1);
      });

      it("should not decrement likes below 0", () => {
        // Given: Post instance with zero likes is prepared
        const postWithZeroLikes = new Post(
          validPostData.id,
          validPostData.user,
          validPostData.title,
          validPostData.body,
          validPostData.image,
          0, // 0 likes
          validPostData.totalComments,
          validPostData.createdAt,
          validPostData.updatedAt
        );

        // When: unlike method is called
        postWithZeroLikes.unlike();

        // Then: Likes count should not go below 0
        expect(postWithZeroLikes.likes).toBe(0);
      });

      it("should not affect other properties when unlike is called", () => {
        // Given: Post instance is prepared
        const originalTitle = post.title;
        const originalBody = post.body;
        const originalUpdatedAt = post.updatedAt;

        // When: unlike method is called
        post.unlike();

        // Then: Other properties should not be changed
        expect(post.title).toBe(originalTitle);
        expect(post.body).toBe(originalBody);
        expect(post.updatedAt).toBe(originalUpdatedAt); // unlike does not change updatedAt
      });
    });
  });
});
