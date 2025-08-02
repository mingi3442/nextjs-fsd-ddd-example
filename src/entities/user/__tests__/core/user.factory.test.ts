import { User, UserFactory } from "../../core";

describe("UserFactory", () => {
  describe("createNew method", () => {
    it("should create user with all provided values", () => {
      // Given: Complete valid user data
      const username = "testuser";
      const profileImage = "https://example.com/avatar.jpg";
      const age = 25;
      const email = "test@example.com";

      // When: UserFactory creates new user with all parameters
      const user = UserFactory.createNew(username, profileImage, age, email);

      // Then: User should be created with all provided properties
      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe(""); // Factory always creates with empty ID
      expect(user.username).toBe(username);
      expect(user.profileImage).toBe(profileImage);
      expect(user.age).toBe(age);
      expect(user.email).toBe(email);
    });

    it("should create user with default values for optional parameters", () => {
      // Given: Only username
      const username = "testuser";

      // When: UserFactory creates new user with only username
      const user = UserFactory.createNew(username);

      // Then: User should be created with default values for optional parameters
      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe("");
      expect(user.username).toBe(username);
      expect(user.profileImage).toBe(""); // Default empty string
      expect(user.age).toBe(0); // Default zero
      expect(user.email).toBe(""); // Default empty string
    });

    it("should create user with partial parameters", () => {
      // Given: Username and profile image only
      const username = "testuser";
      const profileImage = "https://example.com/avatar.jpg";

      // When: UserFactory creates new user with partial parameters
      const user = UserFactory.createNew(username, profileImage);

      // Then: User should be created with provided values and remaining defaults
      expect(user).toBeInstanceOf(User);
      expect(user.username).toBe(username);
      expect(user.profileImage).toBe(profileImage);
      expect(user.age).toBe(0); // Default value
      expect(user.email).toBe(""); // Default value
    });
  });

  describe("createNewWithProfile method", () => {
    it("should create user with complete profile data", () => {
      // Given: Complete user profile data
      const username = "profileuser";
      const profileImage = "https://example.com/profile.jpg";
      const age = 30;
      const email = "profile@example.com";

      // When: UserFactory creates new user with complete profile
      const user = UserFactory.createNewWithProfile(
        username,
        profileImage,
        age,
        email
      );

      // Then: User should be created with complete profile data
      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe(""); // Factory always creates with empty ID
      expect(user.username).toBe(username);
      expect(user.profileImage).toBe(profileImage);
      expect(user.age).toBe(age);
      expect(user.email).toBe(email);
    });

    it("should create user profile with only username", () => {
      // Given: Only username
      const username = "profileuser";

      // When: UserFactory creates new user profile with only username
      const user = UserFactory.createNewWithProfile(username);

      // Then: User should be created with default profile values
      expect(user).toBeInstanceOf(User);
      expect(user.username).toBe(username);
      expect(user.profileImage).toBe("");
      expect(user.age).toBe(0);
      expect(user.email).toBe("");
    });
  });

  describe("Factory methods consistency", () => {
    it("should create users with identical properties when called with identical parameters", () => {
      // Given: Complete user data
      const username = "testuser";
      const profileImage = "https://example.com/avatar.jpg";
      const age = 25;
      const email = "test@example.com";

      // When: Both factory methods create users with identical parameters
      const user1 = UserFactory.createNew(username, profileImage, age, email);
      const user2 = UserFactory.createNewWithProfile(
        username,
        profileImage,
        age,
        email
      );

      // Then: Both users should have identical properties
      expect(user1.id).toBe(user2.id);
      expect(user1.username).toBe(user2.username);
      expect(user1.profileImage).toBe(user2.profileImage);
      expect(user1.age).toBe(user2.age);
      expect(user1.email).toBe(user2.email);
    });
  });
});
