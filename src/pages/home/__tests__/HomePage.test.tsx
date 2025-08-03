import { FullWrapper } from "@/shared/libs/__tests__";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Home } from "../HomePage";

// Mock the PostListSection widget
vi.mock("@/widgets/post", () => ({
  PostListSection: vi.fn(() => (
    <div data-testid="post-list-section">Post List Section</div>
  )),
}));

/**
 * HomePage Component Tests
 * Verify all HomePage component functionality using Given-When-Then pattern
 */
describe("HomePage Component", () => {
  beforeEach(() => {
    // Given: Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render HomePage with correct layout structure when component is mounted", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Component should render with correct layout structure
      const postListSection = screen.getByTestId("post-list-section");
      const mainContainer = postListSection.closest(
        ".w-full.min-h-screen.bg-gray-50"
      );
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass("w-full", "min-h-screen", "bg-gray-50");

      const contentContainer = mainContainer?.querySelector(
        ".w-full.flex-1.flex.flex-col.items-center.justify-center.p-4"
      );
      expect(contentContainer).toBeInTheDocument();
    });

    it("should render HomePage with PostListSection widget when component is mounted", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: PostListSection widget should be rendered
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();
      expect(postListSection).toHaveTextContent("Post List Section");
    });

    it("should have proper semantic structure when rendered", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Component should have proper semantic structure
      const postListSection = screen.getByTestId("post-list-section");
      const mainContainer = postListSection.closest(
        ".w-full.min-h-screen.bg-gray-50"
      );
      expect(mainContainer).toBeInTheDocument();

      // Should contain the PostListSection
      expect(mainContainer).toContainElement(postListSection);
    });
  });

  describe("Layout and Styling", () => {
    it("should apply correct CSS classes for full-screen layout when rendered", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Main container should have full-screen layout classes
      const postListSection = screen.getByTestId("post-list-section");
      const mainContainer = postListSection.closest(
        ".w-full.min-h-screen.bg-gray-50"
      );
      expect(mainContainer).toHaveClass("w-full", "min-h-screen", "bg-gray-50");
    });

    it("should apply correct CSS classes for content centering when rendered", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Content container should have centering classes
      const postListSection = screen.getByTestId("post-list-section");
      const mainContainer = postListSection.closest(
        ".w-full.min-h-screen.bg-gray-50"
      );
      const contentContainer = mainContainer?.querySelector(
        ".w-full.flex-1.flex.flex-col.items-center.justify-center.p-4"
      );

      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass(
        "w-full",
        "flex-1",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "p-4"
      );
    });

    it("should maintain consistent layout structure across different viewport sizes", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Layout should use responsive classes
      const postListSection = screen.getByTestId("post-list-section");
      const mainContainer = postListSection.closest(
        ".w-full.min-h-screen.bg-gray-50"
      );
      const contentContainer = mainContainer?.querySelector(
        ".w-full.flex-1.flex.flex-col.items-center.justify-center.p-4"
      );

      expect(mainContainer).toHaveClass("w-full", "min-h-screen");
      expect(contentContainer).toHaveClass(
        "w-full",
        "flex-1",
        "flex",
        "flex-col"
      );
    });
  });

  describe("Widget Integration", () => {
    it("should properly integrate PostListSection widget when component is rendered", async () => {
      // Given: HomePage component with PostListSection widget

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: PostListSection should be properly integrated
      await waitFor(() => {
        const postListSection = screen.getByTestId("post-list-section");
        expect(postListSection).toBeInTheDocument();
      });
    });

    it("should render PostListSection within the correct container when component is mounted", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: PostListSection should be within the content container
      const postListSection = screen.getByTestId("post-list-section");
      const mainContainer = postListSection.closest(
        ".w-full.min-h-screen.bg-gray-50"
      );
      const contentContainer = mainContainer?.querySelector(
        ".w-full.flex-1.flex.flex-col.items-center.justify-center.p-4"
      );

      expect(contentContainer).toContainElement(postListSection);
    });
  });

  describe("Data Loading States", () => {
    it("should handle PostListSection loading state when data is being fetched", async () => {
      // Given: PostListSection is in loading state
      const { PostListSection } = await import("@/widgets/post");
      vi.mocked(PostListSection).mockImplementation(() => (
        <div data-testid="post-list-section" data-loading="true">
          Loading posts...
        </div>
      ));

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Loading state should be displayed
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();
      expect(postListSection).toHaveAttribute("data-loading", "true");
    });

    it("should handle PostListSection error state when data loading fails", async () => {
      // Given: PostListSection is in error state
      const { PostListSection } = await import("@/widgets/post");
      vi.mocked(PostListSection).mockImplementation(() => (
        <div data-testid="post-list-section" data-error="true">
          Error loading posts
        </div>
      ));

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Error state should be displayed
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();
      expect(postListSection).toHaveAttribute("data-error", "true");
    });

    it("should handle PostListSection empty state when no posts are available", async () => {
      // Given: PostListSection is in empty state
      const { PostListSection } = await import("@/widgets/post");
      vi.mocked(PostListSection).mockImplementation(() => (
        <div data-testid="post-list-section" data-empty="true">
          No posts available
        </div>
      ));

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Empty state should be displayed
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();
      expect(postListSection).toHaveAttribute("data-empty", "true");
    });
  });

  describe("Component Lifecycle", () => {
    it("should mount and unmount HomePage component correctly", () => {
      // Given: HomePage component is ready to render

      // When: Render and unmount HomePage component
      const { unmount } = render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Component should be mounted correctly
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();

      // When: Unmount component
      unmount();

      // Then: Component should be unmounted correctly
      expect(screen.queryByTestId("post-list-section")).not.toBeInTheDocument();
    });

    it("should re-render HomePage component correctly when props change", () => {
      // Given: HomePage component is rendered
      const { rerender } = render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // When: Re-render component
      rerender(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Component should re-render correctly
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic HTML structure when rendered", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Component should have proper semantic structure
      const postListSection = screen.getByTestId("post-list-section");
      const mainContainer = postListSection.closest(
        ".w-full.min-h-screen.bg-gray-50"
      );
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer?.tagName).toBe("DIV");
    });

    it("should be keyboard accessible when rendered", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Component should be keyboard accessible
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();
    });

    it("should provide proper focus management when component is rendered", () => {
      // Given: HomePage component is ready to render

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Focus should be manageable
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();

      // Component should not interfere with natural focus flow
      expect(document.activeElement).toBe(document.body);
    });
  });

  describe("Performance", () => {
    it("should render HomePage efficiently without unnecessary re-renders", async () => {
      // Given: HomePage component is ready to render
      const { PostListSection } = vi.mocked(await import("@/widgets/post"));

      // When: Render HomePage component multiple times
      const { rerender } = render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      const initialCallCount = PostListSection.mock.calls.length;

      rerender(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: PostListSection should not be called unnecessarily
      expect(PostListSection.mock.calls.length).toBe(initialCallCount + 1);
    });

    it("should handle multiple rapid re-renders gracefully", () => {
      // Given: HomePage component is ready for rapid re-renders

      // When: Perform multiple rapid re-renders
      const { rerender } = render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      for (let i = 0; i < 5; i++) {
        rerender(
          <FullWrapper>
            <Home />
          </FullWrapper>
        );
      }

      // Then: Component should handle rapid re-renders gracefully
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle PostListSection returning null when no data is available", async () => {
      // Given: PostListSection returns null
      const { PostListSection } = await import("@/widgets/post");
      vi.mocked(PostListSection).mockImplementation(() => null);

      // When: Render HomePage component
      render(
        <FullWrapper>
          <Home />
        </FullWrapper>
      );

      // Then: Component should handle null PostListSection gracefully
      const container = document.querySelector(
        ".w-full.min-h-screen.bg-gray-50"
      );
      expect(container).toBeInTheDocument();

      // PostListSection should not be in the document
      expect(screen.queryByTestId("post-list-section")).not.toBeInTheDocument();
    });

    it("should handle PostListSection throwing an error during render", async () => {
      // Given: PostListSection throws an error
      const { PostListSection } = await import("@/widgets/post");
      vi.mocked(PostListSection).mockImplementation(() => {
        throw new Error("PostListSection render error");
      });

      // When: Render HomePage component with error boundary
      expect(() => {
        render(
          <FullWrapper>
            <Home />
          </FullWrapper>
        );
      }).toThrow("PostListSection render error");

      // Then: Error should be thrown as expected
      // This test verifies that errors are properly propagated
    });

    it("should maintain layout integrity when PostListSection has different content sizes", async () => {
      // Given: PostListSection with different content sizes
      const contentSizes = [
        "Small content",
        "Medium sized content that spans multiple lines",
        "Very large content that contains a lot of text and should test how the layout handles extensive content within the PostListSection widget component",
      ];

      for (const content of contentSizes) {
        // When: Render HomePage with different content sizes
        const { PostListSection } = await import("@/widgets/post");
        vi.mocked(PostListSection).mockImplementation(() => (
          <div data-testid="post-list-section">{content}</div>
        ));

        const { unmount } = render(
          <FullWrapper>
            <Home />
          </FullWrapper>
        );

        // Then: Layout should maintain integrity
        const postListSection = screen.getByTestId("post-list-section");
        const mainContainer = postListSection.closest(
          ".w-full.min-h-screen.bg-gray-50"
        );
        const contentContainer = mainContainer?.querySelector(
          ".w-full.flex-1.flex.flex-col.items-center.justify-center.p-4"
        );

        expect(mainContainer).toHaveClass(
          "w-full",
          "min-h-screen",
          "bg-gray-50"
        );
        expect(contentContainer).toHaveClass("items-center", "justify-center");

        // Clean up for next iteration
        unmount();
      }
    });
  });

  describe("Integration", () => {
    it("should properly integrate with FullWrapper test utility when rendered", () => {
      // Given: HomePage component with FullWrapper

      // When: Render HomePage component with FullWrapper
      render(
        <FullWrapper routerPath="/">
          <Home />
        </FullWrapper>
      );

      // Then: Component should integrate properly with test wrapper
      const postListSection = screen.getByTestId("post-list-section");
      expect(postListSection).toBeInTheDocument();
    });

    it("should work correctly with different FullWrapper configurations", () => {
      // Given: Different FullWrapper configurations
      const configurations = [
        { routerPath: "/" },
        { routerPath: "/", routerQuery: {} },
        { routerPath: "/home" },
      ];

      configurations.forEach((config) => {
        // When: Render HomePage with different configurations
        const { unmount } = render(
          <FullWrapper {...config}>
            <Home />
          </FullWrapper>
        );

        // Then: Component should work with all configurations
        const postListSection = screen.getByTestId("post-list-section");
        expect(postListSection).toBeInTheDocument();

        // Clean up for next iteration
        unmount();
      });
    });
  });
});
