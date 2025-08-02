import { FullWrapper } from "@/shared/libs/__tests__";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CommentForm } from "../../../ui/comment-form";

/**
 * CommentForm Component Tests
 * Core functionality and user interaction focused tests
 */
describe("CommentForm Component", () => {
  let validUserProfileImage: string;

  beforeEach(() => {
    validUserProfileImage = "https://example.com/user-avatar.jpg";
  });

  describe("Basic Rendering", () => {
    it("should render form with all essential elements", () => {
      // Given: Valid user profile image
      const userProfileImage = validUserProfileImage;

      // When: Render CommentForm component
      render(
        <FullWrapper>
          <CommentForm userProfileImage={userProfileImage} />
        </FullWrapper>
      );

      // Then: Should render all essential form elements
      const userAvatar = screen.getByRole("img");
      const inputElement = screen.getByPlaceholderText("Enter a comment...");
      const submitButton = screen.getByRole("button", { name: "Post" });

      expect(userAvatar).toBeInTheDocument();
      expect(inputElement).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it("should render with empty profile image", () => {
      // Given: Empty profile image
      const emptyProfileImage = "";

      // When: Render CommentForm with empty profile image
      render(
        <FullWrapper>
          <CommentForm userProfileImage={emptyProfileImage} />
        </FullWrapper>
      );

      // Then: Should still render all elements
      const userAvatar = screen.getByRole("img");
      const inputElement = screen.getByPlaceholderText("Enter a comment...");

      expect(userAvatar).toBeInTheDocument();
      expect(inputElement).toBeInTheDocument();
    });
  });

  describe("User Input", () => {
    it("should handle text input correctly", () => {
      // Given: Valid user profile image and test comment
      const userProfileImage = validUserProfileImage;
      const testComment = "This is a test comment";

      // When: Render form and type in input field
      render(
        <FullWrapper>
          <CommentForm userProfileImage={userProfileImage} />
        </FullWrapper>
      );

      const inputElement = screen.getByPlaceholderText("Enter a comment...");
      fireEvent.change(inputElement, { target: { value: testComment } });

      // Then: Input should contain the typed text
      expect(inputElement).toHaveValue(testComment);
    });

    it("should start with empty input field", () => {
      // Given: Valid user profile image
      const userProfileImage = validUserProfileImage;

      // When: Render CommentForm component
      render(
        <FullWrapper>
          <CommentForm userProfileImage={userProfileImage} />
        </FullWrapper>
      );

      // Then: Input field should be empty initially
      const inputElement = screen.getByPlaceholderText("Enter a comment...");
      expect(inputElement).toHaveValue("");
    });

    it("should handle special characters in input", () => {
      // Given: Valid user profile image and special characters
      const userProfileImage = validUserProfileImage;
      const specialComment = "Comment with émojis 🎉 and symbols!@#$%";

      // When: Type special characters in input field
      render(
        <FullWrapper>
          <CommentForm userProfileImage={userProfileImage} />
        </FullWrapper>
      );

      const inputElement = screen.getByPlaceholderText("Enter a comment...");
      fireEvent.change(inputElement, { target: { value: specialComment } });

      // Then: Input should handle special characters correctly
      expect(inputElement).toHaveValue(specialComment);
    });
  });

  describe("Submit Button", () => {
    it("should be disabled when input is empty", () => {
      // Given: Valid user profile image
      const userProfileImage = validUserProfileImage;

      // When: Render CommentForm component
      render(
        <FullWrapper>
          <CommentForm userProfileImage={userProfileImage} />
        </FullWrapper>
      );

      // Then: Submit button should be disabled initially
      const submitButton = screen.getByRole("button", { name: "Post" });
      expect(submitButton).toBeDisabled();
    });

    it("should have correct button attributes", () => {
      // Given: Valid user profile image
      const userProfileImage = validUserProfileImage;

      // When: Render CommentForm component
      render(
        <FullWrapper>
          <CommentForm userProfileImage={userProfileImage} />
        </FullWrapper>
      );

      // Then: Submit button should have correct attributes
      const submitButton = screen.getByRole("button", { name: "Post" });
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveTextContent("Post");
    });
  });

  describe("Form Submission", () => {
    it("should handle form submission", () => {
      // Given: Valid user profile image
      const userProfileImage = validUserProfileImage;

      // When: Render form and submit it
      const { container } = render(
        <FullWrapper>
          <CommentForm userProfileImage={userProfileImage} />
        </FullWrapper>
      );

      const formElement = container.querySelector("form");
      fireEvent.submit(formElement!);

      // Then: Form submission should be handled without errors
      expect(formElement).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper form semantics", () => {
      // Given: Valid user profile image
      const userProfileImage = validUserProfileImage;

      // When: Render CommentForm component
      render(
        <FullWrapper>
          <CommentForm userProfileImage={userProfileImage} />
        </FullWrapper>
      );

      // Then: Should have proper semantic elements
      const inputElement = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button", { name: "Post" });

      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute("placeholder", "Enter a comment...");
      expect(submitButton).toBeInTheDocument();
    });
  });
});
