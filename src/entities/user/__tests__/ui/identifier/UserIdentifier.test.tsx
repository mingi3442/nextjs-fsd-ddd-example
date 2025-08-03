import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { UserDto } from "../../../infrastructure/dto";
import { UserIdentifier } from "../../../ui/identifier";
import { UserFixtures } from "../../fixtures";

/**
 * UserIdentifier Component Tests
 * Core functionality and user experience focused tests
 */
describe("UserIdentifier Component", () => {
  let validUserDto: UserDto;

  beforeEach(() => {
    validUserDto = {
      id: UserFixtures.valid.basic.id,
      username: UserFixtures.valid.basic.username,
      profileImage: UserFixtures.valid.basic.profileImage,
    };
  });

  describe("Basic Rendering", () => {
    it("should render user avatar and username", () => {
      // Given: Valid user data
      const user = validUserDto;

      // When: Render UserIdentifier component
      render(<UserIdentifier user={user} />);

      // Then: Should display avatar and username
      const avatarImage = screen.getByRole("img");
      const usernameText = screen.getByText(user.username);

      expect(avatarImage).toBeInTheDocument();
      expect(usernameText).toBeInTheDocument();
      expect(usernameText).toHaveTextContent(user.username);
    });

    it("should render with empty profile image", () => {
      // Given: User with empty profile image
      const userWithoutImage: UserDto = {
        ...validUserDto,
        profileImage: "",
      };

      // When: Render component
      render(<UserIdentifier user={userWithoutImage} />);

      // Then: Should still render username and avatar element
      const avatarImage = screen.getByRole("img");
      const usernameText = screen.getByText(userWithoutImage.username);

      expect(avatarImage).toBeInTheDocument();
      expect(usernameText).toBeInTheDocument();
    });
  });

  describe("User Data Handling", () => {
    it("should display different usernames correctly", () => {
      // Given: User with custom username
      const customUser: UserDto = {
        ...validUserDto,
        username: "customUsername123",
      };

      // When: Render with custom user
      render(<UserIdentifier user={customUser} />);

      // Then: Should display the custom username
      const usernameText = screen.getByText(customUser.username);
      expect(usernameText).toHaveTextContent(customUser.username);
    });

    it("should handle special characters in username", () => {
      // Given: User with special characters in username
      const userWithSpecialChars: UserDto = {
        ...validUserDto,
        username: "user_name.123-test",
      };

      // When: Render component
      render(<UserIdentifier user={userWithSpecialChars} />);

      // Then: Should display special characters correctly
      const usernameText = screen.getByText(userWithSpecialChars.username);
      expect(usernameText).toHaveTextContent("user_name.123-test");
    });
  });

  describe("Accessibility", () => {
    it("should have proper alt text for avatar", () => {
      // Given: Valid user data
      const user = validUserDto;

      // When: Render component
      render(<UserIdentifier user={user} />);

      // Then: Avatar should have meaningful alt text
      const avatarImage = screen.getByRole("img");
      expect(avatarImage).toHaveAttribute(
        "alt",
        `${user.profileImage}-profile`
      );
    });

    it("should use semantic HTML structure", () => {
      // Given: Valid user data
      const user = validUserDto;

      // When: Render component
      render(<UserIdentifier user={user} />);

      // Then: Should use proper semantic elements
      const usernameText = screen.getByText(user.username);
      expect(usernameText.tagName).toBe("SPAN");
    });
  });
});
