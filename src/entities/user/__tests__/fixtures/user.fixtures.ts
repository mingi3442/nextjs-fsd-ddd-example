import { UserEntity } from "../../types";

export const UserFixtures = {
  valid: {
    // Basic user data
    basic: {
      id: "user-123",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "test@example.com",
    } as UserEntity,

    // User without profile image
    withoutImage: {
      id: "user-456",
      username: "noimage",
      profileImage: "",
      age: 30,
      email: "noimage@example.com",
    } as UserEntity,

    // User with minimum age
    minAge: {
      id: "user-789",
      username: "younguser",
      profileImage: "https://example.com/young.jpg",
      age: 13,
      email: "young@example.com",
    } as UserEntity,

    // Elderly user
    maxAge: {
      id: "user-999",
      username: "olduser",
      profileImage: "https://example.com/old.jpg",
      age: 99,
      email: "old@example.com",
    } as UserEntity,

    // Valid username with special characters
    specialChars: {
      id: "user-special",
      username: "user_name.123",
      profileImage: "https://example.com/special.jpg",
      age: 28,
      email: "special@example.com",
    } as UserEntity,
  },

  invalid: {
    // Empty username
    emptyUsername: {
      id: "user-empty",
      username: "",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "empty@example.com",
    } as UserEntity,

    // Username too short
    shortUsername: {
      id: "user-short",
      username: "ab",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "short@example.com",
    } as UserEntity,

    // Username too long
    longUsername: {
      id: "user-long",
      username: "a".repeat(21),
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "long@example.com",
    } as UserEntity,

    // Invalid email format
    invalidEmail: {
      id: "user-invalid-email",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "invalid-email",
    } as UserEntity,

    // Negative age
    negativeAge: {
      id: "user-negative",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: -5,
      email: "negative@example.com",
    } as UserEntity,

    // Username with disallowed special characters
    invalidSpecialChars: {
      id: "user-invalid-special",
      username: "user@name!",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "invalid@example.com",
    } as UserEntity,
  },

  edge: {
    // Minimum length username
    minLengthUsername: {
      id: "user-min",
      username: "abc",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "min@example.com",
    } as UserEntity,

    // Maximum length username
    maxLengthUsername: {
      id: "user-max",
      username: "a".repeat(20),
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email: "max@example.com",
    } as UserEntity,

    zeroAge: {
      id: "user-zero",
      username: "zeroage",
      profileImage: "https://example.com/avatar.jpg",
      age: 0,
      email: "zero@example.com",
    } as UserEntity,

    // Very long email
    longEmail: {
      id: "user-long-email",
      username: "testuser",
      profileImage: "https://example.com/avatar.jpg",
      age: 25,
      email:
        "very.long.email.address.for.testing@very.long.domain.name.example.com",
    } as UserEntity,
  },

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

export const createUserFixture = (
  overrides: Partial<UserEntity> = {}
): UserEntity => {
  return {
    ...UserFixtures.valid.basic,
    ...overrides,
  };
};
