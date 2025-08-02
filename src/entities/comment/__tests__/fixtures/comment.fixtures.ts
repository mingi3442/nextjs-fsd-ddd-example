import { TestDataHelpers } from "@/shared/libs/__tests__";
import { CommentEntity, UserReference } from "../../types";

/**
 * Comment 도메인 테스트 픽스처
 * Comment 엔티티 관련 테스트에서 재사용 가능한 테스트 데이터 제공
 */
export const CommentFixtures = {
  /**
   * 유효한 댓글 데이터 세트
   */
  valid: {
    // 기본 댓글 데이터
    basic: {
      id: "comment-123",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "This is a test comment.",
      likes: 2,
      createdAt: TestDataHelpers.generateTimestamp(-3600000), // 1시간 전
      updatedAt: TestDataHelpers.generateTimestamp(-3600000),
    } as CommentEntity,

    // 프로필 이미지가 없는 사용자의 댓글
    withoutUserImage: {
      id: "comment-456",
      postId: "post-123",
      user: {
        id: "user-456",
        username: "noimage",
        profileImage: "",
      } as UserReference,
      body: "Comment from user without profile image.",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(-7200000), // 2시간 전
      updatedAt: TestDataHelpers.generateTimestamp(-7200000),
    } as CommentEntity,

    // 좋아요가 많은 댓글
    popularComment: {
      id: "comment-popular",
      postId: "post-123",
      user: {
        id: "user-popular",
        username: "popular_user",
        profileImage: "https://example.com/popular.jpg",
      } as UserReference,
      body: "This comment received many likes!",
      likes: 50,
      createdAt: TestDataHelpers.generateTimestamp(-86400000), // 1일 전
      updatedAt: TestDataHelpers.generateTimestamp(-86400000),
    } as CommentEntity,

    // 최대 길이 댓글 (100자)
    maxLengthComment: {
      id: "comment-max",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "This is a comment that is exactly one hundred characters long to test the maximum length limit.",
      likes: 1,
      createdAt: TestDataHelpers.generateTimestamp(-1800000), // 30분 전
      updatedAt: TestDataHelpers.generateTimestamp(-900000), // 15분 전 (수정됨)
    } as CommentEntity,

    // 최소 길이 댓글
    minLengthComment: {
      id: "comment-min",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "Hi",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(-600000), // 10분 전
      updatedAt: TestDataHelpers.generateTimestamp(-600000),
    } as CommentEntity,
  },

  /**
   * 무효한 댓글 데이터 세트 (에러 테스트용)
   */
  invalid: {
    // 빈 댓글 본문
    emptyBody: {
      id: "comment-empty",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as CommentEntity,

    // 공백만 있는 댓글 본문
    whitespaceBody: {
      id: "comment-whitespace",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "   \n\t   ",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as CommentEntity,

    // 너무 긴 댓글 본문 (100자 초과)
    tooLongBody: {
      id: "comment-long",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "This comment is way too long and exceeds the maximum allowed length of one hundred characters for comments.",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as CommentEntity,

    // 잘못된 사용자 참조
    invalidUser: {
      id: "comment-invalid-user",
      postId: "post-123",
      user: {
        id: "",
        username: "",
        profileImage: "",
      } as UserReference,
      body: "Comment with invalid user.",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as CommentEntity,

    // null 사용자 참조
    nullUser: {
      id: "comment-null-user",
      postId: "post-123",
      user: null as unknown as UserReference,
      body: "Comment with null user.",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as CommentEntity,

    // 음수 좋아요 수
    negativeLikes: {
      id: "comment-negative-likes",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "Comment with negative likes.",
      likes: -3,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as CommentEntity,
  },

  /**
   * 엣지 케이스 데이터 세트
   */
  edge: {
    // 좋아요 수가 0인 댓글
    zeroLikes: {
      id: "comment-zero-likes",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "Comment with zero likes.",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as CommentEntity,

    // 매우 많은 좋아요 수
    maxLikes: {
      id: "comment-max-likes",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "Comment with maximum likes.",
      likes: Number.MAX_SAFE_INTEGER,
      createdAt: TestDataHelpers.generateTimestamp(-86400000),
      updatedAt: TestDataHelpers.generateTimestamp(),
    } as CommentEntity,

    // 특수문자가 포함된 댓글
    specialChars: {
      id: "comment-special",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "Comment with special chars: @#$%^&*()!",
      likes: 1,
      createdAt: TestDataHelpers.generateTimestamp(-1800000),
      updatedAt: TestDataHelpers.generateTimestamp(-1800000),
    } as CommentEntity,

    // 이모지가 포함된 댓글
    withEmojis: {
      id: "comment-emoji",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "Great post! 👍😊🎉",
      likes: 5,
      createdAt: TestDataHelpers.generateTimestamp(-3600000),
      updatedAt: TestDataHelpers.generateTimestamp(-3600000),
    } as CommentEntity,

    // 생성일과 수정일이 같은 댓글 (수정되지 않음)
    sameTimestamps: {
      id: "comment-same-timestamps",
      postId: "post-123",
      user: {
        id: "user-123",
        username: "testuser",
        profileImage: "https://example.com/avatar.jpg",
      } as UserReference,
      body: "This comment was never edited.",
      likes: 0,
      createdAt: 1640995200000, // 고정된 타임스탬프
      updatedAt: 1640995200000, // 동일한 타임스탬프
    } as CommentEntity,
  },

  /**
   * 여러 댓글 데이터 배열
   */
  multiple: [
    {
      id: "comment-1",
      postId: "post-123",
      user: {
        id: "user-1",
        username: "user1",
        profileImage: "https://example.com/user1.jpg",
      } as UserReference,
      body: "First comment on this post.",
      likes: 3,
      createdAt: TestDataHelpers.generateTimestamp(-3600000),
      updatedAt: TestDataHelpers.generateTimestamp(-3600000),
    },
    {
      id: "comment-2",
      postId: "post-123",
      user: {
        id: "user-2",
        username: "user2",
        profileImage: "https://example.com/user2.jpg",
      } as UserReference,
      body: "Second comment with different opinion.",
      likes: 1,
      createdAt: TestDataHelpers.generateTimestamp(-7200000),
      updatedAt: TestDataHelpers.generateTimestamp(-7200000),
    },
    {
      id: "comment-3",
      postId: "post-123",
      user: {
        id: "user-3",
        username: "user3",
        profileImage: "",
      } as UserReference,
      body: "Third comment from user without image.",
      likes: 0,
      createdAt: TestDataHelpers.generateTimestamp(-10800000),
      updatedAt: TestDataHelpers.generateTimestamp(-10800000),
    },
  ] as CommentEntity[],
};

/**
 * 댓글 데이터 생성 팩토리 함수
 */
export const createCommentFixture = (
  overrides: Partial<CommentEntity> = {}
): CommentEntity => {
  return {
    ...CommentFixtures.valid.basic,
    ...overrides,
  };
};

/**
 * 여러 댓글 데이터 생성 팩토리 함수
 */
export const createMultipleCommentFixtures = (
  count: number,
  postId: string = "post-123",
  baseData: Partial<CommentEntity> = {}
): CommentEntity[] => {
  return TestDataHelpers.createArray(count, (index) => ({
    ...CommentFixtures.valid.basic,
    id: TestDataHelpers.generateId("comment"),
    postId,
    body: `Test comment number ${index + 1}.`,
    likes: Math.floor(Math.random() * 10),
    createdAt: TestDataHelpers.generateTimestamp(-index * 3600000), // 각각 1시간씩 이전
    updatedAt: TestDataHelpers.generateTimestamp(-index * 3600000),
    ...baseData,
  }));
};

/**
 * 특정 게시글의 댓글들 생성 팩토리 함수
 */
export const createCommentsForPost = (
  postId: string,
  count: number = 3
): CommentEntity[] => {
  return createMultipleCommentFixtures(count, postId);
};

/**
 * 특정 사용자의 댓글들 생성 팩토리 함수
 */
export const createCommentsForUser = (
  user: UserReference,
  count: number = 3
): CommentEntity[] => {
  return createMultipleCommentFixtures(count, "post-123", { user });
};

/**
 * 랜덤 댓글 데이터 생성 팩토리 함수
 */
export const createRandomCommentFixture = (
  overrides: Partial<CommentEntity> = {}
): CommentEntity => {
  return {
    id: TestDataHelpers.generateId("comment"),
    postId: TestDataHelpers.generateId("post"),
    user: {
      id: TestDataHelpers.generateId("user"),
      username: TestDataHelpers.generateUsername(),
      profileImage: "https://example.com/avatar.jpg",
    },
    body: `Random comment ${Math.random().toString(36).substr(2, 20)}.`,
    likes: Math.floor(Math.random() * 100),
    createdAt: TestDataHelpers.generateTimestamp(-Math.random() * 86400000 * 7), // 최근 7일 내
    updatedAt: TestDataHelpers.generateTimestamp(-Math.random() * 86400000 * 7),
    ...overrides,
  };
};
