import { TestDataHelpers } from "@/shared/libs/__tests__";
import { PostEntity, UserReference } from "../../types";

/**
 * Post 도메인 테스트 픽스처
 * Post 엔티티 관련 테스트에서 재사용 가능한 테스트 데이터 제공
 */
export const PostFixtures = {
  /**
   * 유효한 게시글 데이터 세트
   */
  valid: {
    // Basic post data
    basic: {
      id: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      title: "Test Post Title",
      body: "This is a test post body content.",
      image: "https://example.com/post-image.jpg",
      likes: 5,
      totalComments: 3,
      createdAt: TestDataHelpers.generateTimestamp(-86400000), // 1일 전
      updatedAt: TestDataHelpers.generateTimestamp(-3600000), // 1시간 전
    } as PostEntity,

    // Post without image
    withoutImage: {
      id: "post-456",
      user: {
        id: "user-456",
        username: "noimage",
        profileImage: "",
      } as UserReference,
      title: "Post Without Image",
      body: "This post has no image attached.",
      image: "",
      likes: 0,
      totalComments: 0,
      createdAt: TestDataHelpers.generateTimestamp(-172800000), // 2일 전
      updatedAt: TestDataHelpers.generateTimestamp(-172800000),
    } as PostEntity,

    // Post with many likes
    popularPost: {
      id: "post-popular",
      user: {
        id: "user-popular",
        username: "popular_user",
        profileImage: "https://example.com/popular.jpg",
      } as UserReference,
      title: "Very Popular Post",
      body: "This post has received many likes and comments.",
      image: "https://example.com/popular-post.jpg",
      likes: 1000,
      totalComments: 250,
      createdAt: TestDataHelpers.generateTimestamp(-604800000), // 1주일 전
      updatedAt: TestDataHelpers.generateTimestamp(-86400000), // 1일 전
    } as PostEntity,

    // Post with long title and content
    longContent: {
      id: "post-long",
      user: {
        id: "user-long",
        username: "verbose_user",
        profileImage: "https://example.com/verbose.jpg",
      } as UserReference,
      title:
        "This is a very long title that contains many words and describes the post content in great detail",
      body: "This is a very long post body that contains multiple paragraphs and extensive content. ".repeat(
        10
      ),
      image: "https://example.com/long-post.jpg",
      likes: 15,
      totalComments: 8,
      createdAt: TestDataHelpers.generateTimestamp(-259200000), // 3일 전
      updatedAt: TestDataHelpers.generateTimestamp(-7200000), // 2시간 전
    } as PostEntity,
  },

  /**
   * 무효한 게시글 데이터 세트 (에러 테스트용)
   */
  invalid: {
    // Empty title
    emptyTitle: {
      id: "post-empty-title",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      title: "",
      body: "This post has an empty title.",
      image: "https://example.com/post.jpg",
      likes: 0,
      totalComments: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as PostEntity,

    // Empty body
    emptyBody: {
      id: "post-empty-body",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      title: "Post with Empty Body",
      body: "",
      image: "https://example.com/post.jpg",
      likes: 0,
      totalComments: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as PostEntity,

    // Invalid user reference
    invalidUser: {
      id: "post-invalid-user",
      user: {
        id: "",
        username: "",
        profileImage: "",
      } as UserReference,
      title: "Post with Invalid User",
      body: "This post has invalid user reference.",
      image: "https://example.com/post.jpg",
      likes: 0,
      totalComments: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as PostEntity,

    // Negative likes count
    negativeLikes: {
      id: "post-negative-likes",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      title: "Post with Negative Likes",
      body: "This post has negative likes count.",
      image: "https://example.com/post.jpg",
      likes: -5,
      totalComments: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as PostEntity,
  },

  /**
   * 엣지 케이스 데이터 세트
   */
  edge: {
    // Post with zero likes
    zeroLikes: {
      id: "post-zero-likes",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      title: "Post with Zero Likes",
      body: "This post has no likes yet.",
      image: "https://example.com/post.jpg",
      likes: 0,
      totalComments: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as PostEntity,

    // Post with maximum likes
    maxLikes: {
      id: "post-max-likes",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      title: "Post with Maximum Likes",
      body: "This post has reached maximum likes.",
      image: "https://example.com/post.jpg",
      likes: Number.MAX_SAFE_INTEGER,
      totalComments: 1000000,
      createdAt: TestDataHelpers.generateTimestamp(-31536000000), // 1년 전
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as PostEntity,

    // Post with same creation and update timestamps
    sameTimestamps: {
      id: "post-same-timestamps",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      title: "Post with Same Timestamps",
      body: "This post was never updated.",
      image: "https://example.com/post.jpg",
      likes: 2,
      totalComments: 1,
      createdAt: 1640995200000, // Fixed timestamp
      updatedAt: 1640995200000, // Same timestamp
    } as PostEntity,
  },

  /**
   * 여러 게시글 데이터 배열
   */
  multiple: [
    {
      id: "post-1",
      user: {
        id: "user-1",
        username: "user1",
        profileImage: "https://example.com/user1.jpg",
      } as UserReference,
      title: "First Post",
      body: "This is the first post.",
      image: "https://example.com/post1.jpg",
      likes: 10,
      totalComments: 5,
      createdAt: TestDataHelpers.generateTimestamp(-86400000),
      updatedAt: TestDataHelpers.generateTimestamp(-86400000),
    },
    {
      id: "post-2",
      user: {
        id: "user-2",
        username: "user2",
        profileImage: "https://example.com/user2.jpg",
      } as UserReference,
      title: "Second Post",
      body: "This is the second post.",
      image: "",
      likes: 7,
      totalComments: 3,
      createdAt: TestDataHelpers.generateTimestamp(-172800000),
      updatedAt: TestDataHelpers.generateTimestamp(-172800000),
    },
    {
      id: "post-3",
      user: {
        id: "user-3",
        username: "user3",
        profileImage: "",
      } as UserReference,
      title: "Third Post",
      body: "This is the third post.",
      image: "https://example.com/post3.jpg",
      likes: 0,
      totalComments: 0,
      createdAt: TestDataHelpers.generateTimestamp(-259200000),
      updatedAt: TestDataHelpers.generateTimestamp(-259200000),
    },
  ] as PostEntity[],
};

/**
 * 게시글 데이터 생성 팩토리 함수
 */
export const createPostFixture = (
  overrides: Partial<PostEntity> = {}
): PostEntity => {
  return {
    ...PostFixtures.valid.basic,
    ...overrides,
  };
};

/**
 * 여러 게시글 데이터 생성 팩토리 함수
 */
export const createMultiplePostFixtures = (
  count: number,
  baseData: Partial<PostEntity> = {}
): PostEntity[] => {
  return TestDataHelpers.createArray(count, (index) => ({
    ...PostFixtures.valid.basic,
    id: TestDataHelpers.generateId("post"),
    title: `Test Post ${index + 1}`,
    body: `This is test post number ${index + 1}.`,
    likes: Math.floor(Math.random() * 100),
    totalComments: Math.floor(Math.random() * 20),
    createdAt: TestDataHelpers.generateTimestamp(-index * 86400000), // Each one day earlier
    updatedAt: TestDataHelpers.generateTimestamp(-index * 86400000),
    ...baseData,
  }));
};

/**
 * 특정 사용자의 게시글들 생성 팩토리 함수
 */
export const createPostsForUser = (
  user: UserReference,
  count: number = 3
): PostEntity[] => {
  return createMultiplePostFixtures(count, { user });
};

/**
 * 랜덤 게시글 데이터 생성 팩토리 함수
 */
export const createRandomPostFixture = (
  overrides: Partial<PostEntity> = {}
): PostEntity => {
  return {
    id: TestDataHelpers.generateId("post"),
    user: {
      id: TestDataHelpers.generateId("user"),
      username: TestDataHelpers.generateUsername(),
      profileImage: "https://example.com/avatar.jpg",
    },
    title: `Random Post ${Math.random().toString(36).substr(2, 8)}`,
    body: `This is a random post content ${Math.random()
      .toString(36)
      .substr(2, 20)}.`,
    image: Math.random() > 0.5 ? "https://example.com/random.jpg" : "",
    likes: Math.floor(Math.random() * 1000),
    totalComments: Math.floor(Math.random() * 100),
    createdAt: TestDataHelpers.generateTimestamp(
      -Math.random() * 86400000 * 30
    ), // Within the last 30 days
    updatedAt: TestDataHelpers.generateTimestamp(
      -Math.random() * 86400000 * 30
    ),
    ...overrides,
  };
};
