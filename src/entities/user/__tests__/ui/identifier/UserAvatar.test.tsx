import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserAvatar } from "../../../ui/identifier";

describe("UserAvatar Component", () => {
  let mockOnClick: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnClick = vi.fn();
  });

  describe("Basic Rendering", () => {
    it("should render with profile image", () => {
      // Given: Valid profile image URL
      const profileImage = "https://example.com/avatar.jpg";

      // When: Render UserAvatar component
      render(<UserAvatar userProfileImage={profileImage} />);

      // Then: Should render with correct image
      const avatarImage = screen.getByRole("img");
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute("alt", `${profileImage}-profile`);
    });

    it("should render with empty profile image", () => {
      // Given: Empty profile image URL
      const emptyProfileImage = "";

      // When: Render with empty profile image
      render(<UserAvatar userProfileImage={emptyProfileImage} />);

      // Then: Should render even with empty image
      const avatarImage = screen.getByRole("img");
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute("alt", "-profile");
    });
  });

  describe("User Interactions", () => {
    it("should handle click events when onClick handler is provided", () => {
      // Given: Profile image and click handler
      const profileImage = "https://example.com/avatar.jpg";

      // When: Render with click handler and click it
      render(
        <UserAvatar userProfileImage={profileImage} onClick={mockOnClick} />
      );
      const avatarContainer = screen.getByRole("img").parentElement;
      expect(avatarContainer).toBeInTheDocument();
      avatarContainer!.click();

      // Then: Click handler should be called
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Customization", () => {
    it("should apply custom className", () => {
      // Given: Profile image and custom className
      const profileImage = "https://example.com/avatar.jpg";
      const customClassName = "custom-avatar";

      // When: Render with custom className
      render(
        <UserAvatar
          userProfileImage={profileImage}
          className={customClassName}
        />
      );

      // Then: Custom className should be applied
      const avatarContainer = screen.getByRole("img").parentElement;
      expect(avatarContainer).toBeInTheDocument();
      expect(avatarContainer).toHaveClass(customClassName);
    });

    it("should pass through additional HTML attributes", () => {
      // Given: Profile image and additional HTML attributes
      const profileImage = "https://example.com/avatar.jpg";
      const testId = "user-avatar";

      // When: Render with additional attributes
      render(
        <UserAvatar userProfileImage={profileImage} data-testid={testId} />
      );

      // Then: Additional attributes should be passed through
      const avatarContainer = screen.getByRole("img").parentElement;
      expect(avatarContainer).toBeInTheDocument();
      expect(avatarContainer).toHaveAttribute("data-testid", testId);
    });
  });

  describe("Accessibility", () => {
    it("should have proper alt text", () => {
      // Given: Valid profile image URL
      const profileImage = "https://example.com/avatar.jpg";

      // When: Render component
      render(<UserAvatar userProfileImage={profileImage} />);

      // Then: Should have proper alt text
      const avatarImage = screen.getByRole("img");
      expect(avatarImage).toHaveAttribute("alt", `${profileImage}-profile`);
    });

    it("should support keyboard accessibility", () => {
      // Given: Profile image and keyboard accessibility attributes
      const profileImage = "https://example.com/avatar.jpg";

      // When: Render with keyboard accessibility attributes
      render(
        <UserAvatar
          userProfileImage={profileImage}
          onClick={mockOnClick}
          tabIndex={0}
        />
      );

      // Then: Should support keyboard accessibility
      const avatarContainer = screen.getByRole("img").parentElement;
      expect(avatarContainer).toBeInTheDocument();
      expect(avatarContainer).toHaveAttribute("tabIndex", "0");
    });
  });
});
