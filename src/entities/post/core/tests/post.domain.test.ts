import { PostFixtures } from "../../__tests__/fixtures/post.fixtures";
import { UserReference } from "../../types";
import { Post } from "../post.domain";

/**
 * Post Domain Model Tests
 *
 * This test suite validates the Post domain object's constructor, getter methods, and business methods.
 * Uses Given-When-Then pattern to clearly separate each test case.
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
    it("should create a Post instance with valid data when all parameters are provided", () => {
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

    it("should create a Post instance with empty image when image is empty string", () => {
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

    it("should create a Post instance with zero likes when likes is zero", () => {
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

  describe("Getter Methods", () => {
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

    it("should return correct id when id getter is called", () => {
      // Given: Post instance is created
      // When: id getter is called
      const result = post.id;

      // Then: Correct id should be returned
      expect(result).toBe(validPostData.id);
      expect(typeof result).toBe("string");
    });

    it("should return correct user reference when user getter is called", () => {
      // Given: Post instance is created
      // When: user getter is called
      const result = post.user;

      // Then: Correct user reference should be returned
      expect(result).toEqual(validPostData.user);
      expect(result.id).toBe(validPostData.user.id);
      expect(result.username).toBe(validPostData.user.username);
      expect(result.profileImage).toBe(validPostData.user.profileImage);
    });

    it("should return correct title when title getter is called", () => {
      // Given: Post instance is created
      // When: title getter is called
      const result = post.title;

      // Then: Correct title should be returned
      expect(result).toBe(validPostData.title);
      expect(typeof result).toBe("string");
    });

    it("should return correct body when body getter is called", () => {
      // Given: Post instance is created
      // When: body getter is called
      const result = post.body;

      // Then: Correct body should be returned
      expect(result).toBe(validPostData.body);
      expect(typeof result).toBe("string");
    });

    it("should return correct image when image getter is called", () => {
      // Given: Post instance is created
      // When: image getter is called
      const result = post.image;

      // Then: Correct image URL should be returned
      expect(result).toBe(validPostData.image);
      expect(typeof result).toBe("string");
    });

    it("should return correct likes count when likes getter is called", () => {
      // Given: Post instance is created
      // When: likes getter is called
      const result = post.likes;

      // Then: Correct likes count should be returned
      expect(result).toBe(validPostData.likes);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should return correct total comments count when totalComments getter is called", () => {
      // Given: Post instance is created
      // When: totalComments getter is called
      const result = post.totalComments;

      // Then: Correct comments count should be returned
      expect(result).toBe(validPostData.totalComments);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should return correct created timestamp when createdAt getter is called", () => {
      // Given: Post instance is created
      // When: createdAt getter is called
      const result = post.createdAt;

      // Then: Correct creation time should be returned
      expect(result).toBe(validPostData.createdAt);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should return correct updated timestamp when updatedAt getter is called", () => {
      // Given: Post instance is created
      // When: updatedAt getter is called
      const result = post.updatedAt;

      // Then: Correct update time should be returned
      expect(result).toBe(validPostData.updatedAt);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
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
      it("should update title and updatedAt timestamp when valid new title is provided", () => {
        // Given: Post instance and new title are prepared
        const newTitle = "Updated Post Title";
        const originalUpdatedAt = post.updatedAt;

        // When: updateTitle method is called
        post.updateTitle(newTitle);

        // Then: Title and update time should be updated
        expect(post.title).toBe(newTitle);
        expect(post.updatedAt).toBeGreaterThan(originalUpdatedAt);
        expect(typeof post.updatedAt).toBe("number");
      });

      it("should update title to empty string when empty string is provided", () => {
        // Given: Post instance and empty string are prepared
        const emptyTitle = "";
        const originalUpdatedAt = post.updatedAt;

        // When: updateTitle method is called with empty string
        post.updateTitle(emptyTitle);

        // Then: Title should be updated to empty string
        expect(post.title).toBe("");
        expect(post.updatedAt).toBeGreaterThan(originalUpdatedAt);
      });

      it("should update title with special characters when special characters are provided", () => {
        // Given: Post instance and title with special characters are prepared
        const specialTitle = "제목 with émojis 🚀 & symbols!@#$%";
        const originalUpdatedAt = post.updatedAt;

        // When: updateTitle method is called with special characters
        post.updateTitle(specialTitle);

        // Then: Title should be updated with special characters
        expect(post.title).toBe(specialTitle);
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
      it("should update body and updatedAt timestamp when valid new body is provided", () => {
        // Given: Post instance and new body are prepared
        const newBody = "This is the updated post body content.";
        const originalUpdatedAt = post.updatedAt;

        // When: updateBody method is called
        post.updateBody(newBody);

        // Then: Body and update time should be updated
        expect(post.body).toBe(newBody);
        expect(post.updatedAt).toBeGreaterThan(originalUpdatedAt);
        expect(typeof post.updatedAt).toBe("number");
      });

      it("should update body to empty string when empty string is provided", () => {
        // Given: Post instance and empty string are prepared
        const emptyBody = "";
        const originalUpdatedAt = post.updatedAt;

        // When: updateBody method is called with empty string
        post.updateBody(emptyBody);

        // Then: Body should be updated to empty string
        expect(post.body).toBe("");
        expect(post.updatedAt).toBeGreaterThan(originalUpdatedAt);
      });

      it("should update body with long content when long text is provided", () => {
        // Given: Post instance and long body are prepared
        const longBody = "This is a very long body content. ".repeat(100);
        const originalUpdatedAt = post.updatedAt;

        // When: updateBody method is called with long text
        post.updateBody(longBody);

        // Then: Body should be updated with long content
        expect(post.body).toBe(longBody);
        expect(post.body.length).toBeGreaterThan(1000);
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
      it("should increment likes count by 1 when like method is called", () => {
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

      it("should allow multiple consecutive likes when like method is called multiple times", () => {
        // Given: Post instance is prepared
        const originalLikes = post.likes;

        // When: like method is called multiple times
        post.like();
        post.like();
        post.like();

        // Then: Likes count should be incremented by 3
        expect(post.likes).toBe(originalLikes + 3);
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
      it("should decrement likes count by 1 when unlike method is called and likes > 0", () => {
        // Given: Post instance with likes is prepared
        const originalLikes = post.likes; // 5 likes

        // When: unlike method is called
        post.unlike();

        // Then: Likes count should be decremented by 1
        expect(post.likes).toBe(originalLikes - 1);
      });

      it("should not decrement likes below 0 when unlike method is called and likes is 0", () => {
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

      it("should handle multiple consecutive unlikes correctly when likes count allows", () => {
        // Given: Post instance with 3 likes is prepared
        const postWithThreeLikes = new Post(
          validPostData.id,
          validPostData.user,
          validPostData.title,
          validPostData.body,
          validPostData.image,
          3,
          validPostData.totalComments,
          validPostData.createdAt,
          validPostData.updatedAt
        );

        // When: unlike method is called multiple times
        postWithThreeLikes.unlike(); // 3 -> 2
        postWithThreeLikes.unlike(); // 2 -> 1
        postWithThreeLikes.unlike(); // 1 -> 0
        postWithThreeLikes.unlike(); // 0 -> 0 (no change)

        // Then: Likes count should stop at 0
        expect(postWithThreeLikes.likes).toBe(0);
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

  describe("Edge Cases and Error Scenarios", () => {
    describe("Constructor Edge Cases", () => {
      it("should handle very large likes count when maximum safe integer is provided", () => {
        // Given: Very large likes count is prepared
        const largeLikes = Number.MAX_SAFE_INTEGER;
        const {
          id,
          user,
          title,
          body,
          image,
          totalComments,
          createdAt,
          updatedAt,
        } = validPostData;

        // When: Post instance is created with very large likes count
        const post = new Post(
          id,
          user,
          title,
          body,
          image,
          largeLikes,
          totalComments,
          createdAt,
          updatedAt
        );

        // Then: Large number should be handled correctly
        expect(post.likes).toBe(largeLikes);
        expect(Number.isSafeInteger(post.likes)).toBe(true);
      });

      it("should handle very old timestamps when ancient dates are provided", () => {
        // Given: Very old timestamp is prepared
        const ancientTimestamp = 0; // 1970-01-01
        const { id, user, title, body, image, likes, totalComments } =
          validPostData;

        // When: Post instance is created with old timestamp
        const post = new Post(
          id,
          user,
          title,
          body,
          image,
          likes,
          totalComments,
          ancientTimestamp,
          ancientTimestamp
        );

        // Then: Old timestamp should be handled correctly
        expect(post.createdAt).toBe(ancientTimestamp);
        expect(post.updatedAt).toBe(ancientTimestamp);
      });

      it("should handle unicode characters in title and body when unicode content is provided", () => {
        // Given: Data with unicode characters is prepared
        const unicodeTitle = "🚀 테스트 포스트 タイトル 🌟";
        const unicodeBody =
          "이것은 한글과 日本語와 emoji 🎉가 포함된 내용입니다.";
        const { id, user, image, likes, totalComments, createdAt, updatedAt } =
          validPostData;

        // When: Post instance is created with unicode characters
        const post = new Post(
          id,
          user,
          unicodeTitle,
          unicodeBody,
          image,
          likes,
          totalComments,
          createdAt,
          updatedAt
        );

        // Then: Unicode characters should be handled correctly
        expect(post.title).toBe(unicodeTitle);
        expect(post.body).toBe(unicodeBody);
        expect(post.title).toContain("🚀");
        expect(post.body).toContain("🎉");
      });
    });

    describe("Business Method Edge Cases", () => {
      it("should handle like method when likes is at maximum safe integer", () => {
        // Given: Post instance with maximum safe integer likes is prepared
        const maxLikesPost = new Post(
          validPostData.id,
          validPostData.user,
          validPostData.title,
          validPostData.body,
          validPostData.image,
          Number.MAX_SAFE_INTEGER,
          validPostData.totalComments,
          validPostData.createdAt,
          validPostData.updatedAt
        );

        // When: like method is called
        maxLikesPost.like();

        // Then: System should work stably even with overflow
        expect(maxLikesPost.likes).toBeGreaterThan(Number.MAX_SAFE_INTEGER);
      });

      it("should handle rapid successive like and unlike operations when called alternately", () => {
        // Given: Post instance is prepared
        const testPost = new Post(
          validPostData.id,
          validPostData.user,
          validPostData.title,
          validPostData.body,
          validPostData.image,
          validPostData.likes,
          validPostData.totalComments,
          validPostData.createdAt,
          validPostData.updatedAt
        );
        const originalLikes = testPost.likes;

        // When: like and unlike are called alternately
        testPost.like(); // +1
        testPost.unlike(); // -1
        testPost.like(); // +1
        testPost.like(); // +1
        testPost.unlike(); // -1

        // Then: Final likes count should be calculated correctly
        expect(testPost.likes).toBe(originalLikes + 1); // original + 1
      });
    });
  });

  describe("Integration with Test Fixtures", () => {
    it("should work correctly with PostFixtures valid data when using fixture data", () => {
      // Given: Valid data from PostFixtures is prepared
      const fixtureData = PostFixtures.valid.basic;

      // When: Post instance is created with fixture data
      const post = new Post(
        fixtureData.id,
        fixtureData.user,
        fixtureData.title,
        fixtureData.body,
        fixtureData.image,
        fixtureData.likes,
        fixtureData.totalComments,
        fixtureData.createdAt,
        fixtureData.updatedAt
      );

      // Then: Post instance matching fixture data should be created
      expect(post.id).toBe(fixtureData.id);
      expect(post.user).toEqual(fixtureData.user);
      expect(post.title).toBe(fixtureData.title);
      expect(post.body).toBe(fixtureData.body);
      expect(post.likes).toBe(fixtureData.likes);
    });

    it("should handle edge case fixture data when using edge case fixtures", () => {
      // Given: Edge case data from PostFixtures is prepared
      const edgeData = PostFixtures.edge.zeroLikes;

      // When: Post instance is created with edge case data
      const post = new Post(
        edgeData.id,
        edgeData.user,
        edgeData.title,
        edgeData.body,
        edgeData.image,
        edgeData.likes,
        edgeData.totalComments,
        edgeData.createdAt,
        edgeData.updatedAt
      );

      // Then: Edge case should be handled correctly
      expect(post.likes).toBe(0);
      expect(post.totalComments).toBe(0);

      // Like functionality should work normally
      post.like();
      expect(post.likes).toBe(1);

      post.unlike();
      expect(post.likes).toBe(0);
    });
  });
});
