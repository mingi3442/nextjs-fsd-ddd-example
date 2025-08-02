import { CommentDto } from "@/entities/comment/infrastructure/dto";
import { FullWrapper } from "@/shared/libs/__tests__";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CommentView } from "../../../ui/comment-view";
import { mockSingleComment } from "../../fixtures";

/**
 * CommentView Component Tests
 * Core functionality and user interaction focused tests
 */
describe("CommentView Component", () => {
  let validCommentDto: CommentDto;

  beforeEach(() => {
    validCommentDto = { ...mockSingleComment };
  });

  describe("Basic Rendering", () => {
    it("should render comment with all essential elements", () => {
      // Given: Valid comment data
      const comment = validCommentDto;

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      // Then: Should display all essential elements
      const userAvatar = screen.getByRole("img");
      const username = screen.getByText(comment.user.username);
      const commentBody = screen.getByText(comment.body);
      const likeButton = screen.getByRole("button", { name: "Like" });
      const replyButton = screen.getByRole("button", { name: "Reply" });

      expect(userAvatar).toBeInTheDocument();
      expect(username).toBeInTheDocument();
      expect(commentBody).toBeInTheDocument();
      expect(likeButton).toBeInTheDocument();
      expect(replyButton).toBeInTheDocument();
    });

    it("should render with empty comment body", () => {
      // Given: Comment with empty body
      const emptyBodyComment: CommentDto = {
        ...validCommentDto,
        body: "",
      };

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={emptyBodyComment} />
        </FullWrapper>
      );

      // Then: Should still render user info and buttons
      const username = screen.getByText(emptyBodyComment.user.username);
      const likeButton = screen.getByRole("button", { name: "Like" });

      expect(username).toBeInTheDocument();
      expect(likeButton).toBeInTheDocument();
    });
  });

  describe("User Information", () => {
    it("should display username correctly", () => {
      // Given: Valid comment data
      const comment = validCommentDto;

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      // Then: Should display username
      const username = screen.getByText(comment.user.username);
      expect(username).toBeInTheDocument();
    });

    it("should display user avatar", () => {
      // Given: Valid comment data
      const comment = validCommentDto;

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      // Then: Should display user avatar with alt text
      const userAvatar = screen.getByRole("img");
      expect(userAvatar).toBeInTheDocument();
      expect(userAvatar).toHaveAttribute(
        "alt",
        `${comment.user.profileImage}-profile`
      );
    });
  });

  describe("Comment Content", () => {
    it("should display comment body text", () => {
      // Given: Valid comment data
      const comment = validCommentDto;

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      // Then: Should display comment body
      const commentBody = screen.getByText(comment.body);
      expect(commentBody).toBeInTheDocument();
      expect(commentBody).toHaveTextContent(comment.body);
    });

    it("should handle special characters in comment body", () => {
      // Given: Comment with special characters
      const specialCharComment: CommentDto = {
        ...validCommentDto,
        body: "Comment with émojis 🎉 and symbols !@#$%",
      };

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={specialCharComment} />
        </FullWrapper>
      );

      // Then: Should display special characters correctly
      const commentBody = screen.getByText(specialCharComment.body);
      expect(commentBody).toHaveTextContent(
        "Comment with émojis 🎉 and symbols !@#$%"
      );
    });
  });

  describe("Timestamp Display", () => {
    it("should display formatted timestamp when updatedAt is available", () => {
      // Given: Comment with updatedAt timestamp
      const comment = {
        ...validCommentDto,
        updatedAt: 1640995200000, // January 1, 2022
      };

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      // Then: Should display formatted timestamp
      const timestampElement = screen.getByText(/2022|Jan|January/i);
      expect(timestampElement).toBeInTheDocument();
    });

    it("should display createdAt when updatedAt is not available", () => {
      // Given: Comment with only createdAt timestamp
      const comment = {
        ...validCommentDto,
        createdAt: 1640995200000, // January 1, 2022
        updatedAt: undefined,
      };

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      // Then: Should display createdAt timestamp
      const timestampElement = screen.getByText(/2022|Jan|January/i);
      expect(timestampElement).toBeInTheDocument();
    });
  });

  describe("Action Buttons", () => {
    it("should render Like and Reply buttons", () => {
      // Given: Valid comment data
      const comment = validCommentDto;

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      // Then: Should render both action buttons
      const likeButton = screen.getByRole("button", { name: "Like" });
      const replyButton = screen.getByRole("button", { name: "Reply" });

      expect(likeButton).toBeInTheDocument();
      expect(likeButton).toHaveTextContent("Like");
      expect(replyButton).toBeInTheDocument();
      expect(replyButton).toHaveTextContent("Reply");
    });

    it("should handle button clicks", () => {
      // Given: Valid comment data
      const comment = validCommentDto;

      // When: Render CommentView and click buttons
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      const likeButton = screen.getByRole("button", { name: "Like" });
      const replyButton = screen.getByRole("button", { name: "Reply" });

      fireEvent.click(likeButton);
      fireEvent.click(replyButton);

      // Then: Button clicks should be handled without errors
      expect(likeButton).toBeInTheDocument();
      expect(replyButton).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", () => {
      // Given: Valid comment data
      const comment = validCommentDto;

      // When: Render CommentView component
      render(
        <FullWrapper>
          <CommentView comment={comment} />
        </FullWrapper>
      );

      // Then: Should have proper semantic elements
      const userAvatar = screen.getByRole("img");
      const likeButton = screen.getByRole("button", { name: "Like" });
      const replyButton = screen.getByRole("button", { name: "Reply" });

      expect(userAvatar).toHaveAttribute("alt");
      expect(likeButton).toBeInTheDocument();
      expect(replyButton).toBeInTheDocument();
    });
  });
});
