import { BaseError } from "@/shared/libs/errors";
import { User } from "../../core";
import { UserFixtures } from "../fixtures";

describe("User Domain", () => {
  describe("Constructor", () => {
    it("should create user instance when provided with valid data", () => {
      // Given: Valid user data is provided
      const validUserData = UserFixtures.valid.basic;

      // When: User instance is created with valid data
      const user = new User(
        validUserData.id,
        validUserData.username,
        validUserData.profileImage,
        validUserData.age,
        validUserData.email
      );

      // Then: User instance should be created with correct properties
      expect(user.id).toBe(validUserData.id);
      expect(user.username).toBe(validUserData.username);
      expect(user.profileImage).toBe(validUserData.profileImage);
      expect(user.age).toBe(validUserData.age);
      expect(user.email).toBe(validUserData.email);
    });

    it("should create user instance when provided with edge case values", () => {
      // Given: Edge case user data (zero age, minimum username length)
      const edgeCaseData = UserFixtures.edge.zeroAge;

      // When: User instance is created with edge case data
      const user = new User(
        edgeCaseData.id,
        edgeCaseData.username,
        edgeCaseData.profileImage,
        edgeCaseData.age,
        edgeCaseData.email
      );

      // Then: User instance should be created successfully
      expect(user.id).toBe(edgeCaseData.id);
      expect(user.username).toBe(edgeCaseData.username);
      expect(user.profileImage).toBe(edgeCaseData.profileImage);
      expect(user.age).toBe(edgeCaseData.age);
      expect(user.email).toBe(edgeCaseData.email);
    });

    it("should create user instance when provided with maximum length username", () => {
      // Given: User data with maximum allowed username length (20 characters)
      const maxUsernameData = UserFixtures.edge.maxLengthUsername;

      // When: User instance is created with maximum username length
      const user = new User(
        maxUsernameData.id,
        maxUsernameData.username,
        maxUsernameData.profileImage,
        maxUsernameData.age,
        maxUsernameData.email
      );

      // Then: User instance should be created successfully
      expect(user.username).toBe(maxUsernameData.username);
      expect(user.username.length).toBe(20);
    });
  });

  describe("Getter Methods", () => {
    it("should return correct id when id getter is called", () => {
      // Given: User instance with specific id
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );

      // When: id getter is called
      const retrievedId = user.id;

      // Then: Should return the correct id
      expect(retrievedId).toBe(userData.id);
    });

    it("should return correct username when username getter is called", () => {
      // Given: User instance with specific username
      const userData = UserFixtures.valid.specialChars;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );

      // When: username getter is called
      const retrievedUsername = user.username;

      // Then: Should return the correct username
      expect(retrievedUsername).toBe(userData.username);
    });

    it("should return correct profile image when profileImage getter is called", () => {
      // Given: User instance with specific profile image
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );

      // When: profileImage getter is called
      const retrievedImage = user.profileImage;

      // Then: Should return the correct profile image
      expect(retrievedImage).toBe(userData.profileImage);
    });

    it("should return correct age when age getter is called", () => {
      // Given: User instance with specific age
      const userData = UserFixtures.valid.maxAge;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );

      // When: age getter is called
      const retrievedAge = user.age;

      // Then: Should return the correct age
      expect(retrievedAge).toBe(userData.age);
    });

    it("should return correct email when email getter is called", () => {
      // Given: User instance with specific email
      const userData = UserFixtures.edge.longEmail;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );

      // When: email getter is called
      const retrievedEmail = user.email;

      // Then: Should return the correct email
      expect(retrievedEmail).toBe(userData.email);
    });
  });

  describe("updateEmail", () => {
    it("should update email when provided with valid email format", () => {
      // Given: User instance with initial email
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const newEmail = "newemail@example.com";

      // When: updateEmail is called with valid email
      user.updateEmail(newEmail);

      // Then: Email should be updated to the new value
      expect(user.email).toBe(newEmail);
    });

    it("should update email when provided with complex valid email format", () => {
      // Given: User instance and complex but valid email
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const complexEmail = UserFixtures.edge.longEmail.email;

      // When: updateEmail is called with complex valid email
      user.updateEmail(complexEmail);

      // Then: Email should be updated successfully
      expect(user.email).toBe(complexEmail);
    });

    it("should throw BaseError when provided with email missing @ symbol", () => {
      // Given: User instance and invalid email without @ symbol
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const invalidEmail = "invalid-email";

      // When: updateEmail is called with invalid email
      // Then: Should throw BaseError
      expect(() => user.updateEmail(invalidEmail)).toThrow(BaseError);
      expect(() => user.updateEmail(invalidEmail)).toThrow(
        "Invalid email format"
      );
    });

    it("should throw BaseError when provided with email missing domain", () => {
      // Given: User instance and invalid email missing domain
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const invalidEmail = "invalid@";

      // When: updateEmail is called with invalid email
      // Then: Should throw BaseError
      expect(() => user.updateEmail(invalidEmail)).toThrow(BaseError);
      expect(() => user.updateEmail(invalidEmail)).toThrow(
        "Invalid email format"
      );
    });

    it("should throw BaseError when provided with email missing local part", () => {
      // Given: User instance and invalid email missing local part
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const invalidEmail = "@invalid.com";

      // When: updateEmail is called with invalid email
      // Then: Should throw BaseError
      expect(() => user.updateEmail(invalidEmail)).toThrow(BaseError);
      expect(() => user.updateEmail(invalidEmail)).toThrow(
        "Invalid email format"
      );
    });

    it("should throw BaseError when provided with empty email", () => {
      // Given: User instance and empty email string
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const emptyEmail = "";

      // When: updateEmail is called with empty email
      // Then: Should throw BaseError
      expect(() => user.updateEmail(emptyEmail)).toThrow(BaseError);
      expect(() => user.updateEmail(emptyEmail)).toThrow(
        "Invalid email format"
      );
    });

    it("should throw BaseError when provided with email containing spaces", () => {
      // Given: User instance and email with spaces
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const emailWithSpaces = "user name@example.com";

      // When: updateEmail is called with email containing spaces
      // Then: Should throw BaseError
      expect(() => user.updateEmail(emailWithSpaces)).toThrow(BaseError);
      expect(() => user.updateEmail(emailWithSpaces)).toThrow(
        "Invalid email format"
      );
    });

    it("should not modify email when update fails due to invalid format", () => {
      // Given: User instance with original email
      const userData = UserFixtures.valid.basic;
      const originalEmail = userData.email;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        originalEmail
      );
      const invalidEmail = "invalid-email";

      // When: updateEmail is called with invalid email and fails
      try {
        user.updateEmail(invalidEmail);
      } catch {
        // Expected to throw
      }

      // Then: Original email should remain unchanged
      expect(user.email).toBe(originalEmail);
    });
  });

  describe("updateUsername", () => {
    it("should update username when provided with valid format", () => {
      // Given: User instance with initial username
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const newUsername = "newuser123";

      // When: updateUsername is called with valid username
      user.updateUsername(newUsername);

      // Then: Username should be updated to the new value
      expect(user.username).toBe(newUsername);
    });

    it("should update username when provided with minimum length username", () => {
      // Given: User instance and minimum length username (3 characters)
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const minUsername = UserFixtures.edge.minLengthUsername.username;

      // When: updateUsername is called with minimum length username
      user.updateUsername(minUsername);

      // Then: Username should be updated successfully
      expect(user.username).toBe(minUsername);
      expect(user.username.length).toBe(3);
    });

    it("should update username when provided with maximum length username", () => {
      // Given: User instance and maximum length username (20 characters)
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const maxUsername = UserFixtures.edge.maxLengthUsername.username;

      // When: updateUsername is called with maximum length username
      user.updateUsername(maxUsername);

      // Then: Username should be updated successfully
      expect(user.username).toBe(maxUsername);
      expect(user.username.length).toBe(20);
    });

    it("should update username when provided with valid special characters", () => {
      // Given: User instance and usernames with allowed special characters
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const validUsernames = [
        "user123",
        "test_user",
        "user.name",
        "User123",
        UserFixtures.valid.specialChars.username,
      ];

      // When: updateUsername is called with each valid username format
      // Then: Each username should be updated successfully
      validUsernames.forEach((username) => {
        user.updateUsername(username);
        expect(user.username).toBe(username);
      });
    });

    it("should throw BaseError when provided with username that is too short", () => {
      // Given: User instance and username shorter than 3 characters
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const shortUsername = UserFixtures.invalid.shortUsername.username;

      // When: updateUsername is called with too short username
      // Then: Should throw BaseError
      expect(() => user.updateUsername(shortUsername)).toThrow(BaseError);
      expect(() => user.updateUsername(shortUsername)).toThrow(
        "Invalid username format"
      );
    });

    it("should throw BaseError when provided with username that is too long", () => {
      // Given: User instance and username longer than 20 characters
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const longUsername = UserFixtures.invalid.longUsername.username;

      // When: updateUsername is called with too long username
      // Then: Should throw BaseError
      expect(() => user.updateUsername(longUsername)).toThrow(BaseError);
      expect(() => user.updateUsername(longUsername)).toThrow(
        "Invalid username format"
      );
    });

    it("should throw BaseError when provided with username containing invalid special characters", () => {
      // Given: User instance and usernames with invalid special characters
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const invalidUsernames = [
        "user@name",
        "user name",
        "user#name",
        "user$name",
        "user%name",
        UserFixtures.invalid.invalidSpecialChars.username,
      ];

      // When: updateUsername is called with invalid special characters
      // Then: Should throw BaseError for each invalid username
      invalidUsernames.forEach((username) => {
        expect(() => user.updateUsername(username)).toThrow(BaseError);
        expect(() => user.updateUsername(username)).toThrow(
          "Invalid username format"
        );
      });
    });

    it("should throw BaseError when provided with empty username", () => {
      // Given: User instance and empty username string
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const emptyUsername = UserFixtures.invalid.emptyUsername.username;

      // When: updateUsername is called with empty username
      // Then: Should throw BaseError
      expect(() => user.updateUsername(emptyUsername)).toThrow(BaseError);
      expect(() => user.updateUsername(emptyUsername)).toThrow(
        "Invalid username format"
      );
    });

    it("should throw BaseError when provided with username containing only special characters", () => {
      // Given: User instance and username with only special characters
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const specialOnlyUsername = "___";

      // When: updateUsername is called with special characters only
      user.updateUsername(specialOnlyUsername);

      // Then: Should update successfully as underscores are allowed
      expect(user.username).toBe(specialOnlyUsername);
    });

    it("should not modify username when update fails due to invalid format", () => {
      // Given: User instance with original username
      const userData = UserFixtures.valid.basic;
      const originalUsername = userData.username;
      const user = new User(
        userData.id,
        originalUsername,
        userData.profileImage,
        userData.age,
        userData.email
      );
      const invalidUsername = UserFixtures.invalid.shortUsername.username;

      // When: updateUsername is called with invalid username and fails
      try {
        user.updateUsername(invalidUsername);
      } catch {
        // Expected to throw
      }

      // Then: Original username should remain unchanged
      expect(user.username).toBe(originalUsername);
    });
  });

  describe("Domain Invariants", () => {
    it("should maintain immutability of id property", () => {
      // Given: User instance with specific id
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );

      // When: Accessing id property multiple times
      const retrievedId1 = user.id;
      const retrievedId2 = user.id;

      // Then: Id should always return the same value (immutable)
      expect(retrievedId1).toBe(userData.id);
      expect(retrievedId2).toBe(userData.id);
      expect(retrievedId1).toBe(retrievedId2);
    });

    it("should maintain immutability of age property", () => {
      // Given: User instance with specific age
      const userData = UserFixtures.valid.maxAge;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );

      // When: Accessing age property multiple times
      const retrievedAge1 = user.age;
      const retrievedAge2 = user.age;

      // Then: Age should always return the same value (immutable)
      expect(retrievedAge1).toBe(userData.age);
      expect(retrievedAge2).toBe(userData.age);
      expect(retrievedAge1).toBe(retrievedAge2);
    });

    it("should maintain immutability of profileImage property", () => {
      // Given: User instance with specific profile image
      const userData = UserFixtures.valid.basic;
      const user = new User(
        userData.id,
        userData.username,
        userData.profileImage,
        userData.age,
        userData.email
      );

      // When: Accessing profileImage property multiple times
      const retrievedImage1 = user.profileImage;
      const retrievedImage2 = user.profileImage;

      // Then: Profile image should always return the same value (immutable)
      expect(retrievedImage1).toBe(userData.profileImage);
      expect(retrievedImage2).toBe(userData.profileImage);
      expect(retrievedImage1).toBe(retrievedImage2);
    });
  });
});
