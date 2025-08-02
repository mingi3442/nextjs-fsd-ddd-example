import { PostDto } from "@/entities/post";
import { FullWrapper } from "@/shared/libs/__tests__";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { PostCard } from "../../../ui/card";
import { mockPostsArray } from "../../fixtures";

/**
 * PostCard Component Tests
 * Core functionality and user interaction focused tests
 */
describe("PostCard Component", () => {
  let validPostDto: PostDto;

  beforeEach(() => {
    validPostDto = mockPostsArray[0];
  });

  describe("Basic Rendering", () => {
    it("should render post card with all essential elements", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should display all essential elements
      const linkElement = screen.getByRole("link");
      const postImage = screen.getByRole("img", { name: `post-${post.id}` });
      const postBody = screen.getByText(post.body);
      const likesCount = screen.getByText(post.likes.toLocaleString());
      const commentsCount = screen.getByText(
        post.totalComments.toLocaleString()
      );

      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", `/post/${post.id}`);
      expect(postImage).toBeInTheDocument();
      expect(postBody).toBeInTheDocument();
      expect(likesCount).toBeInTheDocument();
      expect(commentsCount).toBeInTheDocument();
    });

    it("should render with empty post body", () => {
      // Given: Post with empty body
      const emptyBodyPost: PostDto = {
        ...validPostDto,
        body: "",
      };

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={emptyBodyPost} />
        </FullWrapper>
      );

      // Then: Should still render other elements
      const linkElement = screen.getByRole("link");
      const postImage = screen.getByRole("img", {
        name: `post-${emptyBodyPost.id}`,
      });

      expect(linkElement).toBeInTheDocument();
      expect(postImage).toBeInTheDocument();
    });
  });

  describe("User Information", () => {
    it("should display user information", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should display user information
      const username = screen.getByText(post.user.username);
      expect(username).toBeInTheDocument();
    });

    it("should display user avatar", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should display user avatar
      const userImages = screen.getAllByRole("img");
      const userAvatar = userImages.find((img) =>
        img.getAttribute("alt")?.includes("profile")
      );

      expect(userAvatar).toBeInTheDocument();
    });
  });

  describe("Post Content", () => {
    it("should display post body text", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should display post body
      const postBody = screen.getByText(post.body);
      expect(postBody).toBeInTheDocument();
    });

    it("should display post image with correct attributes", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should display post image with correct attributes
      const postImage = screen.getByRole("img", { name: `post-${post.id}` });
      expect(postImage).toHaveAttribute("alt", `post-${post.id}`);
      expect(postImage).toHaveAttribute("width", "400");
      expect(postImage).toHaveAttribute("height", "400");
    });

    it("should handle special characters in post body", () => {
      // Given: Post with special characters
      const specialCharPost: PostDto = {
        ...validPostDto,
        body: "Post with émojis 🎉 and symbols !@#$%",
      };

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={specialCharPost} />
        </FullWrapper>
      );

      // Then: Should display special characters correctly
      const postBody = screen.getByText(specialCharPost.body);
      expect(postBody).toHaveTextContent(
        "Post with émojis 🎉 and symbols !@#$%"
      );
    });
  });

  describe("Interaction Elements", () => {
    it("should display likes and comments count", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should display engagement counts
      const likesCount = screen.getByText(post.likes.toLocaleString());
      const commentsCount = screen.getByText(
        post.totalComments.toLocaleString()
      );

      expect(likesCount).toBeInTheDocument();
      expect(commentsCount).toBeInTheDocument();
    });

    it("should format large numbers correctly", () => {
      // Given: Post with large numbers
      const highEngagementPost: PostDto = {
        ...validPostDto,
        likes: 1234567,
        totalComments: 98765,
      };

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={highEngagementPost} />
        </FullWrapper>
      );

      // Then: Should format numbers with locale string
      const likesCount = screen.getByText("1,234,567");
      const commentsCount = screen.getByText("98,765");

      expect(likesCount).toBeInTheDocument();
      expect(commentsCount).toBeInTheDocument();
    });

    it("should display zero values correctly", () => {
      // Given: Post with zero engagement
      const newPost: PostDto = {
        ...validPostDto,
        likes: 0,
        totalComments: 0,
      };

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={newPost} />
        </FullWrapper>
      );

      // Then: Should display zero values
      const allZeros = screen.getAllByText("0");
      expect(allZeros.length).toBe(2); // One for likes, one for comments
    });
  });

  describe("Navigation", () => {
    it("should create correct link to post detail", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should link to correct post detail page
      const linkElement = screen.getByRole("link");
      expect(linkElement).toHaveAttribute("href", `/post/${post.id}`);
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should have proper semantic elements
      const linkElement = screen.getByRole("link");
      const postImage = screen.getByRole("img", { name: `post-${post.id}` });

      expect(linkElement).toHaveAttribute("href", `/post/${post.id}`);
      expect(postImage).toHaveAttribute("alt", `post-${post.id}`);
    });

    it("should be keyboard accessible", () => {
      // Given: Valid post data
      const post = validPostDto;

      // When: Render PostCard component
      render(
        <FullWrapper>
          <PostCard post={post} />
        </FullWrapper>
      );

      // Then: Should be keyboard accessible
      const linkElement = screen.getByRole("link");
      expect(linkElement.tagName).toBe("A");
    });
  });
});
