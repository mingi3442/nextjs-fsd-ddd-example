/**
 * User Hook Test Fixtures
 * Mock data for user-related hook tests
 */

import { UserProfileDto } from "@/entities/user";

export const mockUserProfileData: UserProfileDto = {
  id: "user-1",
  username: "testuser",
  email: "test@example.com",
  profileImage: "https://example.com/avatar.jpg",
  age: 25,
};

export const mockUserProfileDataWithoutAge: UserProfileDto = {
  id: "user-2",
  username: "anotheruser",
  email: "another@example.com",
  profileImage: "https://example.com/avatar2.jpg",
};