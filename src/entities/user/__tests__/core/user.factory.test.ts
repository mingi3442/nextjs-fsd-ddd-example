import { User, UserFactory } from "../../core";
import { UserFixtures, createUserFixture } from "../fixtures";

describe("UserFactory", () => {
  describe("createNew method", () => {
    describe("when called with all parameters", () => {
      it("should create user with all provided values", () => {
        // Given: Complete valid user data from fixtures
        const userData = UserFixtures.valid.basic;

        // When: UserFactory creates new user with all parameters
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with all provided properties
        expect(user).toBeInstanceOf(User);
        expect(user.id).toBe(""); // Factory always creates with empty ID
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.age).toBe(userData.age);
        expect(user.email).toBe(userData.email);
      });

      it("should create user with special characters in username", () => {
        // Given: User data with valid special characters in username
        const userData = UserFixtures.valid.specialChars;

        // When: UserFactory creates new user with special character username
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with special character username
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.username).toContain("_");
        expect(user.username).toContain(".");
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.age).toBe(userData.age);
        expect(user.email).toBe(userData.email);
      });

      it("should create user with maximum age value", () => {
        // Given: User data with maximum valid age
        const userData = UserFixtures.valid.maxAge;

        // When: UserFactory creates new user with maximum age
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with maximum age value
        expect(user).toBeInstanceOf(User);
        expect(user.age).toBe(99);
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.email).toBe(userData.email);
      });

      it("should create user with long email address", () => {
        // Given: User data with very long but valid email
        const userData = UserFixtures.edge.longEmail;

        // When: UserFactory creates new user with long email
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with long email address
        expect(user).toBeInstanceOf(User);
        expect(user.email).toBe(userData.email);
        expect(user.email.length).toBeGreaterThan(50);
        expect(user.username).toBe(userData.username);
        expect(user.age).toBe(userData.age);
      });
    });

    describe("when called with only username parameter", () => {
      it("should create user with default values for optional parameters", () => {
        // Given: Only username from fixtures
        const username = UserFixtures.valid.basic.username;

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

      it("should create user with minimum length username", () => {
        // Given: Username with minimum valid length
        const username = UserFixtures.edge.minLengthUsername.username;

        // When: UserFactory creates new user with minimum length username
        const user = UserFactory.createNew(username);

        // Then: User should be created with minimum length username and defaults
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(username);
        expect(user.username.length).toBe(3);
        expect(user.profileImage).toBe("");
        expect(user.age).toBe(0);
        expect(user.email).toBe("");
      });

      it("should create user with maximum length username", () => {
        // Given: Username with maximum valid length
        const username = UserFixtures.edge.maxLengthUsername.username;

        // When: UserFactory creates new user with maximum length username
        const user = UserFactory.createNew(username);

        // Then: User should be created with maximum length username and defaults
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(username);
        expect(user.username.length).toBe(20);
        expect(user.profileImage).toBe("");
        expect(user.age).toBe(0);
        expect(user.email).toBe("");
      });
    });

    describe("when called with partial parameters", () => {
      it("should create user with username and image only", () => {
        // Given: Username and profile image from fixtures
        const userData = UserFixtures.valid.basic;

        // When: UserFactory creates new user with username and image only
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage
        );

        // Then: User should be created with provided values and remaining defaults
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.age).toBe(0); // Default value
        expect(user.email).toBe(""); // Default value
      });

      it("should create user with username, image, and age", () => {
        // Given: Username, image, and age from fixtures
        const userData = UserFixtures.valid.minAge;

        // When: UserFactory creates new user with username, image, and age
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage,
          userData.age
        );

        // Then: User should be created with provided values and email default
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.age).toBe(userData.age);
        expect(user.email).toBe(""); // Default value
      });

      it("should create user with empty profile image", () => {
        // Given: User data with empty profile image
        const userData = UserFixtures.valid.withoutImage;

        // When: UserFactory creates new user with empty profile image
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with empty profile image
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe(""); // Empty string
        expect(user.age).toBe(userData.age);
        expect(user.email).toBe(userData.email);
      });
    });

    describe("when called with edge case values", () => {
      it("should create user with zero age", () => {
        // Given: User data with zero age
        const userData = UserFixtures.edge.zeroAge;

        // When: UserFactory creates new user with zero age
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with zero age
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.age).toBe(0);
        expect(user.email).toBe(userData.email);
      });

      it("should create user with negative age (boundary test)", () => {
        // Given: User data with negative age for boundary testing
        const userData = UserFixtures.invalid.negativeAge;

        // When: UserFactory creates new user with negative age
        const user = UserFactory.createNew(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with negative age (factory doesn't validate)
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.age).toBe(-5);
        expect(user.email).toBe(userData.email);
      });

      it("should create user with all empty string values except username", () => {
        // Given: Username and empty strings for other parameters
        const username = UserFixtures.valid.basic.username;

        // When: UserFactory creates new user with empty strings
        const user = UserFactory.createNew(username, "", 0, "");

        // Then: User should be created with empty values
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(username);
        expect(user.profileImage).toBe("");
        expect(user.age).toBe(0);
        expect(user.email).toBe("");
      });
    });
  });

  describe("createNewWithProfile method", () => {
    describe("when called with all parameters", () => {
      it("should create user with complete profile data", () => {
        // Given: Complete user profile data from fixtures
        const userData = UserFixtures.valid.basic;

        // When: UserFactory creates new user with complete profile
        const user = UserFactory.createNewWithProfile(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with complete profile data
        expect(user).toBeInstanceOf(User);
        expect(user.id).toBe(""); // Factory always creates with empty ID
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.age).toBe(userData.age);
        expect(user.email).toBe(userData.email);
      });

      it("should create user with profile containing no image", () => {
        // Given: User profile data without image
        const userData = UserFixtures.valid.withoutImage;

        // When: UserFactory creates new user with profile without image
        const user = UserFactory.createNewWithProfile(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with empty profile image
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe("");
        expect(user.age).toBe(userData.age);
        expect(user.email).toBe(userData.email);
      });

      it("should create user with elderly profile", () => {
        // Given: User profile data with maximum age
        const userData = UserFixtures.valid.maxAge;

        // When: UserFactory creates new user with elderly profile
        const user = UserFactory.createNewWithProfile(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with elderly profile
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.age).toBe(99);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.email).toBe(userData.email);
      });
    });

    describe("when called with minimal parameters", () => {
      it("should create user profile with only username", () => {
        // Given: Only username from fixtures
        const username = UserFixtures.valid.specialChars.username;

        // When: UserFactory creates new user profile with only username
        const user = UserFactory.createNewWithProfile(username);

        // Then: User should be created with default profile values
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(username);
        expect(user.profileImage).toBe("");
        expect(user.age).toBe(0);
        expect(user.email).toBe("");
      });

      it("should create user profile with username and image", () => {
        // Given: Username and profile image
        const userData = UserFixtures.valid.basic;

        // When: UserFactory creates new user profile with username and image
        const user = UserFactory.createNewWithProfile(
          userData.username,
          userData.profileImage
        );

        // Then: User should be created with provided values and defaults
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.age).toBe(0);
        expect(user.email).toBe("");
      });
    });

    describe("when called with edge case profile data", () => {
      it("should create user profile with minimum age", () => {
        // Given: User profile data with minimum age
        const userData = UserFixtures.valid.minAge;

        // When: UserFactory creates new user profile with minimum age
        const user = UserFactory.createNewWithProfile(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with minimum age profile
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.age).toBe(13);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.email).toBe(userData.email);
      });

      it("should create user profile with zero age", () => {
        // Given: User profile data with zero age
        const userData = UserFixtures.edge.zeroAge;

        // When: UserFactory creates new user profile with zero age
        const user = UserFactory.createNewWithProfile(
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email
        );

        // Then: User should be created with zero age profile
        expect(user).toBeInstanceOf(User);
        expect(user.username).toBe(userData.username);
        expect(user.age).toBe(0);
        expect(user.profileImage).toBe(userData.profileImage);
        expect(user.email).toBe(userData.email);
      });
    });
  });

  describe("Factory methods comparison and consistency", () => {
    describe("when both methods are called with identical parameters", () => {
      it("should create users with identical properties", () => {
        // Given: Complete user data from fixtures
        const userData = UserFixtures.valid.basic;
        const params = [
          userData.username,
          userData.profileImage,
          userData.age,
          userData.email,
        ] as const;

        // When: Both factory methods create users with identical parameters
        const user1 = UserFactory.createNew(...params);
        const user2 = UserFactory.createNewWithProfile(...params);

        // Then: Both users should have identical properties
        expect(user1.id).toBe(user2.id);
        expect(user1.username).toBe(user2.username);
        expect(user1.profileImage).toBe(user2.profileImage);
        expect(user1.age).toBe(user2.age);
        expect(user1.email).toBe(user2.email);
      });

      it("should create users with identical default values", () => {
        // Given: Only username parameter
        const username = UserFixtures.valid.basic.username;

        // When: Both factory methods create users with only username
        const user1 = UserFactory.createNew(username);
        const user2 = UserFactory.createNewWithProfile(username);

        // Then: Both users should have identical default values
        expect(user1.username).toBe(user2.username);
        expect(user1.profileImage).toBe(user2.profileImage);
        expect(user1.age).toBe(user2.age);
        expect(user1.email).toBe(user2.email);
        expect(user1.profileImage).toBe("");
        expect(user1.age).toBe(0);
        expect(user1.email).toBe("");
      });
    });

    describe("when methods are called with different fixture data", () => {
      it("should create users with different properties", () => {
        // Given: Different user data from fixtures
        const userData1 = UserFixtures.valid.basic;
        const userData2 = UserFixtures.valid.specialChars;

        // When: Factory creates users with different fixture data
        const user1 = UserFactory.createNew(
          userData1.username,
          userData1.profileImage,
          userData1.age,
          userData1.email
        );
        const user2 = UserFactory.createNew(
          userData2.username,
          userData2.profileImage,
          userData2.age,
          userData2.email
        );

        // Then: Users should have different properties
        expect(user1.username).not.toBe(user2.username);
        expect(user1.age).not.toBe(user2.age);
        expect(user1.email).not.toBe(user2.email);
        expect(user1.profileImage).not.toBe(user2.profileImage);
      });

      it("should create users from multiple fixture data", () => {
        // Given: Multiple user data from fixtures array
        const multipleUsers = UserFixtures.multiple;

        // When: Factory creates users from multiple fixture data
        const createdUsers = multipleUsers.map((userData) =>
          UserFactory.createNew(
            userData.username,
            userData.profileImage,
            userData.age,
            userData.email
          )
        );

        // Then: All users should be created with unique properties
        expect(createdUsers).toHaveLength(3);
        expect(createdUsers[0].username).toBe("user1");
        expect(createdUsers[1].username).toBe("user2");
        expect(createdUsers[2].username).toBe("user3");
        expect(createdUsers[2].profileImage).toBe(""); // Third user has no image

        // Verify all users are distinct instances
        const usernames = createdUsers.map((user) => user.username);
        const uniqueUsernames = new Set(usernames);
        expect(uniqueUsernames.size).toBe(3);
      });
    });
  });

  describe("Factory helper integration", () => {
    describe("when using createUserFixture helper", () => {
      it("should create user with custom fixture data", () => {
        // Given: Custom user data using fixture helper
        const customUserData = createUserFixture({
          username: "customuser",
          age: 35,
        });

        // When: Factory creates user with custom fixture data
        const user = UserFactory.createNew(
          customUserData.username,
          customUserData.profileImage,
          customUserData.age,
          customUserData.email
        );

        // Then: User should be created with custom and inherited values
        expect(user.username).toBe("customuser");
        expect(user.age).toBe(35);
        expect(user.profileImage).toBe(UserFixtures.valid.basic.profileImage);
        expect(user.email).toBe(UserFixtures.valid.basic.email);
      });

      it("should create user with partial custom fixture override", () => {
        // Given: Partial custom user data using fixture helper
        const customUserData = createUserFixture({
          email: "custom@test.com",
        });

        // When: Factory creates user with partial custom fixture data
        const user = UserFactory.createNewWithProfile(
          customUserData.username,
          customUserData.profileImage,
          customUserData.age,
          customUserData.email
        );

        // Then: User should be created with custom email and inherited values
        expect(user.email).toBe("custom@test.com");
        expect(user.username).toBe(UserFixtures.valid.basic.username);
        expect(user.age).toBe(UserFixtures.valid.basic.age);
        expect(user.profileImage).toBe(UserFixtures.valid.basic.profileImage);
      });

      it("should create user with empty fixture override", () => {
        // Given: Empty override using fixture helper
        const customUserData = createUserFixture({});

        // When: Factory creates user with empty override fixture data
        const user = UserFactory.createNew(
          customUserData.username,
          customUserData.profileImage,
          customUserData.age,
          customUserData.email
        );

        // Then: User should be created with all basic fixture values
        expect(user.username).toBe(UserFixtures.valid.basic.username);
        expect(user.profileImage).toBe(UserFixtures.valid.basic.profileImage);
        expect(user.age).toBe(UserFixtures.valid.basic.age);
        expect(user.email).toBe(UserFixtures.valid.basic.email);
      });
    });
  });

  describe("Parameter validation and boundary testing", () => {
    describe("when testing parameter combinations", () => {
      it("should handle all possible parameter combinations for createNew", () => {
        // Given: Various parameter combinations
        const username = "testuser";
        const image = "https://example.com/test.jpg";
        const age = 25;
        const email = "test@example.com";

        // When: Testing all parameter combinations
        const user1 = UserFactory.createNew(username);
        const user2 = UserFactory.createNew(username, image);
        const user3 = UserFactory.createNew(username, image, age);
        const user4 = UserFactory.createNew(username, image, age, email);

        // Then: All users should be created with appropriate values
        expect(user1.username).toBe(username);
        expect(user1.profileImage).toBe("");
        expect(user1.age).toBe(0);
        expect(user1.email).toBe("");

        expect(user2.username).toBe(username);
        expect(user2.profileImage).toBe(image);
        expect(user2.age).toBe(0);
        expect(user2.email).toBe("");

        expect(user3.username).toBe(username);
        expect(user3.profileImage).toBe(image);
        expect(user3.age).toBe(age);
        expect(user3.email).toBe("");

        expect(user4.username).toBe(username);
        expect(user4.profileImage).toBe(image);
        expect(user4.age).toBe(age);
        expect(user4.email).toBe(email);
      });

      it("should handle all possible parameter combinations for createNewWithProfile", () => {
        // Given: Various parameter combinations for profile creation
        const username = "profileuser";
        const image = "https://example.com/profile.jpg";
        const age = 30;
        const email = "profile@example.com";

        // When: Testing all parameter combinations for profile creation
        const user1 = UserFactory.createNewWithProfile(username);
        const user2 = UserFactory.createNewWithProfile(username, image);
        const user3 = UserFactory.createNewWithProfile(username, image, age);
        const user4 = UserFactory.createNewWithProfile(
          username,
          image,
          age,
          email
        );

        // Then: All profile users should be created with appropriate values
        expect(user1.username).toBe(username);
        expect(user1.profileImage).toBe("");
        expect(user1.age).toBe(0);
        expect(user1.email).toBe("");

        expect(user2.username).toBe(username);
        expect(user2.profileImage).toBe(image);
        expect(user2.age).toBe(0);
        expect(user2.email).toBe("");

        expect(user3.username).toBe(username);
        expect(user3.profileImage).toBe(image);
        expect(user3.age).toBe(age);
        expect(user3.email).toBe("");

        expect(user4.username).toBe(username);
        expect(user4.profileImage).toBe(image);
        expect(user4.age).toBe(age);
        expect(user4.email).toBe(email);
      });
    });

    describe("when testing boundary values", () => {
      it("should create users with boundary username lengths", () => {
        // Given: Boundary username lengths from fixtures
        const minUsername = UserFixtures.edge.minLengthUsername.username;
        const maxUsername = UserFixtures.edge.maxLengthUsername.username;

        // When: Factory creates users with boundary username lengths
        const userMin = UserFactory.createNew(minUsername);
        const userMax = UserFactory.createNew(maxUsername);

        // Then: Users should be created with boundary username lengths
        expect(userMin.username).toBe(minUsername);
        expect(userMin.username.length).toBe(3);
        expect(userMax.username).toBe(maxUsername);
        expect(userMax.username.length).toBe(20);
      });

      it("should create users with boundary age values", () => {
        // Given: Boundary age values
        const zeroAge = 0;
        const maxAge = 99;

        // When: Factory creates users with boundary age values
        const userZero = UserFactory.createNew("user1", "", zeroAge);
        const userMax = UserFactory.createNew("user2", "", maxAge);

        // Then: Users should be created with boundary age values
        expect(userZero.age).toBe(0);
        expect(userMax.age).toBe(99);
      });
    });
  });
});
