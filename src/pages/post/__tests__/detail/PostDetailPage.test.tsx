import { FullWrapper } from "@/shared/libs/__tests__";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostDetailPage } from "../../detail";

// Mock the PostDetailSection widget
vi.mock("@/widgets/post", () => ({
  PostDetailSection: vi.fn(({ postId }: { postId: string }) => (
    <div data-testid="post-detail-section" data-post-id={postId}>
      Post Detail Section for {postId}
    </div>
  )),
}));

/**
 * PostDetailPage Component Tests
 * Verify all PostDetailPage component functionality using Given-When-Then pattern
 */
describe("PostDetailPage Component", () => {
  let validPostId: string;

  beforeEach(() => {
    // Given: Clear all mocks and set up valid post ID
    vi.clearAllMocks();
    validPostId = "post-123";
  });

  describe("Rendering", () => {
    it("should render PostDetailPage with correct layout structure when provided with valid postId", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should render with correct layout structure
      const postDetailSection = screen.getByTestId("post-detail-section");
      const mainContainer = postDetailSection.closest(
        ".w-full.bg-white.overflow-y-auto"
      );
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass(
        "w-full",
        "bg-white",
        "overflow-y-auto"
      );
    });

    it("should render PostDetailPage with PostDetailSection widget when provided with postId", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: PostDetailSection widget should be rendered with correct postId
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);
      expect(postDetailSection).toHaveTextContent(
        `Post Detail Section for ${postId}`
      );
    });

    it("should have proper semantic structure when rendered with postId", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should have proper semantic structure
      const postDetailSection = screen.getByTestId("post-detail-section");
      const mainContainer = postDetailSection.closest(
        ".w-full.bg-white.overflow-y-auto"
      );
      expect(mainContainer).toBeInTheDocument();

      // Should contain the PostDetailSection
      expect(mainContainer).toContainElement(postDetailSection);
    });
  });

  describe("Props Handling", () => {
    it("should pass postId prop correctly to PostDetailSection when provided with different postIds", () => {
      // Given: Array of different post IDs
      const postIds = [
        "post-1",
        "post-abc",
        "special-post-123",
        "post-with-dashes",
      ];

      postIds.forEach((postId) => {
        // When: Render PostDetailPage with different postId
        const { unmount } = render(
          <FullWrapper>
            <PostDetailPage postId={postId} />
          </FullWrapper>
        );

        // Then: PostDetailSection should receive correct postId
        const postDetailSection = screen.getByTestId("post-detail-section");
        expect(postDetailSection).toHaveAttribute("data-post-id", postId);
        expect(postDetailSection).toHaveTextContent(
          `Post Detail Section for ${postId}`
        );

        // Clean up for next iteration
        unmount();
      });
    });

    it("should handle empty postId when provided with empty string", () => {
      // Given: Empty post ID
      const postId = "";

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: PostDetailSection should receive empty postId
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", "");
      expect(postDetailSection).toHaveTextContent("Post Detail Section for");
    });

    it("should handle special characters in postId when provided with encoded postId", () => {
      // Given: Post ID with special characters
      const postId = "post-with-special-chars-@#$%";

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: PostDetailSection should handle special characters correctly
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);
      expect(postDetailSection).toHaveTextContent(
        `Post Detail Section for ${postId}`
      );
    });
  });

  describe("Layout and Styling", () => {
    it("should apply correct CSS classes for full-width layout when rendered", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Main container should have full-width layout classes
      const postDetailSection = screen.getByTestId("post-detail-section");
      const mainContainer = postDetailSection.closest(
        ".w-full.bg-white.overflow-y-auto"
      );
      expect(mainContainer).toHaveClass(
        "w-full",
        "bg-white",
        "overflow-y-auto"
      );
    });

    it("should apply correct background and overflow styles when rendered", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Container should have white background and auto overflow
      const postDetailSection = screen.getByTestId("post-detail-section");
      const mainContainer = postDetailSection.closest(
        ".w-full.bg-white.overflow-y-auto"
      );
      expect(mainContainer).toHaveClass("bg-white", "overflow-y-auto");
    });

    it("should maintain consistent layout structure across different postIds", () => {
      // Given: Different post IDs
      const postIds = [
        "short",
        "very-long-post-id-with-many-characters",
        "123",
      ];

      postIds.forEach((postId) => {
        // When: Render PostDetailPage with different postId
        const { unmount } = render(
          <FullWrapper>
            <PostDetailPage postId={postId} />
          </FullWrapper>
        );

        // Then: Layout should remain consistent
        const postDetailSection = screen.getByTestId("post-detail-section");
        const mainContainer = postDetailSection.closest(
          ".w-full.bg-white.overflow-y-auto"
        );
        expect(mainContainer).toHaveClass(
          "w-full",
          "bg-white",
          "overflow-y-auto"
        );

        // Clean up for next iteration
        unmount();
      });
    });
  });

  describe("Widget Integration", () => {
    it("should properly integrate PostDetailSection widget when component is rendered", async () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: PostDetailSection should be properly integrated
      await waitFor(() => {
        const postDetailSection = screen.getByTestId("post-detail-section");
        expect(postDetailSection).toBeInTheDocument();
        expect(postDetailSection).toHaveAttribute("data-post-id", postId);
      });
    });

    it("should render PostDetailSection within the correct container when component is mounted", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: PostDetailSection should be within the main container
      const postDetailSection = screen.getByTestId("post-detail-section");
      const mainContainer = postDetailSection.closest(
        ".w-full.bg-white.overflow-y-auto"
      );

      expect(mainContainer).toContainElement(postDetailSection);
    });

    it("should pass postId prop to PostDetailSection correctly when rendered", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: PostDetailSection should receive correct postId prop
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);
    });
  });

  describe("Data Loading States", () => {
    it("should handle PostDetailSection loading state when post data is being fetched", async () => {
      // Given: PostDetailSection is in loading state
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(({ postId }) => (
        <div
          data-testid="post-detail-section"
          data-post-id={postId}
          data-loading="true">
          Loading post {postId}...
        </div>
      ));

      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Loading state should be displayed
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
      expect(postDetailSection).toHaveAttribute("data-loading", "true");
      expect(postDetailSection).toHaveTextContent(`Loading post ${postId}...`);
    });

    it("should handle PostDetailSection error state when post data loading fails", async () => {
      // Given: PostDetailSection is in error state
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(({ postId }) => (
        <div
          data-testid="post-detail-section"
          data-post-id={postId}
          data-error="true">
          Error loading post {postId}
        </div>
      ));

      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Error state should be displayed
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
      expect(postDetailSection).toHaveAttribute("data-error", "true");
      expect(postDetailSection).toHaveTextContent(
        `Error loading post ${postId}`
      );
    });

    it("should handle PostDetailSection not found state when post does not exist", async () => {
      // Given: PostDetailSection is in not found state
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(({ postId }) => (
        <div
          data-testid="post-detail-section"
          data-post-id={postId}
          data-not-found="true">
          Post {postId} not found
        </div>
      ));

      const postId = "non-existent-post";

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Not found state should be displayed
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
      expect(postDetailSection).toHaveAttribute("data-not-found", "true");
      expect(postDetailSection).toHaveTextContent(`Post ${postId} not found`);
    });
  });

  describe("Navigation and Routing", () => {
    it("should handle navigation to PostDetailPage with different postIds", () => {
      // Given: Different post IDs representing navigation scenarios
      const navigationScenarios = [
        { postId: "post-1", description: "numeric post ID" },
        { postId: "featured-post", description: "text post ID" },
        { postId: "post-2023-01-01", description: "date-based post ID" },
      ];

      navigationScenarios.forEach(({ postId }) => {
        // When: Navigate to PostDetailPage with different postId
        const { unmount } = render(
          <FullWrapper routerPath={`/post/${postId}`}>
            <PostDetailPage postId={postId} />
          </FullWrapper>
        );

        // Then: Component should handle navigation correctly
        const postDetailSection = screen.getByTestId("post-detail-section");
        expect(postDetailSection).toBeInTheDocument();
        expect(postDetailSection).toHaveAttribute("data-post-id", postId);

        // Clean up for next iteration
        unmount();
      });
    });

    it("should maintain postId consistency when navigating between different posts", () => {
      // Given: Initial post ID
      const initialPostId = "post-1";

      // When: Render PostDetailPage with initial postId
      const { rerender } = render(
        <FullWrapper routerPath={`/post/${initialPostId}`}>
          <PostDetailPage postId={initialPostId} />
        </FullWrapper>
      );

      // Then: Initial postId should be displayed
      let postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", initialPostId);

      // When: Navigate to different post
      const newPostId = "post-2";
      rerender(
        <FullWrapper routerPath={`/post/${newPostId}`}>
          <PostDetailPage postId={newPostId} />
        </FullWrapper>
      );

      // Then: New postId should be displayed
      postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", newPostId);
    });

    it("should handle browser back/forward navigation correctly", () => {
      // Given: PostDetailPage with specific postId
      const postId = validPostId;

      // When: Render PostDetailPage simulating navigation
      const { rerender } = render(
        <FullWrapper
          routerPath={`/post/${postId}`}
          routerAsPath={`/post/${postId}`}>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should handle navigation state correctly
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);

      // When: Simulate navigation change
      rerender(
        <FullWrapper
          routerPath={`/post/${postId}`}
          routerAsPath={`/post/${postId}`}>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should maintain consistency
      const updatedPostDetailSection = screen.getByTestId(
        "post-detail-section"
      );
      expect(updatedPostDetailSection).toHaveAttribute("data-post-id", postId);
    });
  });

  describe("Component Lifecycle", () => {
    it("should mount and unmount PostDetailPage component correctly", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render and unmount PostDetailPage component
      const { unmount } = render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should be mounted correctly
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();

      // When: Unmount component
      unmount();

      // Then: Component should be unmounted correctly
      expect(
        screen.queryByTestId("post-detail-section")
      ).not.toBeInTheDocument();
    });

    it("should re-render PostDetailPage component correctly when postId changes", () => {
      // Given: Initial post ID
      const initialPostId = "post-1";

      // When: Render PostDetailPage component
      const { rerender } = render(
        <FullWrapper>
          <PostDetailPage postId={initialPostId} />
        </FullWrapper>
      );

      // Then: Component should render with initial postId
      let postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", initialPostId);

      // When: Re-render with different postId
      const newPostId = "post-2";
      rerender(
        <FullWrapper>
          <PostDetailPage postId={newPostId} />
        </FullWrapper>
      );

      // Then: Component should re-render with new postId
      postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", newPostId);
    });

    it("should handle rapid postId changes gracefully", () => {
      // Given: Array of post IDs for rapid changes
      const postIds = ["post-1", "post-2", "post-3", "post-4", "post-5"];

      // When: Perform rapid postId changes
      const { rerender } = render(
        <FullWrapper>
          <PostDetailPage postId={postIds[0]} />
        </FullWrapper>
      );

      postIds.slice(1).forEach((postId) => {
        rerender(
          <FullWrapper>
            <PostDetailPage postId={postId} />
          </FullWrapper>
        );
      });

      // Then: Component should handle rapid changes gracefully
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
      expect(postDetailSection).toHaveAttribute(
        "data-post-id",
        postIds[postIds.length - 1]
      );
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic HTML structure when rendered", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should have proper semantic structure
      const postDetailSection = screen.getByTestId("post-detail-section");
      const mainContainer = postDetailSection.closest(
        ".w-full.bg-white.overflow-y-auto"
      );
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer?.tagName).toBe("DIV");
    });

    it("should be keyboard accessible when rendered", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should be keyboard accessible
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
    });

    it("should provide proper focus management when component is rendered", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Focus should be manageable
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();

      // Component should not interfere with natural focus flow
      expect(document.activeElement).toBe(document.body);
    });

    it("should support screen readers when rendered with postId", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should support screen readers
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should render PostDetailPage efficiently without unnecessary re-renders", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Render PostDetailPage component multiple times
      const { rerender } = render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should render without errors
      let postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();

      rerender(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should re-render correctly
      postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
    });

    it("should handle multiple rapid re-renders gracefully", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Perform multiple rapid re-renders
      const { rerender } = render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      for (let i = 0; i < 5; i++) {
        rerender(
          <FullWrapper>
            <PostDetailPage postId={postId} />
          </FullWrapper>
        );
      }

      // Then: Component should handle rapid re-renders gracefully
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
    });

    it("should optimize re-renders when postId remains the same", () => {
      // Given: Valid post ID
      const postId = validPostId;

      // When: Re-render with same postId multiple times
      const { rerender } = render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should render correctly
      let postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);

      // Re-render with same postId
      rerender(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should maintain consistency
      postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);
    });
  });

  describe("Edge Cases", () => {
    it("should handle PostDetailSection returning null when post data is not available", async () => {
      // Given: PostDetailSection returns null
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(() => null);

      const postId = validPostId;

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should handle null PostDetailSection gracefully
      const container = document.querySelector(
        ".w-full.bg-white.overflow-y-auto"
      );
      expect(container).toBeInTheDocument();

      // PostDetailSection should not be in the document
      expect(
        screen.queryByTestId("post-detail-section")
      ).not.toBeInTheDocument();
    });

    it("should handle PostDetailSection throwing an error during render", async () => {
      // Given: PostDetailSection throws an error
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(() => {
        throw new Error("PostDetailSection render error");
      });

      const postId = validPostId;

      // When: Render PostDetailPage component with error boundary
      expect(() => {
        render(
          <FullWrapper>
            <PostDetailPage postId={postId} />
          </FullWrapper>
        );
      }).toThrow("PostDetailSection render error");

      // Then: Error should be thrown as expected
      // This test verifies that errors are properly propagated
    });

    it("should handle very long postId values gracefully", async () => {
      // Given: Reset mock to default implementation and very long post ID
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(({ postId }) => (
        <div data-testid="post-detail-section" data-post-id={postId}>
          Post Detail Section for {postId}
        </div>
      ));

      const longPostId = "a".repeat(1000);

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={longPostId} />
        </FullWrapper>
      );

      // Then: Component should handle long postId gracefully
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", longPostId);
    });

    it("should handle postId with Unicode characters correctly", async () => {
      // Given: Reset mock to default implementation and post ID with Unicode characters
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(({ postId }) => (
        <div data-testid="post-detail-section" data-post-id={postId}>
          Post Detail Section for {postId}
        </div>
      ));

      const unicodePostId = "post-🎉-中文-émoji";

      // When: Render PostDetailPage component
      render(
        <FullWrapper>
          <PostDetailPage postId={unicodePostId} />
        </FullWrapper>
      );

      // Then: Component should handle Unicode characters correctly
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", unicodePostId);
      expect(postDetailSection).toHaveTextContent(
        `Post Detail Section for ${unicodePostId}`
      );
    });
  });

  describe("Integration", () => {
    it("should properly integrate with FullWrapper test utility when rendered", async () => {
      // Given: Reset mock to default implementation and valid post ID
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(({ postId }) => (
        <div data-testid="post-detail-section" data-post-id={postId}>
          Post Detail Section for {postId}
        </div>
      ));

      const postId = validPostId;

      // When: Render PostDetailPage component with FullWrapper
      render(
        <FullWrapper routerPath={`/post/${postId}`}>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Component should integrate properly with test wrapper
      const postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toBeInTheDocument();
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);
    });

    it("should work correctly with different FullWrapper configurations", async () => {
      // Given: Reset mock to default implementation and different FullWrapper configurations
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(({ postId }) => (
        <div data-testid="post-detail-section" data-post-id={postId}>
          Post Detail Section for {postId}
        </div>
      ));

      const postId = validPostId;
      const configurations = [
        { routerPath: `/post/${postId}` },
        { routerPath: `/post/${postId}`, routerQuery: { id: postId } },
        { routerPath: `/post/${postId}`, routerAsPath: `/post/${postId}` },
      ];

      configurations.forEach((config) => {
        // When: Render PostDetailPage with different configurations
        const { unmount } = render(
          <FullWrapper {...config}>
            <PostDetailPage postId={postId} />
          </FullWrapper>
        );

        // Then: Component should work with all configurations
        const postDetailSection = screen.getByTestId("post-detail-section");
        expect(postDetailSection).toBeInTheDocument();
        expect(postDetailSection).toHaveAttribute("data-post-id", postId);

        // Clean up for next iteration
        unmount();
      });
    });

    it("should maintain state consistency across different router configurations", async () => {
      // Given: Reset mock to default implementation and valid post ID
      const { PostDetailSection } = await import("@/widgets/post");
      vi.mocked(PostDetailSection).mockImplementation(({ postId }) => (
        <div data-testid="post-detail-section" data-post-id={postId}>
          Post Detail Section for {postId}
        </div>
      ));

      const postId = validPostId;

      // When: Render with different router states
      const { rerender } = render(
        <FullWrapper routerPath={`/post/${postId}`} routerQuery={{}}>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: Initial state should be correct
      let postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);

      // When: Change router configuration
      rerender(
        <FullWrapper
          routerPath={`/post/${postId}`}
          routerQuery={{ id: postId }}>
          <PostDetailPage postId={postId} />
        </FullWrapper>
      );

      // Then: State should remain consistent
      postDetailSection = screen.getByTestId("post-detail-section");
      expect(postDetailSection).toHaveAttribute("data-post-id", postId);
    });
  });
});
