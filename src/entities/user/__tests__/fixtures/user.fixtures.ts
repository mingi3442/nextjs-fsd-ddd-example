import { UserEntity } from "../../types";

/**
 * User 도메인 테스트 픽스처
 * User 엔티티 관련 테스트에서 재사용 가능한 테스트 데이터 제공
 */
export const UserFixtures = {
  /**
   * 유효한 사용자 데이터 세트
   */
  valid: {
    // 기본 사용자 데이터
    basic: {
      id: "user-123",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "test@example.com",
    } as UserEntity,

    // 프로필 이미지가 없는 사용자
    withoutImage: {
      id: "user-456",
      username: "noimage",
      profileImage: "",
      age: 30,
      email: "noimage@example.com",
    } as UserEntity,

    // 최소 연령 사용자
    minAge: {
      id: "user-789",
      username: "younguser",
      profileImage: "https://example.com/young.jpg",
      age: 13,
      email: "young@example.com",
    } as UserEntity,

    // 고령 사용자
    maxAge: {
      id: "user-999",
      username: "olduser",
      profileImage: "https://example.com/old.jpg",
      age: 99,
      email: "old@example.com",
    } as UserEntity,

    // 특수문자가 포함된 유효한 사용자명
    specialChars: {
      id: "user-special",
      username: "user_name.123",
      profileImage: "https://example.com/special.jpg",
      age: 28,
      email: "special@example.com",
    } as UserEntity,
  },

  /**
   * 무효한 사용자 데이터 세트 (에러 테스트용)
   */
  invalid: {
    // 빈 사용자명
    emptyUsername: {
      id: "user-empty",
      username: "",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "empty@example.com",
    } as UserEntity,

    // 너무 짧은 사용자명
    shortUsername: {
      id: "user-short",
      username: "ab",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "short@example.com",
    } as UserEntity,

    // 너무 긴 사용자명
    longUsername: {
      id: "user-long",
      username: "a".repeat(21),
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "long@example.com",
    } as UserEntity,

    // 잘못된 이메일 형식
    invalidEmail: {
      id: "user-invalid-email",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "invalid-email",
    } as UserEntity,

    // 음수 나이
    negativeAge: {
      id: "user-negative",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: -5,
      email: "negative@example.com",
    } as UserEntity,

    // 허용되지 않는 특수문자 사용자명
    invalidSpecialChars: {
      id: "user-invalid-special",
      username: "user@name!",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "invalid@example.com",
    } as UserEntity,
  },

  /**
   * 엣지 케이스 데이터 세트
   */
  edge: {
    // 최소 길이 사용자명
    minLengthUsername: {
      id: "user-min",
      username: "abc",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "min@example.com",
    } as UserEntity,

    // 최대 길이 사용자명
    maxLengthUsername: {
      id: "user-max",
      username: "a".repeat(20),
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "max@example.com",
    } as UserEntity,

    // 0세 사용자
    zeroAge: {
      id: "user-zero",
      username: "zeroage",
      profileImage: "https://example.com/avatar.jpg",
      age: 0,
      email: "zero@example.com",
    } as UserEntity,

    // 매우 긴 이메일
    longEmail: {
      id: "user-long-email",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email:
        "very.long.email.address.for.testing@very.long.domain.name.example.com",
    } as UserEntity,
  },

  /**
   * 여러 사용자 데이터 배열
   */
  multiple: [
    {
      id: "user-1",
      username: "user1",
      profileImage: "https://example.com/user1.jpg",
      age: 20,
      email: "user1@example.com",
    },
    {
      id: "user-2",
      username: "user2",
      profileImage: "https://example.com/user2.jpg",
      age: 25,
      email: "user2@example.com",
    },
    {
      id: "user-3",
      username: "user3",
      profileImage: "",
      age: 30,
      email: "user3@example.com",
    },
  ] as UserEntity[],
};

/**
 * 사용자 데이터 생성 팩토리 함수
 */
export const createUserFixture = (
  overrides: Partial<UserEntity> = {}
): UserEntity => {
  return {
    ...UserFixtures.valid.basic,
    ...overrides,
  };
};
